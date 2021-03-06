<template>
    <div id='3dTileInterActivity'>
        <div id='toolbar'>toolbar</div>
    </div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: '3dTileInterActivity',
        components: {},
        props: {},
        setup(props, context) {
            const store = useStore();
            const route = useRoute();
            const router = useRouter();
            const data = reactive({})
            onBeforeMount(() => {
            })
            onMounted(() => {
                const viewer = new Cesium.Viewer("3dTileInterActivity", {
                    terrainProvider: Cesium.createWorldTerrain(),
                });

                const scene = viewer.scene;
                if (!scene.pickPositionSupported) {
                    window.alert("This browser does not support pickPosition.");
                }

                scene.globe.depthTestAgainstTerrain = true;

                const viewModel = {
                    rightClickAction: "annotate",
                    middleClickAction: "hide",
                };

                Cesium.knockout.track(viewModel);

                const toolbar = document.getElementById("toolbar");
                Cesium.knockout.applyBindings(viewModel, toolbar);

                const annotations = scene.primitives.add(new Cesium.LabelCollection());

                // Set the initial camera view to look at Manhattan
                const initialPosition = Cesium.Cartesian3.fromDegrees(
                    -74.01881302800248,
                    40.69114333714821,
                    753
                );
                const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(
                    21.27879878293835,
                    -21.34390550872461,
                    0.0716951918898415
                );
                scene.camera.setView({
                    destination: initialPosition,
                    orientation: initialOrientation,
                    endTransform: Cesium.Matrix4.IDENTITY,
                });

                // Load the NYC buildings tileset.
                const tileset = new Cesium.Cesium3DTileset({
                    url: Cesium.IonResource.fromAssetId(75343),
                });
                scene.primitives.add(tileset);
                tileset.style = new Cesium.Cesium3DTileStyle({
                    meta: {
                        description: "'Building ${BIN} has height ${Height}.'",
                    },
                });

                const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

                handler.setInputAction(function (movement) {
                    const feature = scene.pick(movement.position);
                    if (!Cesium.defined(feature)) {
                        return;
                    }

                    const action = viewModel.rightClickAction;
                    if (action === "annotate") {
                        annotate(movement, feature);
                    } else if (action === "properties") {
                        printProperties(movement, feature);
                    } else if (action === "zoom") {
                        zoom(movement, feature);
                    }
                }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

                handler.setInputAction(function (movement) {
                    const feature = scene.pick(movement.position);
                    if (!Cesium.defined(feature)) {
                        return;
                    }

                    const action = viewModel.middleClickAction;
                    if (action === "hide") {
                        feature.show = false;
                    }
                }, Cesium.ScreenSpaceEventType.MIDDLE_CLICK);

                function annotate(movement, feature) {
                    if (scene.pickPositionSupported) {
                        const cartesian = scene.pickPosition(movement.position);
                        if (Cesium.defined(cartesian)) {
                            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                            const height = `${cartographic.height.toFixed(2)} m`;

                            annotations.add({
                                position: cartesian,
                                text: height,
                                showBackground: true,
                                font: "14px monospace",
                                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            });
                        }
                    }
                }

                function printProperties(movement, feature) {
                    console.log("Properties:");
                    const propertyNames = feature.getPropertyNames();
                    const length = propertyNames.length;
                    for (let i = 0; i < length; ++i) {
                        const propertyName = propertyNames[i];
                        console.log(
                            `  ${propertyName}: ${feature.getProperty(propertyName)}`
                        );
                    }

                    // Evaluate feature description
                    console.log(
                        `Description : ${tileset.style.meta.description.evaluate(feature)}`
                    );
                }

                function zoom(movement, feature) {
                    const longitude = Cesium.Math.toRadians(
                        feature.getProperty("Longitude")
                    );
                    const latitude = Cesium.Math.toRadians(
                        feature.getProperty("Latitude")
                    );
                    const height = feature.getProperty("Height");

                    const positionCartographic = new Cesium.Cartographic(
                        longitude,
                        latitude,
                        height * 0.5
                    );
                    const position = scene.globe.ellipsoid.cartographicToCartesian(
                        positionCartographic
                    );

                    const camera = scene.camera;
                    const heading = camera.heading;
                    const pitch = camera.pitch;

                    const offset = offsetFromHeadingPitchRange(
                        heading,
                        pitch,
                        height * 2.0
                    );

                    const transform = Cesium.Transforms.eastNorthUpToFixedFrame(position);
                    Cesium.Matrix4.multiplyByPoint(transform, offset, position);

                    camera.flyTo({
                        destination: position,
                        orientation: {
                            heading: heading,
                            pitch: pitch,
                        },
                        easingFunction: Cesium.EasingFunction.QUADRATIC_OUT,
                    });
                }

                function offsetFromHeadingPitchRange(heading, pitch, range) {
                    pitch = Cesium.Math.clamp(
                        pitch,
                        -Cesium.Math.PI_OVER_TWO,
                        Cesium.Math.PI_OVER_TWO
                    );
                    heading = Cesium.Math.zeroToTwoPi(heading) - Cesium.Math.PI_OVER_TWO;

                    const pitchQuat = Cesium.Quaternion.fromAxisAngle(
                        Cesium.Cartesian3.UNIT_Y,
                        -pitch
                    );
                    const headingQuat = Cesium.Quaternion.fromAxisAngle(
                        Cesium.Cartesian3.UNIT_Z,
                        -heading
                    );
                    const rotQuat = Cesium.Quaternion.multiply(
                        headingQuat,
                        pitchQuat,
                        headingQuat
                    );
                    const rotMatrix = Cesium.Matrix3.fromQuaternion(rotQuat);

                    const offset = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_X);
                    Cesium.Matrix3.multiplyByVector(rotMatrix, offset, offset);
                    Cesium.Cartesian3.negate(offset, offset);
                    Cesium.Cartesian3.multiplyByScalar(offset, range, offset);
                    return offset;
                }



            })
            watchEffect(() => {
            })
            return {}
        }
    }
</script>
<style scoped lang='less'>
</style>
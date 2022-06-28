<template>
    <div id='sampleHeightFrom3dTile'></div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: 'sampleHeightFrom3dTile',
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
                const viewer = new Cesium.Viewer("sampleHeightFrom3dTile", {
                    terrainProvider: Cesium.createWorldTerrain(),
                });
                const scene = viewer.scene;

                if (!scene.clampToHeightSupported) {
                    window.alert(
                        "This browser does not support clampToHeightMostDetailed."
                    );
                }

                const tileset = scene.primitives.add(
                    new Cesium.Cesium3DTileset({
                        url: Cesium.IonResource.fromAssetId(40866),
                    })
                );

                scene.camera.setView({
                    destination: new Cesium.Cartesian3(
                        1216411.0748779264,
                        -4736313.10747583,
                        4081359.5125561724
                    ),
                    orientation: new Cesium.HeadingPitchRoll(
                        4.239925103568368,
                        -0.4911293834802475,
                        6.279849292088564
                    ),
                    endTransform: Cesium.Matrix4.IDENTITY,
                });

                Sandcastle.addToolbarButton("Sample heights", function () {
                    sampleHeights();
                });

                function sampleHeights() {
                    viewer.entities.removeAll();

                    const cartesian1 = new Cesium.Cartesian3(
                        1216390.063324395,
                        -4736314.814479433,
                        4081341.9787972216
                    );
                    const cartesian2 = new Cesium.Cartesian3(
                        1216329.5413318684,
                        -4736272.029009798,
                        4081407.9342479417
                    );

                    const count = 30;
                    const cartesians = new Array(count);
                    for (let i = 0; i < count; ++i) {
                        const offset = i / (count - 1);
                        cartesians[i] = Cesium.Cartesian3.lerp(
                            cartesian1,
                            cartesian2,
                            offset,
                            new Cesium.Cartesian3()
                        );
                    }

                    scene
                        .clampToHeightMostDetailed(cartesians)
                        .then(function (clampedCartesians) {
                            for (let i = 0; i < count; ++i) {
                                viewer.entities.add({
                                    position: clampedCartesians[i],
                                    ellipsoid: {
                                        radii: new Cesium.Cartesian3(0.2, 0.2, 0.2),
                                        material: Cesium.Color.RED,
                                    },
                                });
                            }

                            viewer.entities.add({
                                polyline: {
                                    positions: clampedCartesians,
                                    arcType: Cesium.ArcType.NONE,
                                    width: 2,
                                    material: new Cesium.PolylineOutlineMaterialProperty({
                                        color: Cesium.Color.YELLOW,
                                    }),
                                    depthFailMaterial: new Cesium.PolylineOutlineMaterialProperty(
                                        {
                                            color: Cesium.Color.YELLOW,
                                        }
                                    ),
                                },
                            });
                        });
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
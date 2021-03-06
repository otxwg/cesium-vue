<template>
    <div id='label'>
        <div id='toolbar'></div>
    </div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: 'label',
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
                const viewer = new Cesium.Viewer("label");
                let labelListenerCallback;

                function addLabel() {
                    Sandcastle.declare(addLabel);
                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                        label: {
                            text: "Philadelphia",
                        },
                    });
                }

                function setFont() {
                    Sandcastle.declare(setFont);
                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                        label: {
                            text: "Philadelphia",
                            font: "24px Helvetica",
                            fillColor: Cesium.Color.SKYBLUE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        },
                    });
                }

                function setProperties() {
                    Sandcastle.declare(setProperties);
                    const entity = viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(
                            -75.1641667,
                            39.9522222,
                            300000.0
                        ),
                        label: {
                            text: "Philadelphia",
                        },
                    });

                    entity.label.scale = 2.0;
                    entity.label.showBackground = true;
                }

                function offsetByDistance() {
                    Sandcastle.declare(offsetByDistance);
                    const image = new Image();
                    image.onload = function () {
                        viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                            billboard: {
                                position: Cesium.Cartesian3.fromDegrees(
                                    -75.1641667,
                                    39.9522222
                                ),
                                scaleByDistance: new Cesium.NearFarScalar(
                                    1.5e2,
                                    5.0,
                                    1.5e7,
                                    0.5
                                ),
                                image: image,
                            },
                            label: {
                                text: "Label on top of scaling billboard",
                                font: "20px sans-serif",
                                showBackground: true,
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                pixelOffset: new Cesium.Cartesian2(0.0, -image.height),
                                pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
                                    1.5e2,
                                    3.0,
                                    1.5e7,
                                    0.5
                                ),
                            },
                        });
                    };
                    image.src = "../images/facility.gif";
                }

                function fadeByDistance() {
                    Sandcastle.declare(fadeByDistance);
                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(-73.94, 40.67),
                        label: {
                            text: "New York",
                            translucencyByDistance: new Cesium.NearFarScalar(
                                1.5e2,
                                1.0,
                                1.5e8,
                                0.0
                            ),
                        },
                    });
                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(-84.39, 33.75),
                        label: {
                            text: "Atlanta",
                            translucencyByDistance: new Cesium.NearFarScalar(
                                1.5e5,
                                1.0,
                                1.5e7,
                                0.0
                            ),
                        },
                    });
                }

                function scaleByDistance() {
                    Sandcastle.declare(scaleByDistance);

                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                        label: {
                            text: "Philadelphia",
                            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                        },
                    });
                }

                function setRightToLeft() {
                    Sandcastle.declare(setRightToLeft);
                    Cesium.Label.enableRightToLeftDetection = true; //Only needs to be set once at the beginning of the application.
                    viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                        label: {
                            text: "Master (אדון): Hello\nתלמיד (student): שלום",
                        },
                    });
                }

                function animateLabel() {
                    Sandcastle.declare(animateLabel);
                    const entity = viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
                        label: {
                            text: "Philadelphia",
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 0,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        },
                    });

                    let outlineDelta = 0.1;
                    let fontDelta = -1.0;
                    let fontSize = 20.0;
                    const minFontSize = 1.0;
                    const maxFontSize = 48.0;

                    labelListenerCallback = viewer.scene.preUpdate.addEventListener(
                        function (scene, time) {
                            entity.label.outlineWidth += outlineDelta;
                            if (
                                entity.label.outlineWidth >= 4.0 ||
                                entity.label.outlineWidth <= 0.0
                            ) {
                                outlineDelta *= -1.0;
                            }

                            fontSize += fontDelta;
                            if (fontSize >= maxFontSize || fontSize <= minFontSize) {
                                fontDelta *= -1.0;
                            }
                            entity.label.font = `${fontSize}px Calibri`;
                        }
                    );
                }

                Sandcastle.addToolbarMenu([
                    {
                        text: "Add label",
                        onselect: function () {
                            addLabel();
                            Sandcastle.highlight(addLabel);
                        },
                    },
                    {
                        text: "Set font",
                        onselect: function () {
                            setFont();
                            Sandcastle.highlight(setFont);
                        },
                    },
                    {
                        text: "Set properties",
                        onselect: function () {
                            setProperties();
                            Sandcastle.highlight(setProperties);
                        },
                    },
                    {
                        text: "Offset label by distance",
                        onselect: function () {
                            offsetByDistance();
                            Sandcastle.highlight(offsetByDistance);
                        },
                    },
                    {
                        text: "Fade label by distance",
                        onselect: function () {
                            fadeByDistance();
                            Sandcastle.highlight(fadeByDistance);
                        },
                    },
                    {
                        text: "Scale label by distance",
                        onselect: function () {
                            scaleByDistance();
                            Sandcastle.highlight(scaleByDistance);
                        },
                    },
                    {
                        text: "Set label with right-to-left language",
                        onselect: function () {
                            setRightToLeft();
                            Sandcastle.highlight(setRightToLeft);
                        },
                    },
                    {
                        text: "Animate Label",
                        onselect: function () {
                            animateLabel();
                            Sandcastle.highlight(animateLabel);
                        },
                    },
                ]);

                Sandcastle.reset = function () {
                    viewer.entities.removeAll();
                    if (Cesium.defined(labelListenerCallback)) {
                        labelListenerCallback();
                    }
                };

            })
            watchEffect(() => {
            })
            return {}
        }
    }
</script>
<style scoped lang='less'>
</style>
<template>
    <div id='cesiumContainer'>
        <div id="slider"></div>
    </div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: 'cesiumContainer',
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
                const viewer = new Cesium.Viewer("cesiumContainer");
                viewer.camera.flyTo({
                    destination: new Cesium.Rectangle.fromDegrees(-84, 43, -80, 47),
                });

                const layers = viewer.imageryLayers;
                layers.removeAll();

                const layerLinear = layers.addImageryProvider(
                    new Cesium.TileMapServiceImageryProvider({
                        url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
                    })
                );

                const layerNearest = layers.addImageryProvider(
                    new Cesium.TileMapServiceImageryProvider({
                        url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
                    })
                );

                // Set the texture minification and magnification filters of layerNearest. Default is LINEAR.
                // layerNearest.minificationFilter =
                //     Cesium.TextureMinificationFilter.NEAREST;
                layerNearest.magnificationFilter =
                    Cesium.TextureMagnificationFilter.NEAREST;

                // The remaining code installs a split layer so the effect of the texture filters becomes apparent.

                layerNearest.splitDirection = Cesium.SplitDirection.LEFT;

                const slider = document.getElementById("slider");
                viewer.scene.splitPosition =
                    slider.offsetLeft / slider.parentElement.offsetWidth;

                let dragStartX = 0;

                document
                    .getElementById("slider")
                    .addEventListener("mousedown", mouseDown, false);
                window.addEventListener("mouseup", mouseUp, false);

                function mouseUp() {
                    window.removeEventListener("mousemove", sliderMove, true);
                }

                function mouseDown(e) {
                    const slider = document.getElementById("slider");
                    dragStartX = e.clientX - slider.offsetLeft;
                    window.addEventListener("mousemove", sliderMove, true);
                }

                function sliderMove(e) {
                    const slider = document.getElementById("slider");
                    const splitPosition =
                        (e.clientX - dragStartX) / slider.parentElement.offsetWidth;
                    slider.style.left = `${100.0 * splitPosition}%`;
                    viewer.scene.splitPosition = splitPosition;
                }

            })
            watchEffect(() => {
            })
            return {}
        }
    }
</script>
<style scoped lang='scss'>
    @import url('/Apps/Sandcastle/templates/bucket.css');

    .fullSize {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        border: none;
        width: 100%;
        height: 100%;
    }

    #slider {
        position: absolute;
        left: 50%;
        top: 0px;
        background-color: #d3d3d3;
        width: 5px;
        height: 100%;
        z-index: 9999;
    }

    #slider:hover {
        cursor: ew-resize;
    }
</style>
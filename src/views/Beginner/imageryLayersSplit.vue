<template>
    <div id='imageryLayerFilterTexture' class="fullSize">
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
        name: 'imageryLayerFilterTexture',
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
                const viewer = new Cesium.Viewer("imageryLayerFilterTexture", {
                    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
                    }),
                    baseLayerPicker: false,
                    infoBox: false,
                });

                const layers = viewer.imageryLayers;
                const earthAtNight = layers.addImageryProvider(
                    new Cesium.IonImageryProvider({ assetId: 3812 })
                );
                earthAtNight.splitDirection = Cesium.SplitDirection.RIGHT; // Only show to the left of the slider.
                // Sync the position of the slider with the split position
                const slider = document.getElementById("slider");
                viewer.scene.splitPosition = slider.offsetLeft / slider.parentElement.offsetWidth;
                console.log(viewer.scene.splitPosition, 'viewer.scene.splitPosition')
                const handler = new Cesium.ScreenSpaceEventHandler(slider);
                let moveActive = false;
                function move(movement) {
                    if (!moveActive) {
                        return;
                    }
                    const relativeOffset = movement.endPosition.x;
                    const splitPosition = (slider.offsetLeft + relativeOffset) / slider.parentElement.offsetWidth;
                    slider.style.left = `${100.0 * splitPosition}%`;
                    viewer.scene.splitPosition = splitPosition;
                    console.log(viewer.scene.splitPosition, 'viewer.scene.splitPosition')
                }
                handler.setInputAction(function () {
                    moveActive = true;
                }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
                handler.setInputAction(function () {
                    moveActive = true;
                }, Cesium.ScreenSpaceEventType.PINCH_START);

                handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

                handler.setInputAction(function () {
                    moveActive = false;
                }, Cesium.ScreenSpaceEventType.LEFT_UP);
                handler.setInputAction(function () {
                    moveActive = false;
                }, Cesium.ScreenSpaceEventType.PINCH_END);
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
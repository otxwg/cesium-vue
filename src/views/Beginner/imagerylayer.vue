<template>
    <div id='imagerylayer'></div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: 'imagerylayer',
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
                const viewer = new Cesium.Viewer("imagerylayer", {
                    imageryProvider: Cesium.createWorldImagery({
                        // style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
                    }),
                    baseLayerPicker: false,
                });
                const layers = viewer.scene.imageryLayers;
                // debugger
                // const blackMarble = layers.addImageryProvider(
                //     new Cesium.IonImageryProvider({ assetId: 3812 })
                // );
                // blackMarble.alpha = 0.5;
                // blackMarble.brightness = 2.0;
                layers.addImageryProvider(
                    new Cesium.SingleTileImageryProvider({
                        url: "../images/Cesium_Logo_overlay.png",
                        rectangle: Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75),
                    })
                );
            })
            watchEffect(() => {
            })
            return {}
        }
    }
</script>
<style scoped lang='less'>
</style>
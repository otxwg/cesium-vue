<template>
    <div id='mapPins'></div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: 'mapPins',
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
                const viewer = new Cesium.Viewer("mapPins", {
                    timeline: false,
                    animation: false,
                });

                const pinBuilder = new Cesium.PinBuilder();

                const questionPin = viewer.entities.add({
                    name: "Question mark",
                    position: Cesium.Cartesian3.fromDegrees(-75.1698529, 39.9220071),
                    billboard: {
                        image: pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    },
                });
                const bluePin = viewer.entities.add({
                    name: "Blank blue pin",
                    position: Cesium.Cartesian3.fromDegrees(-75.170726, 39.9208667),

                    billboard: {
                        image: pinBuilder.fromText("?", Cesium.Color.BLACK, 48).toDataURL(),
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    },
                });
                const url = Cesium.buildModuleUrl("Assets/Textures/maki/grocery.png");
                const groceryPin = Promise.resolve(
                    pinBuilder.fromUrl(url, Cesium.Color.GREEN, 48)
                ).then(function (canvas) {
                    return viewer.entities.add({
                        name: "Grocery store",
                        position: Cesium.Cartesian3.fromDegrees(-75.1705217, 39.921786),
                        billboard: {
                            image: canvas.toDataURL(),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        },
                    });
                });
                //Create a red pin representing a hospital from the maki icon set.
                const hospitalPin = Promise.resolve(
                    pinBuilder.fromMakiIconId("hospital", Cesium.Color.RED, 48)
                ).then(function (canvas) {
                    return viewer.entities.add({
                        name: "Hospital",
                        position: Cesium.Cartesian3.fromDegrees(-75.1698606, 39.9211275),
                        billboard: {
                            image: canvas.toDataURL(),
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        },
                    });
                });
                //Since some of the pins are created asynchronously, wait for them all to load before zooming/
                Promise.all([questionPin, bluePin, groceryPin, hospitalPin]).then(
                    function (pins) {
                        viewer.zoomTo(pins);
                    }
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
<template>
    <div id="Billboard"></div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium'
    import { Viewer } from 'cesium'
    export default {
        name: 'Billboard',
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
                const viewer = new Cesium.Viewer('Billboard')
                // viewer.entities.add({
                //     position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
                //     billboard: {
                //         image: require("./images/Cesium_Logo_overlay.png"),
                //     },
                // });
                // viewer.entities.add({
                //     position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
                //     billboard: {
                //         image: require("./images/Cesium_Logo_overlay.png"), // default: undefined
                //         show: true, // default
                //         pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
                //         eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
                //         horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // default
                //         verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // default: CENTER
                //         scale: 2.0, // default: 1.0
                //         color: Cesium.Color.LIME, // default: WHITE
                //         rotation: Cesium.Math.PI_OVER_FOUR, // default: 0.0
                //         alignedAxis: Cesium.Cartesian3.ZERO, // default
                //         width: 100, // default: undefined
                //         height: 25, // default: undefined
                //     },
                // });
                const entity = viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(
                        -75.59777,
                        40.03883,
                        300000.0
                    ),
                    billboard: {
                        image: require("./images/Cesium_Logo_overlay.png"),
                        pixelOffset: new Cesium.Cartesian2(0, -50), // default: (0, 0)
                        verticalOrigin: Cesium.VerticalOrigin.CENTER, // default: CENTER
                    },
                });
                const billboard = entity.billboard;
                billboard.scale = 4.0;
                billboard.color = Cesium.Color.WHITE.withAlpha(0.75);
                // console.log(Cesium.Color,'Cesium.Color')
            })
            watchEffect(() => {
            })



            return { a: 0 }
        }
    }
</script>
<style scoped lang='less'>
</style>
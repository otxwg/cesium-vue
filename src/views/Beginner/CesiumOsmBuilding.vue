<template>
    <div id='CesiumOsmBuilding'></div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: 'CesiumOsmBuilding',
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
                const viewer = new Cesium.Viewer("CesiumOsmBuilding", {
                    terrainProvider: Cesium.createWorldTerrain(),
                });

                viewer.scene.primitives.add(Cesium.createOsmBuildings());

                viewer.scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(-74.019, 40.6912, 750),
                    orientation: {
                        heading: Cesium.Math.toRadians(20),
                        pitch: Cesium.Math.toRadians(-20),
                    },
                })
            })
            watchEffect(() => {
            })
            return {}
        }
    }
</script>
<style scoped lang='less'>
</style>
<template>
    <div id="ArcGISTiledElevationTerrainProvider">333</div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium'
    export default {
        name: '',
        components: {},
        props: {},
        setup(props, context) {
            const store = useStore();
            const route = useRoute();
            const router = useRouter();
            const data = reactive({})
            onBeforeMount(() => {
                //console.log('2.组件挂载页面之前执行----onBeforeMount')
            })
            onMounted(() => {
                //console.log('3.-组件挂载到页面之后执行-------onMounted')
                const viewer = new Cesium.Viewer("ArcGISTiledElevationTerrainProvider", {
                    terrainProvider: new Cesium.ArcGISTiledElevationTerrainProvider({
                        url:
                            "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
                    }),
                });
            })
            watchEffect(() => {
            })
        }
    }
</script>
<style lang="scss" scoped>
</style>
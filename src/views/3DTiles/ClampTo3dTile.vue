<template>
    <div id='ClampTo3dTile'></div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: 'ClampTo3dTile',
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
                const viewer = new Cesium.Viewer("ClampTo3dTile", {
                    terrainProvider: Cesium.createWorldTerrain(),
                });
                const scene = viewer.scene;
                const clock = viewer.clock;

                let entity;
                let positionProperty;
                const dataSourcePromise = Cesium.CzmlDataSource.load(
                    "/SampleData/ClampToGround.czml"
                );
                viewer.dataSources.add(dataSourcePromise).then(function (dataSource) {
                    entity = dataSource.entities.getById("CesiumMilkTruck");
                    positionProperty = entity.position;
                });

                // const tileset = scene.primitives.add(
                //     new Cesium.Cesium3DTileset({
                //         url: Cesium.IonResource.fromAssetId(40866),
                //     })
                // );
                // debugger
                // console.log(Cesium.Matrix4.IDENTITY, 'Cesium.Matrix4.IDENTITY')
                viewer.camera.setView({
                    destination: new Cesium.Cartesian3(
                        1216403.8845586285,
                        -4736357.493351395,
                        4081299.715698949
                    ),
                    orientation: new Cesium.HeadingPitchRoll(
                        4.2892217081808806,
                        -0.4799070147502502,
                        6.279789177843313
                    ),
                    endTransform: Cesium.Matrix4.IDENTITY,
                });

                // if (scene.clampToHeightSupported) {
                //     tileset.initialTilesLoaded.addEventListener(start);
                // } else {
                //     window.alert("This browser does not support clampToHeight.");
                // }

                // function start() {
                //     clock.shouldAnimate = true;
                //     const objectsToExclude = [entity];
                //     scene.postRender.addEventListener(function () {
                //         const position = positionProperty.getValue(clock.currentTime);
                //         entity.position = scene.clampToHeight(position, objectsToExclude);
                //     });
                // }

            })
            watchEffect(() => {
            })
            return {}
        }
    }
</script>
<style scoped lang='less'>
</style>
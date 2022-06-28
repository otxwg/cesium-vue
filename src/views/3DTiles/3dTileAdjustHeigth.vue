<template>
    <div id='3dTileAdjustHeigth'>
        <div id="toolbar">
            <div>Height</div>
            <input type="range" min="-100.0" max="100.0" step="1" data-bind="value: height, valueUpdate: 'input'" />
            <input type="text" size="5" data-bind="value: height" />
        </div>
    </div>
</template>

<script>
    import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import * as Cesium from 'cesium';
    import { Viewer } from 'cesium';
    export default {
        name: '3dTileAdjustHeigth',
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
                const viewer = new Cesium.Viewer("3dTileAdjustHeigth", {
                    shadows: true,
                });
                viewer.scene.globe.depthTestAgainstTerrain = true;
                const viewModel = {
                    height: 0,
                };
                Cesium.knockout.track(viewModel);
                const toolbar = document.getElementById("toolbar");
                Cesium.knockout.applyBindings(viewModel, toolbar);

                const tileset = new Cesium.Cesium3DTileset({
                    url: "/SampleData/Cesium3DTiles/Tilesets/Tileset/tileset.json",
                });
                tileset.readyPromise
                    .then(function (tileset) {
                        viewer.scene.primitives.add(tileset);
                        debugger
                        viewer.zoomTo(
                            tileset,
                            new Cesium.HeadingPitchRange(
                                0.0,
                                -0.5,
                                tileset.boundingSphere.radius * 2.0
                            )
                        );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                Cesium.knockout
                    .getObservable(viewModel, "height")
                    .subscribe(function (height) {
                        height = Number(height);
                        if (isNaN(height)) {
                            return;
                        }
                        const cartographic = Cesium.Cartographic.fromCartesian(
                            tileset.boundingSphere.center
                        );
                        const surface = Cesium.Cartesian3.fromRadians(
                            cartographic.longitude,
                            cartographic.latitude,
                            0.0
                        );
                        const offset = Cesium.Cartesian3.fromRadians(
                            cartographic.longitude,
                            cartographic.latitude,
                            height
                        );
                        const translation = Cesium.Cartesian3.subtract(
                            offset,
                            surface,
                            new Cesium.Cartesian3()
                        );
                        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
                    });
            })
            watchEffect(() => {
            })
            return {}
        }
    }
</script>
<style scoped lang='scss'>
    @import url('/Apps/Sandcastle/templates/bucket.css');

    #toolbar {
        background: rgba(42, 42, 42, 0.8);
        padding: 4px;
        border-radius: 4px;
    }

    #toolbar input {
        vertical-align: middle;
        padding-top: 2px;
        padding-bottom: 2px;
    }
</style>
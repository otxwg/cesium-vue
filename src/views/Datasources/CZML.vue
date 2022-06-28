<template>
  <div id="CZML">
    <div id="toolbar"></div>
  </div>
</template>

<script>
  import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import * as Cesium from 'cesium'
  import { Viewer } from 'cesium'
  export default {
    name: 'CZML',
    components: {},
    props: {},
    setup(props, context) {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const data = reactive({})
      onBeforeMount(() => { })
      onMounted(() => {
        const viewer = new Cesium.Viewer("CZML", {
          shouldAnimate: true,
        });

        Sandcastle.addDefaultToolbarButton("Satellites", function () {
          viewer.dataSources.add(
            Cesium.CzmlDataSource.load("/SampleData/simple.czml")
          );

          viewer.camera.flyHome(0);
        });

        Sandcastle.addToolbarButton("Vehicle", function () {
          viewer.dataSources.add(
            Cesium.CzmlDataSource.load("/SampleData/Vehicle.czml")
          );

          viewer.scene.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(-116.52, 35.02, 95000),
            orientation: {
              heading: 6,
            },
          });
        });

        Sandcastle.reset = function () {
          viewer.dataSources.removeAll();
        };
      })
      watchEffect(() => { })
      return {}
    }
  }
</script>
<style scoped lang="less"></style>
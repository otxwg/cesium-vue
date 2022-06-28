<template>
  <div id="KMLTour">
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
    name: 'KMLTour',
    components: {},
    props: {},
    setup(props, context) {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const data = reactive({})
      onBeforeMount(() => { })
      onMounted(() => {
        const viewer = new Cesium.Viewer("KMLTour");
        const options = {
          camera: viewer.scene.camera,
          canvas: viewer.scene.canvas,
        };

        let tour = null;
        viewer.dataSources
          .add(
            Cesium.KmlDataSource.load(
              "/SampleData/kml/eiffel-tower-flyto.kml",
              options
            )
          )
          .then(function (dataSource) {
            tour = dataSource.kmlTours[0];
            tour.tourStart.addEventListener(function () {
              console.log("Start tour");
            });
            tour.tourEnd.addEventListener(function (terminated) {
              console.log(`${terminated ? "Terminate" : "End"} tour`);
            });
            tour.entryStart.addEventListener(function (entry) {
              console.log(`Play ${entry.type} (${entry.duration})`);
            });
            tour.entryEnd.addEventListener(function (entry, terminated) {
              console.log(`${terminated ? "Terminate" : "End"} ${entry.type}`);
            });
          });

        Sandcastle.addToolbarButton("Play", function () {
          tour.play(viewer);
        });

        Sandcastle.addToolbarButton("Terminate", function () {
          tour.stop();
        });

        Sandcastle.reset = function () {
          viewer.dataSources.removeAll();
          viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED;
          viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
        };

      })
      watchEffect(() => { })
      return {}
    }
  }
</script>
<style scoped lang="less"></style>
<template>
  <div id="GPX">
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
    name: 'GPX',
    components: {},
    props: {},
    setup(props, context) {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const data = reactive({})
      onBeforeMount(() => { })
      onMounted(() => {
        const viewer = new Cesium.Viewer("GPX", {
          terrainProvider: Cesium.createWorldTerrain(),
        });

        const pinBuilder = new Cesium.PinBuilder();

        Sandcastle.addToolbarMenu(
          [
            {
              text: "Track with Waypoints",
              onselect: function () {
                viewer.dataSources
                  .add(
                    Cesium.GpxDataSource.load(
                      "/SampleData/gpx/lamina.gpx",
                      {
                        clampToGround: true,
                      }
                    )
                  )
                  .then(function (dataSource) {
                    viewer.flyTo(dataSource.entities);
                  });
              },
            },
            {
              text: "Route",
              onselect: function () {
                viewer.dataSources
                  .add(
                    Cesium.GpxDataSource.load(
                      "/SampleData/gpx/route.gpx",
                      {
                        clampToGround: true,
                      }
                    )
                  )
                  .then(function (dataSource) {
                    viewer.flyTo(dataSource.entities);
                  });
              },
            },
            {
              text: "Waypoints",
              onselect: function () {
                viewer.dataSources
                  .add(
                    Cesium.GpxDataSource.load("/SampleData/gpx/wpt.gpx", {
                      clampToGround: true,
                    })
                  )
                  .then(function (dataSource) {
                    viewer.flyTo(dataSource.entities);
                  });
              },
            },
            {
              text: "Multiple Tracks with Waypoints",
              onselect: function () {
                viewer.dataSources
                  .add(
                    Cesium.GpxDataSource.load(
                      "/SampleData/gpx/complexTrk.gpx",
                      { clampToGround: true }
                    )
                  )
                  .then(function (dataSource) {
                    viewer.flyTo(dataSource.entities);
                  });
              },
            },
            {
              text: "Symbology Options",
              onselect: function () {
                viewer.dataSources
                  .add(
                    Cesium.GpxDataSource.load(
                      "/SampleData/gpx/lamina.gpx",
                      {
                        clampToGround: true,
                        trackColor: Cesium.Color.YELLOW,
                        waypointImage: pinBuilder.fromMakiIconId(
                          "bicycle",
                          Cesium.Color.RED,
                          48
                        ),
                      }
                    )
                  )
                  .then(function (dataSource) {
                    viewer.flyTo(dataSource.entities);
                  });
              },
            },
          ],
          "toolbar"
        );

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
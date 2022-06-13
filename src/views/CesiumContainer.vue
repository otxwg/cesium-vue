
<template>
  <div id="cesiumContainer"></div>
</template>

<script>
  import 'cesium/Build/Cesium/Widgets/widgets.css'
  import { onMounted } from 'vue'
  import * as Cesium from 'cesium';
  import { Viewer } from 'cesium'

  export default {
    name: 'CesiumContainer',
    setup() {
      onMounted(() => {
        /* eslint no-new: */
        // new Viewer('cesiumContainer')
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YzFkYjQzNC1kMzI5LTQ2N2MtOWY4Ny01NDc5Nzc1MzM0M2MiLCJpZCI6OTY4ODIsImlhdCI6MTY1NDc0ODc2NX0.S8QVMkdpyXMiJhPKfWg1jncb9Fz8HRsIVdOJ0Sl-fVg';

        // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
        const viewer = new Cesium.Viewer('cesiumContainer', {
          terrainProvider: Cesium.createWorldTerrain()
        });
        // Add Cesium OSM Buildings, a global 3D buildings layer.
        const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
        // Fly the camera to San Francisco at the given longitude, latitude, and height.
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
          orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-15.0),
          }
        });
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #cesiumContainer {
    width: 100%;
    height: 100%;
  }
</style>
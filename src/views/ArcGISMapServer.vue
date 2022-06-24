<template>
  <div id="ArcGISMapServer"></div>
</template>

<script>
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { Viewer } from 'cesium'

export default {
  name: 'ArcGISMapServer',
  setup() {
    onMounted(() => {
      /* eslint no-new: */
      // new Viewer('cesiumContainer')
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YzFkYjQzNC1kMzI5LTQ2N2MtOWY4Ny01NDc5Nzc1MzM0M2MiLCJpZCI6OTY4ODIsImlhdCI6MTY1NDc0ODc2NX0.S8QVMkdpyXMiJhPKfWg1jncb9Fz8HRsIVdOJ0Sl-fVg'

      const viewer = new Cesium.Viewer('ArcGISMapServer', {
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/'
        })
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#ArcGISMapServer {
  width: 100%;
  height: 100%;
}
</style>

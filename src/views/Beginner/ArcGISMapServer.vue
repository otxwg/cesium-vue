<template>
  <div id="ArcGISMapServer"></div>
</template>

<script>

import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { Viewer } from 'cesium'

export default {
  name: 'ArcGISMapServer',
  setup() {
    onMounted(() => {
      /* eslint no-new: */
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

<template>
  <div id="Plane">
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
  name: 'Plane',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      const viewer = new Cesium.Viewer('Plane')
      const bluePlane = viewer.entities.add({
        name: 'Blue plane',
        position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
        plane: {
          plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
          dimensions: new Cesium.Cartesian2(400000.0, 300000.0),
          material: Cesium.Color.BLUE
        }
      })

      const redPlane = viewer.entities.add({
        name: 'Red plane with black outline',
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        plane: {
          plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Y, 0.0),
          dimensions: new Cesium.Cartesian2(400000.0, 300000.0),
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK
        }
      })

      const outlineOnly = viewer.entities.add({
        name: 'Yellow plane outline',
        position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 300000.0),
        plane: {
          plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
          dimensions: new Cesium.Cartesian2(400000.0, 300000.0),
          // fill: false,
          outline: true,
          outlineColor: Cesium.Color.YELLOW
        }
      })

      viewer.zoomTo(viewer.entities)
    })
    watchEffect(() => {})
    return {}
  }
}
</script>
<style scoped lang="less"></style>

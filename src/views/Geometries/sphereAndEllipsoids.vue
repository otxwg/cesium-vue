<template>
  <div id="sphereAndEllipsoids">
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
  name: 'sphereAndEllipsoids',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      const viewer = new Cesium.Viewer('sphereAndEllipsoids')

      const blueEllipsoid = viewer.entities.add({
        name: 'Blue ellipsoid',
        position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
        ellipsoid: {
          radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
          material: Cesium.Color.BLUE
        }
      })

      // const redSphere = viewer.entities.add({
      //   name: 'Red sphere with black outline',
      //   position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
      //   ellipsoid: {
      //     radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
      //     material: Cesium.Color.RED.withAlpha(0.5),
      //     outline: true,
      //     outlineColor: Cesium.Color.BLACK
      //   }
      // })

      // const outlineOnly = viewer.entities.add({
      //   name: 'Yellow ellipsoid outline',
      //   position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 300000.0),
      //   ellipsoid: {
      //     radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
      //     fill: false,
      //     outline: true,
      //     outlineColor: Cesium.Color.YELLOW,
      //     slicePartitions: 24,
      //     stackPartitions: 36
      //   }
      // })

      viewer.zoomTo(viewer.entities)
    })
    watchEffect(() => {})
    return {}
  }
}
</script>
<style scoped lang="less"></style>

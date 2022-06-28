<template>
  <div id="wall">
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
  name: 'wall',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      const viewer = new Cesium.Viewer('wall')
      // const redWall = viewer.entities.add({
      //   name: 'Red wall at height',
      //   wall: {
      //     positions: Cesium.Cartesian3.fromDegreesArrayHeights([-115.0, 44.0, 500000.0, -90.0, 44.0, 500000.0]),
      //     minimumHeights: [400000.0, 400000.0],
      //     material: Cesium.Color.RED,
      //     outline: true
      //   }
      // })

      // const greenWall = viewer.entities.add({
      //   name: 'Green wall from surface with outline',
      //   wall: {
      //     positions: Cesium.Cartesian3.fromDegreesArrayHeights([-107.0, 43.0, 100000.0, -97.0, 43.0, 100000.0, -97.0, 40.0, 100000.0, -107.0, 40.0, 100000.0, -107.0, 43.0, 100000.0]),
      //     material: Cesium.Color.GREEN,
      //     outline: true
      //   }
      // })

      const blueWall = viewer.entities.add({
        name: 'Blue wall with sawtooth heights and outline',
        wall: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -115.0, 50.0, -112.5, 50.0, -110.0, 50.0, -107.5, 50.0, -105.0, 50.0, -102.5, 50.0, -100.0, 50.0, -97.5, 50.0, -95.0, 50.0, -92.5, 50.0, -90.0, 50.0
          ]),
          maximumHeights: [100000, 200000, 100000, 200000, 100000, 200000, 100000, 200000, 100000, 200000, 100000],
          minimumHeights: [0, 100000, 0, 100000, 0, 100000, 0, 100000, 0, 100000, 0],
          material: Cesium.Color.BLUE.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK
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

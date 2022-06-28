<template>
  <div id="PolylineVolume">
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
  name: 'PolylineVolume',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      const viewer = new Cesium.Viewer('PolylineVolume')

      function computeCircle(radius) {
        const positions = []
        for (let i = 0; i < 360; i++) {
          const radians = Cesium.Math.toRadians(i)
          positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)))
        }
        return positions
      }

      function computeStar(arms, rOuter, rInner) {
        const angle = Math.PI / arms
        const length = 2 * arms
        const positions = new Array(length)
        for (let i = 0; i < length; i++) {
          const r = i % 2 === 0 ? rOuter : rInner
          positions[i] = new Cesium.Cartesian2(Math.cos(i * angle) * r, Math.sin(i * angle) * r)
          debugger
        }
        return positions
      }
      // console.log(computeCircle(60000.0), 'computeCircle(60000.0)')
      // const redTube = viewer.entities.add({
      //   name: 'Red tube with rounded corners',
      //   polylineVolume: {
      //     positions: Cesium.Cartesian3.fromDegreesArray([-85.0, 32.0, -85.0, 36.0, -89.0, 36.0]),
      //     shape: computeCircle(60000.0),
      //     material: Cesium.Color.RED
      //   }
      // })

      // const greenBox = viewer.entities.add({
      //   name: 'Green box with beveled corners and outline',
      //   polylineVolume: {
      //     positions: Cesium.Cartesian3.fromDegreesArrayHeights([-90.0, 32.0, 0.0, -90.0, 36.0, 0.0, -94.0, 36.0, 0.0]),
      //     shape: [new Cesium.Cartesian2(-50000, -50000), new Cesium.Cartesian2(50000, -50000), new Cesium.Cartesian2(50000, 50000), new Cesium.Cartesian2(-50000, 50000)],
      //     cornerType: Cesium.CornerType.BEVELED,
      //     material: Cesium.Color.GREEN.withAlpha(0.5),
      //     outline: true,
      //     outlineColor: Cesium.Color.BLACK
      //   }
      // })

      const blueStar = viewer.entities.add({
        name: 'Blue star with mitered corners and outline',
        polylineVolume: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights([-95.0, 32.0, 0.0, -95.0, 36.0, 100000.0, -99.0, 36.0, 200000.0]),
          shape: computeStar(7, 70000, 50000),
          cornerType: Cesium.CornerType.MITERED,
          material: Cesium.Color.BLUE
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

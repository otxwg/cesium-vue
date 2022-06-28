<template>
  <div id="Corridor" class="fullSize"></div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as Cesium from 'cesium'
import { Viewer } from 'cesium'
export default {
  name: 'Corridor',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      const viewer = new Cesium.Viewer('Corridor')

      const redCorridor = viewer.entities.add({
        name: 'Red corridor on surface with rounded corners',
        corridor: {
          positions: Cesium.Cartesian3.fromDegreesArray([-100.0, 40.0, -105.0, 40.0, -105.0, 35.0]),
          width: 200000.0,
          material: Cesium.Color.RED.withAlpha(0.5)
        }
      })

      const greenCorridor = viewer.entities.add({
        name: 'Green corridor at height with mitered corners and outline',
        corridor: {
          positions: Cesium.Cartesian3.fromDegreesArray([-90.0, 40.0, -95.0, 40.0, -95.0, 35.0]),
          height: 100000.0,
          width: 200000.0,
          cornerType: Cesium.CornerType.MITERED,
          material: Cesium.Color.GREEN,
          outline: true // height required for outlines to display
        }
      })

      const blueCorridor = viewer.entities.add({
        name: 'Blue extruded corridor with beveled corners and outline',
        corridor: {
          positions: Cesium.Cartesian3.fromDegreesArray([-80.0, 40.0, -85.0, 40.0, -85.0, 35.0]),
          height: 200000.0,
          extrudedHeight: 100000.0,
          width: 200000.0,
          cornerType: Cesium.CornerType.BEVELED,
          material: Cesium.Color.BLUE.withAlpha(0.5),
          outline: true, // height or extrudedHeight must be set for outlines to display
          outlineColor: Cesium.Color.WHITE
        }
      })

      viewer.zoomTo(viewer.entities)
    })
    watchEffect(() => {})
    return {}
  }
}
</script>
<style scoped lang="scss">
@import url('/Apps/Sandcastle/templates/bucket.css');

.fullSize {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  width: 100%;
  height: 100%;
}

.widget {
  display: flex;
  width: 100%;
  height: 100%;
}

#view3D {
  display: inline-block;
  width: 50%;
  height: 100%;
}

#view2D {
  display: inline-block;
  width: 50%;
  height: 100%;
}
</style>

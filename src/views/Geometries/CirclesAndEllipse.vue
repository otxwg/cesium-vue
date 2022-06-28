<template>
  <div id="CirclesAndEllipse" class="fullSize"></div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as Cesium from 'cesium'
import { Viewer } from 'cesium'
export default {
  name: 'CirclesAndEllipse',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      const viewer = new Cesium.Viewer('CirclesAndEllipse')

      const greenCircle = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
        name: 'Green circle at height with outline',
        ellipse: {
          semiMinorAxis: 300000.0,
          semiMajorAxis: 300000.0,
          height: 200000.0,
          material: Cesium.Color.GREEN,
          outline: true // height must be set for outline to display
        }
      })

      const redEllipse = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
        name: 'Red ellipse on surface',
        ellipse: {
          semiMinorAxis: 250000.0,
          semiMajorAxis: 400000.0,
          material: Cesium.Color.RED.withAlpha(0.5)
        }
      })

      const blueEllipse = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 100000.0),
        name: 'Blue translucent, rotated, and extruded ellipse with outline',
        ellipse: {
          semiMinorAxis: 150000.0,
          semiMajorAxis: 300000.0,
          extrudedHeight: 200000.0,
          rotation: Cesium.Math.toRadians(45),
          material: Cesium.Color.BLUE.withAlpha(0.5),
          outline: true
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

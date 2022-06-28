<template>
  <div id="CylinderAndGones" class="fullSize"></div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as Cesium from 'cesium'
import { Viewer } from 'cesium'
export default {
  name: 'CylinderAndGones',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      const viewer = new Cesium.Viewer('CylinderAndGones')

      const greenCylinder = viewer.entities.add({
        name: 'Green cylinder with black outline',
        position: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 200000.0),
        cylinder: {
          length: 400000.0,
          topRadius: 200000.0,
          bottomRadius: 200000.0,
          material: Cesium.Color.GREEN.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.DARK_GREEN
        }
      })

      const redCone = viewer.entities.add({
        name: 'Red cone',
        position: Cesium.Cartesian3.fromDegrees(-105.0, 40.0, 200000.0),
        cylinder: {
          length: 400000.0,
          topRadius: 0.0,
          bottomRadius: 200000.0,
          material: Cesium.Color.RED
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

<template>
  <!-- <div class="widget">
        <div id='view2D'></div>
        <div id='view3D'></div>
    </div> -->
  <div id="widget" class="fullSize">
    <div id="view3D"></div>
    <div id="view2D"></div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as Cesium from 'cesium'
import { Viewer } from 'cesium'
export default {
  name: 'mutiSynsView',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      // We want our two views to be synced across time, so we create
      // a shared clock object that both views share
      const clockViewModel = new Cesium.ClockViewModel()
      const options3D = {
        fullscreenButton: false,
        sceneModePicker: false,
        clockViewModel: clockViewModel
      }
      const options2D = {
        homeButton: false,
        fullscreenButton: false,
        sceneModePicker: false,
        clockViewModel: clockViewModel,
        infoBox: false,
        geocoder: false,
        sceneMode: Cesium.SceneMode.SCENE2D,
        navigationHelpButton: false,
        animation: false
      }
      // We create two viewers, a 2D and a 3D one
      // The CSS is set up to place them side by side
      const view3D = new Cesium.Viewer('view3D', options3D)
      const view2D = new Cesium.Viewer('view2D', options2D)

      let worldPosition
      let distance

      function sync2DView() {
        // The center of the view is the point that the 3D camera is focusing on
        const viewCenter = new Cesium.Cartesian2(Math.floor(view3D.canvas.clientWidth / 2), Math.floor(view3D.canvas.clientHeight / 2))
        console.log(viewCenter, 'viewCenter')
        // Given the pixel in the center, get the world position
        const newWorldPosition = view3D.scene.camera.pickEllipsoid(viewCenter)
        console.log(newWorldPosition, 'newWorldPosition')
        if (Cesium.defined(newWorldPosition)) {
          // Guard against the case where the center of the screen
          // does not fall on a position on the globe
          worldPosition = newWorldPosition
        }
        // Get the distance between the world position of the point the camera is focusing on, and the camera's world position
        distance = Cesium.Cartesian3.distance(worldPosition, view3D.scene.camera.positionWC)
        console.log(view3D.scene.camera.positionWC, ' view3D.scene.camera.positionWC')
        // Tell the 2D camera to look at the point of focus. The distance controls how zoomed in the 2D view is
        // (try replacing `distance` in the line below with `1e7`. The view will still sync, but will have a constant zoom)
        view2D.scene.camera.lookAt(worldPosition, new Cesium.Cartesian3(0.0, 0.0, distance))
      }

      // Apply our sync function every time the 3D camera view changes
      view3D.camera.changed.addEventListener(sync2DView)
      // By default, the `camera.changed` event will trigger when the camera has changed by 50%
      // To make it more sensitive, we can bring down this sensitivity
      view3D.camera.percentageChanged = 0.01

      // Since the 2D view follows the 3D view, we disable any
      // camera movement on the 2D view
      view2D.scene.screenSpaceCameraController.enableRotate = false
      view2D.scene.screenSpaceCameraController.enableTranslate = false
      view2D.scene.screenSpaceCameraController.enableZoom = false
      view2D.scene.screenSpaceCameraController.enableTilt = false
      view2D.scene.screenSpaceCameraController.enableLook = false
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

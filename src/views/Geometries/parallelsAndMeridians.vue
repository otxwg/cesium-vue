<template>
  <div id="parallelsAndMeridians" class="fullSize"><div id="toolbar"></div></div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as Cesium from 'cesium'
import { Viewer } from 'cesium'
export default {
  name: 'parallelsAndMeridians',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      const viewer = new Cesium.Viewer('parallelsAndMeridians')
      const toDegrees = Cesium.Math.toDegrees

      function parallel(latitude, color, granularity) {
        const name = `Parallel ${latitude}`
        return viewer.entities.add({
          name: name,
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray([-180, latitude, -90, latitude, 0, latitude, 90, latitude, 180, latitude]),
            width: 2,
            arcType: Cesium.ArcType.RHUMB,
            material: color,
            granularity: granularity
          }
        })
      }

      function meridian(longitude, color, granularity) {
        const name = `Meridian ${longitude}`
        return viewer.entities.add({
          name: name,
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray([longitude, 90, longitude, 0, longitude, -90]),
            width: 2,
            arcType: Cesium.ArcType.RHUMB,
            material: color,
            granularity: granularity
          }
        })
      }

      function labelCoordinates(cartographic) {
        const position = Cesium.Cartographic.toCartesian(cartographic)
        const latitude = toDegrees(cartographic.latitude).toFixed(4)
        const longitude = toDegrees(cartographic.longitude).toFixed(4)
        const label = `lat: ${latitude}°\nlon: ${longitude}°`

        return viewer.entities.add({
          position: position,
          label: {
            text: label,
            showBackground: true,
            font: '14px monospace'
          }
        })
      }

      function makeGrid(numberOfDivisions, color, show) {
        const parallels = makeParallelsRecursive(-90, 90, numberOfDivisions, color)
        const meridians = makeMeridiansRecursive(-180, 180, numberOfDivisions, color)
        meridians.push(meridian(180, color))

        const allLines = parallels.concat(meridians)
        allLines.forEach(function (line) {
          line.show = show
        })

        return allLines
      }

      function makeParallelsRecursive(minLatitude, maxLatitude, depth, color) {
        let result = []
        const midpoint = (minLatitude + maxLatitude) / 2
        result.push(parallel(midpoint, color))

        if (depth > 0) {
          const southernLines = makeParallelsRecursive(minLatitude, midpoint, depth - 1, color)
          const northernLines = makeParallelsRecursive(midpoint, maxLatitude, depth - 1, color)
          result = southernLines.concat(result, northernLines)
        }

        return result
      }

      function makeMeridiansRecursive(minLongitude, maxLongitude, depth, color) {
        let result = []
        const midpoint = (minLongitude + maxLongitude) / 2
        result.push(meridian(midpoint, color))

        if (depth > 0) {
          const westernLines = makeMeridiansRecursive(minLongitude, midpoint, depth - 1, color)
          const easternLines = makeMeridiansRecursive(midpoint, maxLongitude, depth - 1, color)
          result = westernLines.concat(result, easternLines)
        }

        return result
      }

      let showAntipodalPoint = false
      const primitives = {
        equator: parallel(0, Cesium.Color.BLUE),
        primeMeridian: meridian(0, Cesium.Color.BLUE),
        selectedPoint: {
          meridian: undefined,
          parallel: undefined,
          label: undefined
        },
        antipodalPoint: {
          meridian: undefined,
          parallel: undefined,
          label: undefined
        },
        lowResolutionGrid: makeGrid(2, Cesium.Color.PALEGREEN, false),
        higherResolutionGrid: makeGrid(5, Cesium.Color.DARKORANGE, false)
      }

      function updateCrosshairs(cartographic) {
        const selectedPoint = primitives.selectedPoint
        const antipodalPoint = primitives.antipodalPoint
        if (Cesium.defined(selectedPoint.parallel)) {
          viewer.entities.remove(selectedPoint.parallel)
          viewer.entities.remove(selectedPoint.meridian)
          viewer.entities.remove(selectedPoint.label)
          viewer.entities.remove(antipodalPoint.parallel)
          viewer.entities.remove(antipodalPoint.meridian)
          viewer.entities.remove(antipodalPoint.label)
        }

        const pointLatitude = toDegrees(cartographic.latitude)
        const antipodeLatitude = -pointLatitude

        const pointLongitude = toDegrees(cartographic.longitude)
        const antipodeLongitude = (pointLongitude + 180) % 360

        // Increase the granularity to improve accuracy when zoomed in
        const finerGranularity = 0.001
        const red = Cesium.Color.RED
        selectedPoint.parallel = parallel(toDegrees(cartographic.latitude), red, finerGranularity)
        selectedPoint.meridian = meridian(toDegrees(cartographic.longitude), red, finerGranularity)
        selectedPoint.label = labelCoordinates(cartographic)

        const cyan = Cesium.Color.CYAN
        const antipode = new Cesium.Cartographic.fromDegrees(antipodeLongitude, antipodeLatitude, 0)
        antipodalPoint.parallel = parallel(antipodeLatitude, cyan, finerGranularity)
        antipodalPoint.meridian = meridian(antipodeLongitude, cyan, finerGranularity)
        antipodalPoint.label = labelCoordinates(antipode)

        antipodalPoint.parallel.show = showAntipodalPoint
        antipodalPoint.meridian.show = showAntipodalPoint
        antipodalPoint.label.show = showAntipodalPoint
      }

      // Click to shift the cross-hairs
      viewer.screenSpaceEventHandler.setInputAction(function (mouse) {
        viewer.scene.pick(mouse.position)
        const ray = viewer.camera.getPickRay(mouse.position)
        const globe = viewer.scene.globe
        const cartesian = globe.pick(ray, viewer.scene)

        if (!Cesium.defined(cartesian)) {
          return
        }

        const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        updateCrosshairs(cartographic)
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

      Sandcastle.addToggleButton('Show equator', true, function (checked) {
        primitives.equator.show = checked
      })

      Sandcastle.addToggleButton('Show prime meridian', true, function (checked) {
        primitives.primeMeridian.show = checked
      })

      Sandcastle.addToggleButton('Show low-resolution grid', false, function (checked) {
        primitives.lowResolutionGrid.forEach(function (line) {
          line.show = checked
        })
      })

      Sandcastle.addToggleButton('Show higher-resolution grid', false, function (checked) {
        primitives.higherResolutionGrid.forEach(function (line) {
          line.show = checked
        })
      })

      Sandcastle.addToggleButton('Show antipodal point', false, function (checked) {
        showAntipodalPoint = checked
        const antipodalPoint = primitives.antipodalPoint

        if (Cesium.defined(antipodalPoint.parallel)) {
          antipodalPoint.parallel.show = showAntipodalPoint
          antipodalPoint.meridian.show = showAntipodalPoint
          antipodalPoint.label.show = showAntipodalPoint
        }
      })
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

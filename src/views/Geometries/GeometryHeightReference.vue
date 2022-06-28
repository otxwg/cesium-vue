<template>
  <div id="GeometryHeightReference" class="fullSize"><div id="toolbar"></div></div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import * as Cesium from 'cesium'
import { Viewer } from 'cesium'
export default {
  name: 'GeometryHeightReference',
  components: {},
  props: {},
  setup(props, context) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    onBeforeMount(() => {})
    onMounted(() => {
      const cesiumTerrainProvider = Cesium.createWorldTerrain()
      const ellipsoidTerrainProvider = new Cesium.EllipsoidTerrainProvider()
      const viewer = new Cesium.Viewer('GeometryHeightReference', {
        baseLayerPicker: false,
        terrainProvider: cesiumTerrainProvider
      })
      // depth test against terrain is required to make the polygons clamp to terrain
      // instead of showing through it from underground
      viewer.scene.globe.depthTestAgainstTerrain = true
      Sandcastle.addToolbarMenu([
        {
          text: 'Polygons',
          onselect: function () {
            viewer.entities.removeAll()
            addPolygons()
          }
        },
        {
          text: 'Boxes, Cylinders and Ellipsoids',
          onselect: function () {
            viewer.entities.removeAll()
            addGeometries()
          }
        }
      ])
      Sandcastle.addToolbarMenu([
        {
          text: 'Terrain Enabled',
          onselect: function () {
            viewer.scene.terrainProvider = cesiumTerrainProvider
          }
        },
        {
          text: 'Terrain Disabled',
          onselect: function () {
            viewer.scene.terrainProvider = ellipsoidTerrainProvider
          }
        }
      ])
      const longitude = 6.950615989890521
      const latitude = 45.79546589994886
      const delta = 0.001
      function addGeometry(i, j) {
        const west = longitude + delta * i
        const north = latitude + delta * j + delta
        const type = Math.floor(Math.random() * 3)
        if (type === 0) {
          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(west, north, 0.0),
            box: {
              dimensions: new Cesium.Cartesian3(40.0, 30.0, 50.0),
              material: Cesium.Color.fromRandom({ alpha: 1.0 }),
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
          })
        } else if (type === 1) {
          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(west, north, 0.0),
            cylinder: {
              length: 50.0,
              topRadius: 20.0,
              bottomRadius: 20.0,
              material: Cesium.Color.fromRandom({ alpha: 1.0 }),
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
          })
        } else {
          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(west, north, 0.0),
            ellipsoid: {
              radii: new Cesium.Cartesian3(20.0, 15.0, 25.0),
              material: Cesium.Color.fromRandom({ alpha: 1.0 }),
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
          })
        }
      }
      function addGeometries() {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            addGeometry(i, j)
          }
        }
        viewer.zoomTo(viewer.entities)
      }
      function addPolygon(i, j) {
        const west = longitude + delta * i
        const east = longitude + delta * i + delta
        const south = latitude + delta * j
        const north = latitude + delta * j + delta
        const a = Cesium.Cartesian3.fromDegrees(west, south)
        const b = Cesium.Cartesian3.fromDegrees(west, north)
        const c = Cesium.Cartesian3.fromDegrees(east, north)
        const d = Cesium.Cartesian3.fromDegrees(east, south)
        const positions = [a, b, c, d]
        viewer.entities.add({
          polygon: {
            hierarchy: positions,
            material: Cesium.Color.fromRandom({ alpha: 1 }),
            height: 40.0,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            extrudedHeight: 0.0,
            extrudedHeightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          }
        })
      }
      function addPolygons() {
        // create 16 polygons that are side-by-side
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            addPolygon(i, j)
          }
        }
        viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(longitude, latitude, 1500), new Cesium.HeadingPitchRange(-Cesium.Math.PI / 2, -Cesium.Math.PI_OVER_FOUR, 2000))
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
      }
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

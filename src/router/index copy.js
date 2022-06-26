/*
 * @version: 1.0.0
 * @Author: otxwg<1987991967@qq.com>
 * @Date: 2022-06-13 23:30:00
 * @LastEditTime: 2022-06-13 23:30:00
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../layout/index'

import ArcGISMapServer from '../views/Beginner/ArcGISMapServer.vue'
import ArcGISTiledElevationTerrainProvider from '../views/Beginner/ArcGISTiledElevationTerrainProvider.vue'
import Billboard from '../views/Beginner/Billboard.vue'
import CallbackProperty from '../views/Beginner/CallbackProperty.vue'
import cardboard from '../views/Beginner/cardboard.vue'
debugger
import CustomRoutes from './autorouter'
console.log(CustomRoutes, 'CustomRoutes')

export const routes = [
  {
    path: '/',
    name: 'Beginner',
    component: Layout,
    children: [
      {
        path: '/ArcGISMapServer',
        name: 'ArcGISMapServer',
        component: ArcGISMapServer
      },
      {
        path: '/ArcGISTiledElevationTerrainProvider',
        name: 'ArcGISTiledElevationTerrainProvider',
        component: ArcGISTiledElevationTerrainProvider
      },
      {
        path: '/Billboard',
        name: 'Billboard',
        component: Billboard
      },
      {
        path: '/CallbackProperty',
        name: 'CallbackProperty',
        component: CallbackProperty
      },
      {
        path: '/cardboard',
        name: 'cardboard',
        component: cardboard
      }
    ]
  },
  {
    path: '/3D-Tiles',
    name: '3D Tiles',
    component: Layout,
    children: [
      // {
      //   path: '/createOsmBuildings',
      //   name: 'createOsmBuildings',
      //   component: CesiumContainer
      // }
    ]
  },
  {
    path: '/3D-Tiles-Next',
    name: '3DTiles Next',
    component: Layout,
    children: []
  },
  {
    path: '/Post-Processing',
    name: 'Post Processing',
    component: Layout,
    children: []
  },
  {
    path: '/ion-Assets',
    name: 'ion Assets',
    component: Layout,
    children: []
  },
  {
    path: '/Geometries',
    name: 'Geometries',
    component: Layout,
    children: []
  },
  {
    path: '/Datasources',
    name: 'Datasources',
    component: Layout,
    children: []
  },
  {
    path: '/CZML',
    name: 'CZML',
    component: Layout,
    children: []
  },
  {
    path: '/Development',
    name: 'Development',
    component: Layout,
    children: []
  }
  // {
  //   path: '/Development',
  //   name: 'Development',
  //   component: Layout,
  //   children: []
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

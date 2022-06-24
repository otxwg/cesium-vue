/*
 * @version: 1.0.0
 * @Author: otxwg<1987991967@qq.com>
 * @Date: 2022-06-13 23:30:00
 * @LastEditTime: 2022-06-13 23:30:00
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import CesiumContainer from '../views/CesiumContainer.vue'
import ArcGISMapServer from '../views/ArcGISMapServer.vue'

import Layout from '../layout/index'
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
      }
    ]
  },
  {
    path: '/3D-Tiles',
    name: '3D Tiles',
    component: Layout,
    children: [
      {
        path: '/createOsmBuildings',
        name: 'createOsmBuildings',
        component: CesiumContainer
      }
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

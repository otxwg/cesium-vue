/*
 * @version: 1.0.0
 * @Author: otxwg<1987991967@qq.com>
 * @Date: 2022-06-13 23:30:00
 * @LastEditTime: 2022-06-13 23:30:00
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import viewroutes from './autorouter'
export const routes = viewroutes
const router = createRouter({
  history: createWebHashHistory(),
  routes: viewroutes
})

export default router

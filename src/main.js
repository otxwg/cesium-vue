import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as Cesium from 'cesium'
import './util/Sandcastle-header'
// new Viewer('cesiumContainer')
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YzFkYjQzNC1kMzI5LTQ2N2MtOWY4Ny01NDc5Nzc1MzM0M2MiLCJpZCI6OTY4ODIsImlhdCI6MTY1NDc0ODc2NX0.S8QVMkdpyXMiJhPKfWg1jncb9Fz8HRsIVdOJ0Sl-fVg'

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// console.log(app, 'app')
app.use(ElementPlus).use(store).use(router).mount('#app')

import Layout from '../layout/index'
function importAll(r) {
  let __modules = {}
  //   console.log(r.keys()) //可以得到一串数组，是所有以.vue为后缀的文件路径
  r.keys().forEach((key) => {
    let m = r(key).default
    let n = m.name || getfilename(m.__file)
    __modules[n] = m
  })
  return __modules
}

//获取路径中的文件名称
function getfilename(filename) {
  let arr = filename.split('/')
  let filenameword = arr[arr.length - 1].split('.')
  return filenameword[0]
}

const dir = ['/Beginner', '/3D Tiles', '/3DTiles Next', '/CZML', '/Datasources', '/Development', '/Geometries', '/ion Assets', '/Post Processing']

//webpack的方法可以获取某一文件夹views下以.vue结尾的文件，第二个参数表示是否包含views内部文件夹里的文件
const components = importAll(require.context('@/views', true, /\.vue$/))
console.log(components, 'components')
let children = []

for (let item in components) {
  // debugger
  let paths = components[item].__file.split('/')
  let fileName = paths[paths.length - 1].substring(0, paths[paths.length - 1].length - 4)
  children.push({ path: `/${item}`, name: `${fileName}`, component: components[item], parent: `/${paths[2]}` })
}

let customRoute = []
dir.forEach((path) => {
  const childRoutes = children.filter((child) => child.parent === path)
  let pName = path.slice(1)
  if (childRoutes.length) {
    if (path === '/Beginner') {
      path = '/'
    }
    customRoute.push({
      path: `${path}`,
      name: pName,
      component: Layout,
      children: childRoutes
    })
  } else {
    customRoute.push({
      path: `${path}`,
      name: pName,
      component: Layout,
      children: []
    })
  }
})

export default customRoute

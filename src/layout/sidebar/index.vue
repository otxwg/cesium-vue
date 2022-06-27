<template>
  <div class="left-warp">
    <div class="no-inherit">
      <el-icon color="#409EFC" class="btn" :class="{ 'btn-active': !isCollapse }" @click="change">
        <Expand />
      </el-icon>
    </div>
    <el-menu style="height: calc(100% - 30px);overflow: auto;" active-text-color="#ffd04b" :collapse="isCollapse"
      background-color="rgb(32, 34, 42)" class="el-menu-vertical-demo" text-color="#fff" @open="handleOpen"
      @close="handleClose">
      <sidebar-item :menu="menu" :isCollapse="isCollapse" :init-tag-value="defalutTagValue" :props="{
          label: 'label',
          path: 'path',
          icon: 'icon',
          children: 'children'
        }" />
    </el-menu>
  </div>
</template>
<script>
  import { onMounted } from 'vue'
  import { routes } from '../../router'
  import sidebarItem from './sidebarItem.vue'
  import { ref, reactive, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  export default {
    name: 'sidebar',
    components: { sidebarItem },
    setup(props, { emit }) {
      let defalutTagValue = ref('')
      const router = useRouter()
      const route = useRoute()
      const getDefalutTagValue = () => {
        if (route.path !== '/') {
          return route.path
        }
        if (menutree.length !== 0) {
          let paths = ''
          if (menutree[0].children.length !== 0) {
            paths = menutree[0].children[0].path
          } else {
            paths = menutree[0].path
          }
          return paths
        } else {
          return '/Beginner'
        }
      }
      onMounted(() => {

        defalutTagValue = getDefalutTagValue()
      })
      const isCollapse = ref(false)
      // 直接侦听一个 ref
      const count = ref(0)
      watch(isCollapse, (isCollapse, previsCollapse) => {
        /* ... */
        // console.log(isCollapse, 'isCollapse')
        emit('collapseChange', isCollapse)
      })

      const menu = reactive(routes)
      const change = () => {
        isCollapse.value = !isCollapse.value
      }
      const handleOpen = (key, keyPath) => {

      }
      const handleClose = (key, keyPath) => {

      }
      const menutree = JSON.parse(JSON.stringify(menu))
      const deep = (menutree) => {
        menutree.forEach((item) => {
          delete item.component
          item.menuName = item.name
          if (item.children) {
            deep(item.children)
          }
        })
      }
      deep(menutree)
      return { menu: menutree, isCollapse, defalutTagValue, handleOpen, handleClose, getDefalutTagValue, change }
    }
  }
</script>
<style lang="scss" scoped>
  :deep(.el-menu) {
    border-right: none !important;
  }

  .left-warp {
    height: 100%;
    background: rgb(32, 34, 42);
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 298px;
    min-height: 400px;
  }

  .no-inherit {
    cursor: pointer;
    background: rgb(32, 34, 42);
    height: 30px;
    line-height: 30px;
    margin-left: -4px;
  }

  .btn {
    width: 30px;
    margin-left: 20px;
  }

  .btn-active {
    margin-left: 263px;
    width: 30px;
  }
</style>
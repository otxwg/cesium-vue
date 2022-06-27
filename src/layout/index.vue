<template>
  <div class="layout">
    <sidebar class="sidebar" :class="{ 'sidebar-active': collapse }" @collapseChange="collapseChange"></sidebar>
    <div class="main" :class="{ 'main-active': collapse }">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import { onMounted, ref } from 'vue'
  import sidebar from './sidebar'
  export default {
    name: 'layout',
    components: {
      sidebar
    },
    setup() {
      onMounted(() => {

      })
      let collapse = ref(false)
      const collapseChange = (val) => {
        collapse.value = val
      }
      return { collapseChange, collapse }
    }
  }
</script>
<style lang="scss" scoped>
  .layout {
    height: 100%;
    width: 100%;
    display: flex;

  }

  .sidebar {
    width: 298px;
  }

  .sidebar-active {
    width: 64px;
  }

  .main {
    flex: 1;
    position: relative;

  }

  .main-active {
    flex: 1;

  }
</style>
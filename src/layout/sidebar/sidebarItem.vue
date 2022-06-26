<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="validatenull(item['children'])" :index="item['path']" @click="open(item)"
        :key="item['menuName']">
        <span :alt="item['path']"> <span v-show="!isCollapse">
            <el-icon color="#409EFC" class="no-inherit">
              <Baseball />
            </el-icon>{{ generateTitle(item) }}
          </span></span>
      </el-menu-item>
      <el-sub-menu show-timeout="0" hide-timeout="300" v-else-if="!validatenull(item['children'])"
        :index="item['path'] === '' ? item['menuName'] : item['path']" :key="item['menuName']">
        <template #title>
          <el-icon color="#409EFC" class="no-inherit">
            <Fold />
          </el-icon><span v-show="!isCollapse">{{generateTitle(item) }}</span>
        </template>
        <template v-for="(child, cindex) in item['children']">
          <el-menu-item :index="child['path'] || cindex" @click="open(child)" v-if="validatenull(child['children'])"
            :key="child['menuName']" :class="{ 'is-active': vaildAvtive(child) }">
            <el-icon color="#409EFC" class="no-inherit">
              <Baseball />
            </el-icon>
            <span v-show="!isCollapse">{{ generateTitle(child) }}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cindex" :props="{
              label: 'label',
              path: 'path',
              icon: 'icon',
              children: 'children'
            }"></sidebar-item>
        </template>
      </el-sub-menu>
    </template>
  </div>
</template>
<script>
  import { onMounted } from 'vue'
  import { routes } from '../../router'
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  export default {
    name: 'sidebarItem',
    props: {
      menu: {
        type: Array
      },
      initTagValue: {
        type: String,
        default: ''
      },
      props: {
        type: Object,
        default: () => {
          return {}
        }
      },
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      onMounted(() => {
        // console.log(routes, 'sidebarItem')
      })

      const router = useRouter()
      const route = useRoute()
      const vaildAvtive = (item) => {
        const groupFlag = (item['group'] || []).some((ele) => route.path.includes(ele))
        return props.initTagValue === item['path'] || groupFlag
      }
      const validatenull = (val) => {
        if (typeof val === 'boolean') {
          return false
        }
        if (typeof val === 'number') {
          return false
        }
        if (val instanceof Array) {
          if (val.length == 0) return true
        } else if (val instanceof Object) {
          if (JSON.stringify(val) === '{}') return true
        } else {
          if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') {
            return true
          }
          return false
        }
        return false
      }
      const generateTitle = (item, keyPath) => {
        return item.name
      }
      const open = (item) => {
        router.push({
          path: item.path,
          query: item.query
        })
      }

      return { generateTitle, validatenull, open, vaildAvtive, isCollapse: props.isCollapse }
    }
  }
</script>
<style lang="scss" scoped>
  .sidebarItem {
    width: 100%;
  }
</style>
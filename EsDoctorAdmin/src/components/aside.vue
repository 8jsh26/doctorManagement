
<template>
    <el-menu
        :style="{width:isCollaps?'64px':'230px'}"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#fff"
        :router="false"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollaps"
      >
      <p class="DD-title">{{isCollaps?'医疗':'医疗管理'}}</p>
      <treeMenu :menuData="menuData" :index="1" />
      </el-menu>
</template>

<script setup>
import treeMenu from './treeMenu.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';

const router = useRouter();
// console.log(router)
const menuData = reactive(router.options.routes[0].children)
// 动态路由就去store获取(但是得先登入获取数据存储到store)
// const menuData = computed(()=>store.state.menu.routerList)

//vuex 操作
const store = useStore();
const isCollaps = computed(()=>store.state.menu.isCollaps)
const defaultActive=computed(()=>store.state.menu.menuActive)
// console.log(isCollaps)
const handleOpen=(key,keyPath)=>{
//   console.log(key, keyPath)
}
const handleClose=()=>{
        
}
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo{
        height: 100%;
        .DD-title{
            font-size: 20px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            color:#fff;
        }
    }
</style>



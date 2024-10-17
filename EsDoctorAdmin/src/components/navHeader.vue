<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon class="icon" size="20" @click="store.commit('collapsMenu')"><Fold /></el-icon>
            <ul class="flex-box ">
                <li v-for="(item,index) in menus" :key="item.path" 
                    class="flex-box item-menu"
                    @click="selectMenu(item)"
                    :class="{active:item.path===route.path}"
                >
                    <!-- <router-link :to="item.meta.path"> -->
                        <!--因为removeMenu(item,index)在selectMenu(item)内部，所以当点击删除时也会触发selectMenu，导致路由跳转失败，
                        所以需要阻止默认事件，即stopPropagation() -->
                        <el-icon size="12" > <component :is="item.icon" /></el-icon>
                        <span class="item-menu-name">{{item.name}}</span>
                        <el-icon size="12" class="close-icon" 
                        @click.stop="removeMenu(item,index)"
                        >
                            <Close />
                        </el-icon>
                    <!-- </router-link> -->
                </li>
            </ul>
        </div>
        <!-- <div></div> -->
        <div class="header-right">
            <el-dropdown>
                <div class="el-dropdown-link flex-box">
                    <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                    <p class="user-name">admin</p>
                </div>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleClick">退出登入</el-dropdown-item>
                    <!-- <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item> -->
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { computed,reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute,useRouter} from 'vue-router'

const store=useStore()
const menus=computed(()=>store.state.menu.selectMenu)
const route=useRoute() // 获取当前路由实例
const router=useRouter()

const selectMenu=(item)=>{
    router.push(item.path)
    store.commit('updataMenuActive',item.id)
}
// 删除菜单
const removeMenu=(item,index)=>{
    const length=menus.value.length
    store.commit('removeMenu',item)
    if(item.path!==route.path)return
    if(menus.value.length>=1)
    {
        if(index<length-1)
        {
            selectMenu(menus.value[index])
        }
        else
        {
            selectMenu(menus.value[index-1])
            // router.push(menus.value[index-1].path)
        }
    }
    else{
        router.push('/')
    }
}
// 退出登入
const handleClick=()=>{
    localStorage.removeItem('pz_token')
    localStorage.removeItem('pz_userInfo')
    localStorage.removeItem('pz_router')
    window.location.href = window.location.origin
}

</script>

<style lang="less" scoped>
.flex-box{
    display: flex;
    align-items: center;
    height: 100%;
}
.header-container {
    // width: 100%;
    display: flex;
    height: 100%;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    padding-right: 25px;
    .header-left{
        height: 100%;
        .icon{
            height: 100%;
            display: flex;
            width: 45px;
        }
        .icon:hover{
            background-color: #f5f5f5;
            cursor: pointer;
        }
        .item-menu{
             height: 100%;
            // width: 120px;
            padding: 0 10px;
            .item-menu-name{
                    margin: 0 5px;
            }
            .close-icon{
                 visibility: hidden;
            }
            &.active{
                // background-color: #409EFF;
            color: #409EFF;
            background-color: #f5f5f5;
                .item-menu-name{
                    color: #409EFF;
                }
            }
        }
        .item-menu:hover{
            background-color: #f5f5f5;
            cursor: pointer;
            .close-icon{
                visibility: inherit;
                color: red;
             }
        }
    }
    .header-right{
        height: 100%;
        display: flex;
        align-items: center;
        .user-name{
            margin-left: 10px;
        }
    }
}
</style>
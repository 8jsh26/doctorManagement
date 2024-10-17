<template>
    <!-- <el-sub-menu index="1">
        <template #title>
            <el-icon>
                <location />
            </el-icon>
            <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
        <el-icon>
            <document />
        </el-icon>
        <span>Navigator Three</span>
    </el-menu-item> -->
    <template v-for="(item,index) in props.menuData">
        <el-menu-item v-if="!item.children || item.children.length == 0"
            :index="item.meta.id"
            :key="item.meta.id"
            @click="menuRouter(item)"
        >
            <el-icon size="20">
                <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.name }}</span>
        </el-menu-item>
        <el-sub-menu v-else 
            :index="item.meta.id"
        >
            <template #title>
                <el-icon size="20">
                    <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta.name }}</span>
            </template>
            <el-menu-item-group>
                    <treeMenu :menuData="item.children" :index="item.meta.id" />
                </el-menu-item-group>
        </el-sub-menu>
    </template>
    <!-- <el-menu-item index="4">
        <el-icon>
            <setting />
        </el-icon>
        <span>Navigator Four</span>
    </el-menu-item> -->
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
    const props = defineProps(
        [
            'menuData',
            'index'
        ],
    )
    const router = useRouter();
    const store = useStore();
    const menuRouter = (item) => {
        // console.log(item)
        store.commit('addMenu',item.meta)
        router.push(item.meta.path)
        store.commit('updataMenuActive',item.meta.id)
    }
    // console.log(props.menuData)
</script>
<style lang="less" scoped></style>
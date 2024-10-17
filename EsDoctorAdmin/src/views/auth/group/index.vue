<template>
    <panel-header :title="'菜单管理'" />
    <div style="background-color: #fff;">
        <el-button @click="AddEdit(false)" type="primary" :icon="Plus" size="small" class="top-button">添加</el-button>
        <el-table
            :data="tableData"
        >
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="group" label="菜单权限" />
            <el-table-column label="操作">
                <template #default="scope">
                    <div>
                        <el-button type="primary" @click="AddEdit(true)">编辑</el-button>
                </div>
                </template>
            </el-table-column>
        </el-table>
             <div style=" display: flex;  
  justify-content: flex-end;">
                    
        <!-- 分页 :hide-on-single-page="value"只有一页时 隐藏 -->
                <el-pagination  
                        v-model:current-page="form.currentPage"
                        @change="handleSizeChange(form.currentPage)"
                        :hide-on-single-page="true"
                        :page-size="10"
                        :pager-count="7"
                        layout="prev, pager, next"
                        :total="form.total"
                    />
            </div>
    </div>
    <addModel  :dialogTableVisible="dialogTableVisible" :mdl="mdl" @handleClose="()=>dialogTableVisible=false"/>
</template>

<script setup>
import { ref,reactive } from 'vue';
import { Plus} from '@element-plus/icons-vue'
import addModel from './model/addModel.vue';
import panelHeader from '../../../components/panelHeader.vue';

const dialogTableVisible = ref(false);
const mdl = ref(false);
const tableData = reactive([
    {
        username: '小雨',
        sex:'男',
        group:'账号管理'
    },
])

const form = reactive({
    username: '',
    sex: '',
    group: '',
    currentPage:1,
    total: 100
})


const AddEdit = (mdlValue) => {
    // console.log(dialogTableVisible)
    dialogTableVisible.value = true;
    mdl.value = mdlValue;
}
const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
}
// const handleClose = (close) => {
//     if(close)
//     {
//         dialogTableVisible.value = false;
//     }
// }
</script>

<style lang="less" scoped>
.top-button{
    margin: 10px 0px  10px 5px;
}
</style>
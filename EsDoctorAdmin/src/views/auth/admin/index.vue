<template>
    <panel-header :title="'账号管理'" />
    <div style="background-color: #fff;">
    <el-table
     :data="tableData"
     
    >
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="role" label="管理权限" />
        <el-table-column label="操作">
            <template #default="scope">
                <div>
                    <el-button type="primary" @click="editButton(id)">编辑</el-button>
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
    <edit-model :dialogTableVisible="dialogTableVisible" @handleClose="dialogTableVisible=false" :id="editId"/>
</template>

<script setup>
import editModel from './model/editModel.vue'
import  panelHeader from '../../../components/panelHeader.vue'
import {reactive,ref} from 'vue'

const tableData=reactive([
    {
        username: '小雨',
        sex: '男',
        phone: '13845766658',
        role: '账号管理',
        id:''
    }
])
const form=reactive({
    username:'',
    phone:'',
    role:'',
    currentPage:1,
    total:100
})

const editId=ref('')

const dialogTableVisible=ref(false)

const editButton=(id)=>{
    dialogTableVisible.value=true
    editId.value=id
}

// 分页调整器
const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
}
</script>

<style scoped>
</style>
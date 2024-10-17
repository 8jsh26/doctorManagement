<template>
    <panel-header :title="'就诊状态'" />
    <div class="container">
        <div class="top-cantainer">
            <el-button @click="AddEdit(false)" type="primary" :icon="Plus" size="small" class="top-button">添加</el-button>
            <el-button @click="deleteButton(false,selectableIds)" type="danger" :icon="Delete" size="small" class="top-button">删除</el-button>
            <el-input
            class="search-input"
            v-model="input"
            size="default"
            placeholder="请输入名字"
            :suffix-icon="Search"
    />
        </div>
        <el-table
        ref="table"
        :data="tableData"
        @selection-change="handleSelectionChange"
        >
        <!-- :selectable禁用哪项不被选中 -->
        <el-table-column type="selection"  width="55" />
            <el-table-column prop="username" fixed label="姓名" width="120" />
            <el-table-column  prop="avater" label="头像"> 
                <template #default="scope">
                    <div>
                        <el-image
                        v-if="scope.row.avater"
                            :src="scope.row.avater"
                            width="50"
                            height="50"
                        />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="department" label="科室" width="100" /> 
            <el-table-column prop="phone" label="手机号" width="160"/>
            <el-table-column prop="state" label="当前状态" >
                <template #default="scope">
                    <el-tag 
                    :type="scope.row.state==='0'?
                    'danger':scope.row.state==='1'
                    ?'warning':'success'">
                    {{scope.row.state==='0'?'休息':scope.row.state==='1'?'就诊中':'在线'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="daterange" label="就诊日期" width = "200" :align="'center'"/>
            <el-table-column prop="dateTime" label="就诊时间" width="200" :align="'center'">
                <template #default="scope">
                    <div v-if = "scope.row.dateTime" style="display: flex;">
                            <div>   
                                <el-tag v-for="item in (scope.row.dateTime.length >2 ? 2:scope.row.dateTime.length)" :key="item" :type="'success'">
                                    {{scope.row.dateTime[item-1]}}
                                 </el-tag>
                            </div>
                            <div v-if="scope.row.dateTime.length>1" style="display: flex; align-items: center;">
                                <el-popover placement="right" 
                                    :width="400" 
                                    trigger="click"
                                    @before-enter = "beforeDateTimeEnter(scope.row.dateTime)"
                                >
                                    <template #reference>
                                         <el-button type="primary" link >...</el-button>
                                    </template>
                                    <template #default>
                                        <el-form>
                                            <el-form-item  v-for="item in DateTimeForm" :label="item.label">
                                                <el-checkbox v-for="value in item.value" 
                                                size="small"
                                                :disabled="true" :checked="true" :label="value" />
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-popover>
                            </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="160" :align="'center'"/>
            <el-table-column label="操作" fixed="right" width="160" :align="'center'">
                <template #default="scope">
                    <div>
                        <el-button type="primary" @click="AddEdit(true,scope.row.id)">编辑</el-button>
                        <el-button type="danger" @click="deleteButton(scope.row.id)">删除</el-button>
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
    <add-edit-model  :dialogTableVisible="dialogTableVisible" :mdl="mdl" @handleClose="()=>dialogTableVisible=false"/>
</template>

<script setup>
import addEditModel from './model/addEditModel.vue'
import  panelHeader from '../../../components/panelHeader.vue'
import {reactive,ref} from 'vue'
import { Plus, Delete ,Search} from '@element-plus/icons-vue'


// 表格数据(后端获取)
const tableData=reactive([
    {
        username: '小雨',
        sex: '1',
        avater:'',
        department:'儿科',
        phone: '13845766658',
        state:'2',
        createTime:'',
        dateTime:['2023-05-05/上午','2023-05-05/下午','2023-05-06/下午'],
        daterange:'2023-05-05 ~ 2023-05-06',
        id:''
    }
])

const doctorSex = reactive([
    {key: '1', value: '男'},
    {key: '2', value: '女'}
])
const doctorState = reactive([
    {key: '0', value: '休息'},
    {key: '1', value: '就诊中'},
    {key: '2', value: '在线'}
])
const form=reactive({
    username:'',
    phone:'',
    role:'',
    currentPage:1,
    total:100
})
// 添加编辑弹窗
const editId=ref('')

const dialogTableVisible=ref(false)
const mdl=ref(false)
const AddEdit=(mdlValue,id)=>{
    dialogTableVisible.value=true
    mdl.value = mdlValue;
    editId.value=id
}

// 选择
const selectableIds = ref([])
const handleSelectionChange = (val) => {
    selectableIds.value = val;
}
// 删除
const deleteButton = (id) => {
    const ids = Array.isArray(id) ? id : [id];
    // 请求数据删除
    console.log(ids)
}
// 分页调整器
const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
}

// 就诊时间数据过，使用多弹出框的数据调整
const DateTimeForm = ref([])
const beforeDateTimeEnter = (val)=>{
    // console.log(val)
    const array = []
    for(const item in val)
    {
       const isArray= array.find((value)=>value.label==val[item].split('/')[0])
        if(item>0 && item<val.length-1 && isArray){
            isArray.value.push(val[item].split('/')[1])
        } else{
            array.push({
                label:val[item].split('/')[0],
                value:[val[item].split('/')[1]]
            })
        }
    }
    DateTimeForm.value = array
    console.log(DateTimeForm)
}


// 时间格式
const getTime=(date)=>{
        const dateTime=new Date()
        const year = dateTime.getFullYear()
        const month = String(dateTime.getMonth()+1).padStart(2, '0')
        const day =String(dateTime.getDate()).padStart(2, '0')
        const hours = String(dateTime.getHours()).padStart(2, '0')
        const minutes = String(dateTime.getMinutes()).padStart(2, '0')
        const seconds = String(dateTime.getSeconds()).padStart(2, '0')
        promiseForm.createTime= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
</script>

<style lang="less" scoped>
.container{
    background-color: #fff;
    .top-cantainer{
        display: flex;
        .search-input{
        width: 240px;
        margin-left: auto;
        margin-bottom: 20px;
        margin-top: 10px;
    /* float: right; */
        }
    }
}
.top-button{
    margin: 10px 0px  10px 5px;
}

</style>
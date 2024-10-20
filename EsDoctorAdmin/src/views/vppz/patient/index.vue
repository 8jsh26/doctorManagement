<template>
    <panel-header :title="'就诊状态'" />
    <div class="container">
        <div class="top-cantainer">
            <el-input
                class="search-input"
                v-model="input"
                size="default"
                placeholder="请输入名字"
                :suffix-icon="Search"
            />
            <el-button type="primary" class="top-button">查询</el-button>
        </div>
        <el-table ref="table" :data="tableData">
            <el-table-column label="患者姓名" prop="username" width="120px" />
            <el-table-column label="性别" prop="sex" :align="'center'" width="80px" />
            <el-table-column label="患者年龄" prop="age" :align="'center'" />
            <el-table-column label="患者电话" prop="usernamePhone" :align="'center'" />
            <el-table-column label="患者病因" prop="disease"></el-table-column>
            <el-table-column label="就诊科室" prop="department" :align="'center'" />
            <el-table-column label="就诊医生" prop="doctor" :align="'center'" />
            <el-table-column label="就诊医生手机号" prop="doctorPhone" :align="'center'" />
            <el-table-column label="需支付费用" prop="cost" />
            <el-table-column label="已支付费用" prop="pay" />
            <el-table-column label="就诊状态" prop="status">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 0" type="success">就诊中</el-tag>
                    <el-tag v-else-if="scope.row.status == 1" type="primary">待就诊</el-tag>
                    <el-tag v-else-if="scope.row.status == 2" type="info">已完成</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-popconfirm 
                        v-if = "scope.row.status == 0 || scope.row.status == 1"
                        confirm-button-text="Yes" cancel-button-text="No" 
                        :icon="InfoFilled"
                        icon-color="#626AEF" title="是否确认完成"
                        @confirm="confirmEvent(scope.row)"
                        >
                        <template #reference>
                            <el-button type="primary" link>服务完成</el-button>
                        </template>
                    </el-popconfirm>
                    <el-button v-else disabled type="primary" link>服务完成</el-button>
                    
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">

            <!-- 分页 :hide-on-single-page="value"只有一页时 隐藏 -->
            <el-pagination v-model:current-page="form.currentPage" @change="handleSizeChange(form.currentPage)"
                :hide-on-single-page="true" :page-size="10" :pager-count="7" layout="prev, pager, next"
                :total="form.total" />
        </div>
    </div>
</template>

<script setup>
// import addEditModel from './model/addEditModel.vue'
import panelHeader from '../../../components/panelHeader.vue'
import { reactive, ref } from 'vue'
import { InfoFilled,Search } from '@element-plus/icons-vue'

const tableData = reactive([
    {
        username: '小雨',
        sex: '1',
        age:'18',
        department: '儿科',
        doctor: '',
        usernamePhone: '13845766658',
        disease:'',
        doctorPhone: '',
        createTime: '',
        cost: '100',
        pay: '0',
        status: 1,
        id: ''
    }
])
// 表单需要请求数据
const form = reactive({
    username: '',
    phone: '',
    role: '',
    currentPage: 1,
    total: 100
})
// 分页调整器
const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
}

// 待服务确定
const confirmEvent = (val)=>{
    val.status =  2
}

</script>

<style lang="less" scoped>

.container {

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
        .top-button {
    margin: 10px 0px 10px 5px;
}

    }
}

.pagination {
    display: flex;
    justify-content: flex-end;
}
</style>
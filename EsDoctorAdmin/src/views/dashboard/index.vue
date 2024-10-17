<template>
    <panel-header :title="'控制台'" />
    <div class="container">
        <div class="container-top">
            <el-row :gutter="10" justify="center">
                <el-col :span="12">
                    <el-card>
                        <template #default>
                            <div class="card-left">
                                <el-avatar :size="100"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                <span>admin</span>
                            </div>
                        </template>
                        <template #footer>
                            <div class="card-left-footer">

                            </div>
                        </template>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card>
                        <template #default>
                            <div class="card-right">
                                <el-avatar :size="100"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                                <span>admin</span>
                            </div>
                        </template>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="container-bottom">
            <el-row justify="center">
                <el-card class="container-bottom-card">
                    <bar-chart class="chartLine" :chartData="chartData" :chartOptions="chartOptions" />
                </el-card>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import panelHeader from '../../components/panelHeader.vue'
import BarChart from '../../components/BarChart.vue'
import {onBeforeMount, reactive, ref } from 'vue';



const currentDateList = ref([]) // 当前一周的日期列表
const chartData = reactive({
    labels:currentDateList,
    datasets: [
        {
            label: '就诊次数',
            backgroundColor: '#42A5F5',
            data: [40, 60, 80, 70, 100, 120,30] // 示例数据
        }
    ]
})
const chartOptions = reactive({
    responsive: true, // 确保图表自适应宽度
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: '就诊统计' // 标题
        }
    }
})

const getCurrentWeekDates=()=> {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const lastDayOfWeek = new Date(currentDate.setDate(firstDayOfWeek.getDate() + 6));

    const datesOfWeek = [];
    const date = new Date(firstDayOfWeek);

    while (date <= lastDayOfWeek) {
        datesOfWeek.push(new Date(date)); // 克隆当前日期
        date.setDate(date.getDate() + 1); // 日期加1
    }
    const dayList = []
    datesOfWeek.forEach(date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        date.setDate(date.getDate() + 1);
        const formattedDate = `${year}-${month}-${day}`;
        dayList.push(formattedDate)
    })
    currentDateList.value = dayList
}
onBeforeMount(() => {
    getCurrentWeekDates()  
})

</script>

<style lang="less" scoped>
.container {
    margin-top: 20px;

    .container-top {


        .card-left {
            display: flex;
            height: 100px;
            align-items: center;
        }

        .card-left-footer {
            height: 30px;
        }

        .card-right {
            display: flex;
            height: 166.8px;
        }
    }

    .container-bottom {
        margin-top: 20px;
        .container-bottom-card{
            width: 100%;
            .chartLine {
                width: 100%;
                height: 300px;
            }
        }
    }
}
</style>
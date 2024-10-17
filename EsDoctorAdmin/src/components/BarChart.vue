<template>
    <div >
        <Line :data="chartData" :options="chartOptions" style="width: 100%;height: 100%;"/>
    </div>
</template>

<script setup>
import { Bar,Line } from 'vue-chartjs'
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Chart as ChartJS, Title, Tooltip, Legend,BarElement, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { reactive, ref } from 'vue';

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(Title, Tooltip, Legend, LineElement,BarElement, PointElement, CategoryScale, LinearScale)


const props = defineProps({
    chartData: {
        type: Object,
    },
    chartOptions:{
        type:Object,
    }
})
// const chartData = reactive({
//             labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//             datasets: [
//                 {
//                     label: 'Sales',
//                     backgroundColor: '#42A5F5',
//                     data: [40, 60, 80, 70, 100, 120]
//                 }
//             ]
//         })
const {chartData,chartOptions}= props
console.log(chartData)
// const chartOptions = reactive({
//     responsive: false,
//     plugins: {
//         legend: {
//             position: 'top'
//         },
//         title: {
//             display: true,
//             text: 'Monthly Sales Data'
//         }
//     }
// })

</script>
<style lang="less" scoped>

</style>
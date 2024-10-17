<template>
    <div class="panel-header">
        <div class="panel-header-title">
            <div class="title">{{ props.title }}</div>
            <div class="title-text"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'

const props = defineProps({
    title: String,
    titleText: String
})

</script>

<style lang="less" scoped>
    .panel-header{
    padding: 15px;
    // height: 60px;
    background-color: #e8edf0;
    border-color: #e8edf0;
    // opacity:0.5;
    .panel-header-title{
        
        font-size: 14px;
        .title{
                font-weight: bold;
                font-style: normal;
            }
        .title-text{
            margin-top: 5px;
        }
        }
    }
</style>
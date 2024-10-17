<template>
    <el-dialog v-model="dialogTableVisible" 
    :title="'编辑'" 
    width="450"
    @close="close()"
    >
        <el-form
            ref="promiseFormRef"
            :model="promiseForm"
            :rules="promiseFormRules"
            
        >
            <el-form-item prop="name" label="用户名">
                <el-input v-model="promiseForm.name" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item prop="phone" label="手机号">
                <el-input v-model="promiseForm.name" placeholder="请输入手机号"/>
            </el-form-item>
            <el-form-item>
                <div style="width: 100%;">
                    <p>权限选择:</p>
                    <div class="cascader">
                        <el-cascader  
                        v-model="cascader" 
                        :options="options" 
                        :props="cascaderProps" 
                        collapse-tags
                        collapse-tags-tooltip
                        clearable 
                        tag-type="primary" 
                        placeholder="请选择权限"/>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="submit(promiseFormRef)">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref,reactive,watch } from 'vue'
const props = defineProps({
    dialogTableVisible:{
      type:  Boolean,
      default: false
    },
    id:{
      type:  Number,
      default: 0
    }
})
// 弹窗
const dialogTableVisible = ref(false)
// 表单
const promiseForm = reactive({
    name: '',
    phone:''
})
const promiseFormRef = ref()

// 表单规则
const promiseFormRules = reactive({
        name:[{required: true, message: '请输入用户名', trigger: 'blur' }],
        phone:[{required: true, message: '请输入手机号', trigger: 'blur' }]
})

watch(() => props.dialogTableVisible, (newVal) => {
    dialogTableVisible.value = props.dialogTableVisible
    
})

// 权限选择
//权限默认选择
const cascader=ref([''])
const cascaderProps=reactive({
    multiple: true
})
const options = [
    {
        value:'0',
        label:'控制台'
    },
      {
        value: '1',
        label: '权限管理',
        children: [
          {
            value: '1-1',
            label: '账号管理'
          },
          {
            value: '1-2',
            label: '菜单管理'
         },
        ]
      },
      {
        value:'2',
        label:'医疗管理',
        children:[
        {
            value: '2-1',
            label: '医生人员管理'
          },
          {
            value: '2-2',
            label: '订单管理'
         },
        ]
      }
]
const emit = defineEmits(['handleClose'])
const close = () => {
    cascader.value=[]
    //点击关闭之后重置表单
    promiseFormRef.value.resetFields()
    emit('handleClose')
}
const submit = (promiseFormRef)=>{
    if(!promiseFormRef) return
    promiseFormRef.validate((valid)=>{
        if(valid){
            // 提交
            console.log(promiseForm.value,cascader.value)
            promiseFormRef.value.resetFields()
            cascader.value=[]
            emit('handleClose')
        }else{
            return false
        }
    })
}
</script>
    
<style scoped>

.cascader{
    /* width: 100%; */
    display: flex;
    /* margin:0 auto; */
    justify-content: center;
}
</style>
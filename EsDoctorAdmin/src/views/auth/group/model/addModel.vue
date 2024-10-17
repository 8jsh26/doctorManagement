<template>
    <el-dialog v-model="dialogTableVisible" 
    :title="props.mdl?'编辑':'添加'" 
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
            <el-form-item prop="cascader">
                <div style="width: 100%;">
                    <p>权限选择:</p>
                    <div class="cascader">
                        <el-cascader  
                        v-model="promiseForm.cascader" 
                        :options="options" 
                        :props="cascaderProps" 
                        collapse-tags
                        collapse-tags-tooltip
                        clearable 
                        check-strictly
                        tag-type="primary" 
                        placeholder="请选择权限"
                        />
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
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
    mdl: {
       type: Boolean,
       default: false
    }
})
// 弹窗
const dialogTableVisible = ref(false)
// 表单
const promiseForm = reactive({
    name: '',
    cascader:[['1','1-1']]
})
const promiseFormRef = ref(null)

// 表单规则
const promiseFormRules = reactive({
        name:[{required: true, message: '请输入用户名', trigger: 'blur' }]
})

watch(() => props.dialogTableVisible, (newVal) => {
    dialogTableVisible.value = props.dialogTableVisible
    
})

// 权限选择
// 选中的默认权限
// const cascader=ref(['1-1'])
//
// const cascaderChange=(val)=>{
//     if(!val) return
//     const findOption = (val, options)=>{
//         for (const option of options) {
//             if(val == option.value){
//                 return option.label
//             }
//             if(option.children){
//               const label = findOption(val, option.children)
//               if(label){
//                 return label
//               }
//             }
//         }
//     }

//     const cascaderList = []
//     for(const item of val){
//         let label = ''
//         for(const value of item){
//             if(!label){
//                 label =label+findOption(value, options)
//             }
//             else{
//                  label =label+ '/'+findOption(value, options)
//             }
//         }
//         cascaderList.push(label)
//     }
//     return cascaderList
// }


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
    // cascader.value=[]
    //点击关闭之后重置表单
    promiseFormRef.value.resetFields()
    emit('handleClose')
}
const submit = ()=>{
    if(!promiseFormRef) return
    promiseFormRef.value.validate((valid)=>{
        if(valid){
            // 提交
            console.log(promiseForm.cascader)
            // console.log(promiseForm.cascader=cascaderChange(promiseForm.cascader))
            promiseFormRef.value.resetFields()
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
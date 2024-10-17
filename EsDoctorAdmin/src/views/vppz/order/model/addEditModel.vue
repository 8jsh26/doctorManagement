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
            label-width="90px"
            label-position="left"
        >
            <el-form-item prop="name" label="用户名">
                <el-input v-model="promiseForm.name" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item prop="avater" label="头像">
                <!-- :show-file-list="false"关闭上传预览
                     :auto-upload="false"关闭自动请求+
                -->
                <el-upload 
                    v-model:file-list="fileList" 
                    list-type="picture"
                    :on-remove="handleRemove"
                    :on-change="handlechange"
                    :auto-upload="false"
                    :show-file-list="false"
                >
                <template  #trigger>
                    <el-button v-if="!promiseForm.avater" type="primary">点击上传</el-button>
                    <el-image v-else
                        :src="promiseForm.avater"
                        style="width: 50px;height:50px"
                    />
                </template>
                </el-upload>
            </el-form-item>
            <el-form-item prop="sex" label="性别">
                <el-select v-model="promiseForm.sex" placeholder="请选择">
                    <el-option label="男" value="1" />
                    <el-option label="女" value="0" />
                </el-select>
            </el-form-item>
            <el-form-item prop="department" label="科室" >
                <el-select v-model="promiseForm.department" placeholder="请选择">
                    <el-option label="全部" value="全部" />
                    <el-option label="全部" value="全部" />
                    <el-option label="全部" value="全部" />
                </el-select>
            </el-form-item>
            <el-form-item prop="phone" label="手机号">
                <el-input v-model="promiseForm.phone" placeholder="请输入手机号"/>
            </el-form-item>
            <el-form-item prop="state" label="当前状态">
                <el-select v-model="promiseForm.state" placeholder="请选择">
                    <el-option label="休息" value="0" />
                    <el-option label="就诊中" value="1" />
                    <el-option label="在线" value="2" />
                </el-select>
            </el-form-item>
            <el-form-item prop="daterange" label="就诊日期">
                    <el-date-picker
                        ref="datePickerRef"
                        v-model="promiseForm.daterange"
                        type="daterange"
                        format="YYYY-MM-DD"
                        date-format="YYYY/MM/DD"
                        :disabled="promiseForm.state=='0'"
                        @change="pickerChange"
                    />
            </el-form-item>
            <el-form-item prop="dateTime" label="就诊时间">
                <el-cascader :disabled="!(!(promiseForm.state=='0')&& promiseForm.daterange)" 
                v-model="promiseForm.dateTime" :options="dataArray" 
                :props = "{ multiple: true }"
                 />
            </el-form-item>
            <el-form-item prop="createTime" label="创建日期">
                <el-date-picker
                    v-model="promiseForm.createTime"
                    type="datetime"
                    placeholder="请选择创建时间"
                    :disabled="true"
                    format="YYYY-MM-DD HH:mm:ss"
                />
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
    mdl: {
       type: Boolean,
       default: false
    },
    id:{
        type: Number,
        default:undefined
    }
})

const datePickerRef = ref(null);
// 方法：打开日期选择器
// const openDatePicker = () => {
//   datePickerRef.value.handleOpen(); // 手动触发日期选择器
// };
let dataArray = ref([])

// 监听日期选择
const pickerChange=(val)=>{
    let startDate = new Date(val[0])
    const endDate = new Date(val[1])
    const array = []
    while(startDate <= endDate){
       const dataTime= getTime(startDate).split(' ')[0]
        array.push({
            value: dataTime,
            label: dataTime,
            children:[
                {
                    value: '上午',
                    label: '上午',
                },
                {
                    value: '下午',
                    label:  '下午',
                }
            ]
        })
        startDate.setDate(startDate.getDate()+1)
    }
    dataArray.value = array
    console.log(dataArray);
    // promiseForm.day=getTime(val[0]).split(' ')[0]+' ~ '+getTime(val[1]).split(' ')[0]
}

// 就诊时间数据转换
const dateTimeConvert = (val)=>{
    if(!val) return
    const findOption = (val, options)=>{
        for (const option of options) {
            if(val == option.value){
                return option.label
            }
            if(option.children){
              const label = findOption(val, option.children)
              if(label){
                return label
              }
            }
        }
    }

    const cascaderList = []
    for(const item of val){
        let label = ''
        for(const value of item){
            if(!label){
                label =label+findOption(value, options)
            }
            else{
                 label =label+ '/'+findOption(value, options)
            }
        }
        cascaderList.push(label)
    }
    return cascaderList
}
// 获取表单数据
const getPromiseForm=(id)=>{
    // 后端请求当前id的数据
}


// 获取当前时间
const getTime=(date)=>{
        const dateTime=new Date(date)
        const year = dateTime.getFullYear()
        const month = String(dateTime.getMonth()+1).padStart(2, '0')
        const day =String(dateTime.getDate()).padStart(2, '0')
        const hours = String(dateTime.getHours()).padStart(2, '0')
        const minutes = String(dateTime.getMinutes()).padStart(2, '0')
        const seconds = String(dateTime.getSeconds()).padStart(2, '0')
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 弹窗判断
const dialogTableVisible = ref(false)
// 表单
const promiseForm = reactive({
    name: '',
    avater:'',
    createTime:'',
    department:'',
    sex:'',
    phone:'',
    state:'0',
    dateTime:'',
    daterange:'',
})
const promiseFormRef = ref() 

// 表单规则
const validateUsername=(rule,value,callback)=>
{
    const phoneReg = /^1(3[0-9]|4[0-35-9]|6[2567]|7[0-8]|5[0-9]|8[0-9]|9[0-35-9])\d{8}$/
    if(!value){       
        return callback(new Error('请输入手机号'))
    }else if(!phoneReg.test(value)){
        return callback(new Error('手机号格式出现错误,请输入正确的手机格式'))
    }else{
        callback()
    }
}
const promiseFormRules = reactive({
        name:[{required: true, message: '请输入用户名', trigger: 'blur' }],
        sex:[{required:true,message:'请输入性别',trigger: 'blur' }],
        phone:[{required: true,validator:validateUsername,trigger: 'blur' }],
        state:[{required:true,message:'请输入当前状态',trigger: 'blur' }],
})

// 监听父组件传值
watch(() => props.dialogTableVisible, (newVal) => {
    dialogTableVisible.value = props.dialogTableVisible
    if(newVal)
    {
        if(props.mdl){
            getPromiseForm(props.id)
        } else{
            // 添加默认时间
            const dateTime =Date.now()
            promiseForm.createTime=getTime(dateTime)
        }
    }
    
})

//图片上传
const  fileList=ref([])
const handlechange=(file)=>{
    // console.log(file)
    if (file ){
        promiseForm.avater = file.url || URL.createObjectURL(file.raw);
        console.log(promiseForm.avater)
    }
}
const handleRemove=(file)=>{
    fileList.value = []
}



const emit = defineEmits(['handleClose'])
const close = () => {
    //点击关闭之后重置表单
    promiseFormRef.value.resetFields()
    emit('handleClose')
}

// 提交表单
const submit = (promiseFormRef)=>{
    if(!promiseFormRef) return
    promiseFormRef.value.validate((valid)=>{
        if(valid){
            // 提交,向后端发送请求保存
            console.log(promiseForm.dateTime = dateTimeConvert(promiseForm.dateTime))
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
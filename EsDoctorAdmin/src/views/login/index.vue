<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card  >
            <template #header>
                <div class="card-header">
                    <img :src="login_header" alt="">
                </div>
                <div class="card-link">
                    <el-link @click="login =!login" type="primary">
                        {{ login?'登录' : '注册账号' }}
                    </el-link>
                </div>
            </template>
            <el-form style="max-width: 320px;"
             class="login-form"
             :rules="rules"
             :model="loginForm"
             ref="loginFormRef"
             >
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入手机号" prefix-icon="User"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item v-if="login" prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" prefix-icon="Lock">
                        <template #append>
                            <el-button  type="primary" 
                            :class="{code: isCode}"
                            style="width:120px"
                            @click="gitCode()"
                            v-model="codeTime"
                            :disabled="!loginForm.username||!loginForm.password"
                            >
                                {{codeTime}}
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" @click="submitForm(loginFormRef)" class="login-button">{{login?'注册':'登入'}}</el-button>
                </el-form-item>
            </el-form>
            <!-- <template #footer>
                <div class="card-footer">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(loginFormRef)" class="login-button">{{login?'注册':'登入'}}</el-button>
                    </el-form-item>
                </div>
            </template> -->
        </el-card>
    </el-row>
</template>

<script setup>
import { ref , reactive,computed,toRaw} from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
const login=ref(false)
const loginForm=reactive({
    username:'',
    password:'',
    code:'',
})

//动态路由获取
const router = useRouter
const routerList=computed(()=>useStore.state.menu.routerList)

// 验证码
const isCode=ref(true)
const codeTime=ref("发送验证码")

// 表单提交
const loginFormRef=ref()
//自定义表单校验rules
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
const validatePassword=(rule,value,callback)=>
{
    const passReg = /^[a-zA-Z0-9_-]{4,16}$/
    if(!value){       
        return callback(new Error('请输入密码'))
    }else if(!passReg.test(value)){
        return callback(new Error('密码格式出现错误，需要4到16位字符，请输入正确密码'))
    }else{
        callback()
    }
}
// 表单校验
// const rules= reactive({
//    username:[{required: true, message: '请输入用户名', trigger: 'blur' }],
//    password:[{required: true, message:'请输入密码', trigger: 'blur'}]
// })
const rules=reactive({
    username:[
        {validator:validateUsername,trigger:'blur'}
    ],
    password:[
        {validator:validatePassword,trigger:'blur'}
    ]
})
// 发送验证码
const gitCode=()=>{
    if(!isCode.value)return
    const phoneReg = /^1(3[0-9]|4[0-35-9]|6[2567]|7[0-8])\d{8}$/
    if(!loginForm.username||!phoneReg.test(loginForm.username))
    {
            return  ElMessage({
            message: '手机号格式出现错误',
            type: 'warning',
            plain: true,
        })
    }
    codeTime.value=60 
    isCode.value=false
    const intervalId = setInterval(() => { 
        codeTime.value--;  
        if (codeTime.value <= 0) {  
            // 当倒计时结束时，停止 interval 并更新 UI  
            clearInterval(intervalId);  
            codeTime.value = "重新发送验证码";  
            isCode.value = true; 
        } 
    }, 1000);
}

// 提交表单
const submitForm=(loginFormRef)=>{
    console.log(!loginFormRef)
    if(!loginFormRef) return
    loginFormRef.validate(
        (valid)=>{
        if(valid){
            console.log('提交表单localStorage:',localStorage)
            localStorage.setItem('pz_token','请求给的数据')
            localStorage.setItem('pz_userInfo','请求给的用户信息')
            // 英文routerList是响应是数据，使用vue将routerList数据变为普通数据，在用router.addRoute动态添加路由
            toRaw(routerList.value).forEach(url => {
                router.addRoute('main',url)
            });
            router.push('/')
        }else{
            console.log('表单提交失败')
            
        }
    })
}


//图片加载
   const login_header= new URL('../../../public/images/login.jpg',import.meta.url).href
</script>

<style lang="less" scoped>
:deep(.el-card__header)
{
    padding: 0;
}
.login-container
{
    height: 100%;
    .card-header
    {
       height: 320px;
       width: 680px;
       background-color: #899fe1;
       img{
        height: 100%;
        width: 100%;
       }
    }
    .card-link
    {
        float: right;
        margin-right: 20px;
    }
    .login-form
    {
        margin: 0 auto;
        margin-top: 30px;
    }
    .code{
        background-color:  #409eff; 
        color:#fff
    }
    .login-button{
        margin: 0 auto;
        width: 320px;
    }
}
</style>
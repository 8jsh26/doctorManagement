import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'

//刷新之后动态路由添加(有登入的时候添加)
// const routerAdd=localStorage.getItem('pz_router')
// if(routerAdd)
// {
//   store.commit('dynamicRouting',JSON.parse(routerAdd).routerList.menu)
//   store.state.menu.routerList.forEach(element => {
//     router.addRoute(element)
//   });
// }


//路由的前置守卫，没有token不能访问除登入页面的其他页面
// router.beforeEach((to,from)=>{
//     const token = localStorage.getItem('pz_token')
//     if(!token && to.path !== '/login'){
//         return '/login'
//     }else if(token && to.path === '/login'){
//       return '/'
//     }else{
//       return true
//     }
// })

const app = createApp(App)


// 路由挂载
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(store)
app.mount('#app')

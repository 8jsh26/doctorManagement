import {createRouter , createWebHashHistory } from 'vue-router'

// import Layout from '../views/Main.vue'

const routes = [
    {
        path: '/',
        component:()=>import('../views/Main.vue'),
        redirect: ()=>{
            const token = localStorage.getItem('pz_token')
            if(token)
            {
                return  '/dashboard'
            }
            return '/login'
        },
        name: 'Main',
        children:[
            {
                path:'dashboard',
                meta:{ id: '1-1', name:'控制台' ,icon:'Platform',path:'/dashboard',describe:'用于展示当前系统的统计数据、统计报表及重要数据' },
                component:()=>import('../views/dashboard/index.vue'),               
            },
            {
                path:'auth',
                meta: { id:'1-2',name:'权限管理',icon:'Grid' },
                children:[
                    {
                        path:'admin',
                        alias:['admin'],
                        meta:{ id:'1-2-1',name:'账号管理',icon:'Avatar',path:'/auth/admin',describe:'管理员可以进行编辑，权限修改后需'},
                        component: ()=>import('../views/auth/admin/index.vue')
                    },
                    {
                        path: 'group',
                        meta:{ id: '1-2-2',name:'菜单管理',icon:'Menu',path:'/auth/group',describe:'菜单规则通常对应一个控制器的方法'},
                        component: ()=>import('../views/auth/group/index.vue')
                    }
                ]
            },
            {
                path:'vppz',
                meta:{id: '1-3',name:'医疗管理',icon:'BellFilled',path:'/vppz',describe:'' },
                children:[
                    {
                        path:'order',
                        meta:{ id:'1-3-1',name:'医生就诊状态',icon:'Checked',path:'/vppz/order',describe:'' },
                        component: ()=>import('../views/vppz/order/index.vue')
                    },
                    {
                        path: 'patient',
                        meta:{ id:'1-3-2',name:'患者管理',icon:'FirstAidKit',path:'/vppz/patient',describe:'' },
                        component: ()=>import('../views/vppz/patient/index.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        component:()=>import('../views/login/index.vue')
    }
]


const router=createRouter(
    {
        //路由数据
        routes,
        //路由模式
        history:createWebHashHistory()
    }
)

export default router

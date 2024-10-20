#### 环境配置
node.js版本 v20.16.0
https://nodejs.org/zh-cn/download/package-manager
推荐使用nvm https://nvm.uihtm.com
编辑器 vsCode https://code.visualstudio.com
vite https://cn.vitejs.dev/
路由配置:vue-router https://router.vuejs.org/zh
vuex https://vuex.vuejs.org/zh/
axios https://www.axios-http.cn/docs/intro(异步请求库)


### 路由创建
npm create vue-router@4
引入router 挂载到 vue 实例中
对页面使用<RouterView /> 路由显示

### ui框架：element-plus
网页：https://element-plus.org/zh-CN/guide/quickstart.html
npm install element-plus
全部导入：
import ElementPlus from 'element-plus'
app.use(ElementPlus)
按需导入：
需要下载插件：
npm install -D unplugin-vue-components unplugin-auto-import
进入vite.config.js去配置 见网页配置（修改配置，一定要重启服务器）

### 动态路由
持久化(需要浏览器缓存)
这里用插件模式存到浏览器

插件下载：npm install vuex-persistedstate
### 折线图
需要下载npm install chart vue-chartjs
封装到components下BarChart.vue

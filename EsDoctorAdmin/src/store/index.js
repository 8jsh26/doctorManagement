import { createStore } from 'vuex'
import menu from './menu'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    // 持久化createPersistedState会将vuex中的state属性的数据保存到浏览器中
    plugins:[createPersistedState(
        { key:'pz_router' }
    )],
    modules: {
        menu
    }
})
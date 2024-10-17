const actions=localStorage.getItem('pz_router')
const state=actions?JSON.parse(actions):{
    isCollaps:false,
    selectMenu:[],
    routerList:[],
    menuActive:'1-1'
}
const getters={
    getMenu:state=>state.selectMenu.length
}
const mutations={
    collapsMenu(state){
      state.isCollaps = !state.isCollaps
    },
    addMenu(state,menu){
        if(state.selectMenu.findIndex(item=>item.path===menu.path) === -1)
        {
            state.selectMenu.push(menu)
        }
    },
    removeMenu(state,menu)
    {
      state.selectMenu.forEach((item,index)=>{
          if(item.path === menu.path)
          {
              state.selectMenu.splice(index,1)
          }
      })
    },
    dynamicRouting(state,payload){
        //导入glob文件
        const directory= import.meta.glob('../views/**/**/*.vue')
        function getComponent(router) {
            router.forEach(path=>{
                if(!path.children){
                    const url = `../views/${path.meta.path}.vue`
                    path.component=directory[url]
                }else{
                    getComponent(path.children)
                }
            })
        }
        getComponent(payload)
        state.routerList=payload
    },
    updataMenuActive(state,payload)
    {
        state.menuActive=payload
    }
}

export default {
  state,
  mutations,
  getters
}
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SelectGame from '@/components/SelectGame'
import More from '@/components/game/more/Manage'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/select-game',
            name: 'SelectGame',
            component: SelectGame,
            meta:{
                auth:true//添加字段判断该页面是否需要登录
            }
        },
        {
            path: '/game/more',
            name: 'More',
            component: More,
            meta:{
                auth:true//添加字段判断该页面是否需要登录
            }

        },
    ]
});

router.beforeEach((to,from,next)=>{

    let uid=localStorage.getItem('uid');
    console.log(uid);
    // if (to.meta.auth && uid) {
    //     return next();
    // }
    //
    // if (uid && to.fullPath==='/') {
    //     return next({path:'/select-game'})
    // }
    //
    // if(to.meta.auth && !uid){
    //     return next({path:'/'})
    // }

    return next();

});

router.afterEach((to, from) => { // 举例: 通过跳转后改变document.title
    this.a.app.$dlg.closeAll();
});

export default router


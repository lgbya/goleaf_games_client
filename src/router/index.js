import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
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
            path: '/register',
            name: 'Register',
            component: Register
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

    //判断是否在游戏中
    var gameId = this.a.app.$root.gameId;
    if(gameId){
        //获取游戏的路由
        var routerName = this.a.app.$gameCfg[gameId].routerName;
        if (routerName == to.name){
            return next();
        }
        return;
    }

    var uid = this.a.app.$root.uid;
    //需要验证判断登录 如果没登录跳转登录页面
    if (to.meta.auth && !uid) {
        return next({name:'Login'})
    }

    //已经登录不允许跳到登录或注册页面
    if (uid && (to.name==='Login' || to.name==='Register' )) {
        return next({name:'SelectGame'})
    }

    return next();

});

router.afterEach((to, from) => { // 举例: 通过跳转后改变document.title
    this.a.app.$dlg.closeAll();
});

export default router


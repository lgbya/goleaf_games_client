const cfg = {
    1001 : {
        zhCnName:"猜拳",
        routerName:"More",
    },
    1002 : {
        zhCnName:"井字棋",
        routerName:"Tictactoe",
    },
};

export default {
    install(Vue) {
        Vue.prototype.$gameCfg = cfg;
    }
}

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Notify from './api/notify'
import WebSocket from './api/websocket'
import GameCfg from './api/game_cfg'
import ErrorCode from './api/error_code'

import vDialogs from 'v-dialogs'
Vue.use(vDialogs);
Vue.use(GameCfg);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(Notify);
Vue.use(WebSocket);
Vue.use(ErrorCode);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    data(){
        return {
            uid : 0,
            token:"",
            gameId:0,
        }
    },

    created(){
        this.$initWebSocket()
    },
    methods:{
        setLoginInfo : function(data){
            this.$root.uid = data.uid;
            this.$root.token = data.token;
        },

        resetLoginInfo:function () {
            this.$root.uid = 0;
            this.$root.token = "";
            this.$root.gameId = 0;
        }
    }

});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Notify from './api/notify'
import WebSocket from './api/websocket'
import vDialogs from 'v-dialogs'
Vue.use(vDialogs);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(Notify);
Vue.use(WebSocket);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data(){
    return {
    }
  },

  created(){
    this.$initWebSocket()
  }

});

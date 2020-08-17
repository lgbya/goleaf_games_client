import Game from './game.js'
import Websocket from './websocket.js'
const cfg = {
    websocket:Websocket,
    game : Game,
};

export default {
    install(Vue) {
        Vue.prototype.$cfg = cfg;
    }
}


export default {
    install(Vue)  {
        Vue.prototype.$currComponent = null;
        Vue.prototype.$init = function(){
            var msgList = this.notifyRegister();
            Vue.prototype.$currComponent = this;
            for(var msg in msgList){
                this.$component["$s2c" + msg.substring(4)] = msgList[msg]
            }
        };

        Vue.prototype.$s2cError =  function (data) {
            this.$errorCode[data.code].fun(data,this);
        };

        Vue.prototype.$s2cResetLogin =  function (data) {
            this.$root.gameId = 0;
            this.$root.setLoginInfo(data);
        };

        Vue.prototype.$s2cStartGame =  function (data) {
            var self = this;
            var gameCfg = self.$gameCfg[data.gameId];
            self.$root.gameId = data.gameId;
            self.$dlg.closeAll();
            self.$dlg.mask('匹配成功, 创建游戏中。。。', function(){
                self.$router.push({name:gameCfg.routerName, params:{'roomInfo':data}})
            },{
                closeTime:2,
            });
        };

        Vue.prototype.$s2cContinueGame =  function (data) {
            var gameCfg = this.$gameCfg[data.gameId];
            this.$root.gameId = data.gameId;
            this.$router.push({name:gameCfg.routerName, params:{'roomInfo':data}})
        };

        Vue.prototype.$s2cEndGame =  function (data) {
            this.$root.gameId = 0;
            Vue.prototype.$currComponent.end(data)
        };



    }
}

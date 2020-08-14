
export default {
    install(Vue)  {
        Vue.prototype.$init = function(){
            this.$component = this;

            var msgList = this.$component.notifyRegister();
            for(var msg in msgList){
                this.$component["$s2c" + msg.substring(4)] = msgList[msg]
            }
        };

        Vue.prototype.$s2cError =  function (data) {
            this.$dlg.closeAll();

            this.$dlg.toast(data.message, {
                messageType: 'error',
                closeTime: 2,
                position:'topCenter',
            });

            this.msg = data.message
        };

        Vue.prototype.$s2cStartGame =  function (data) {
            var gameCfg = this.$gameCfg[data.gameId];
            this.$root.gameId = data.gameId;
            this.$router.push({name:gameCfg.routerName, params:{'roomInfo':data}})
        };

        Vue.prototype.$s2cContinueGame =  function (data) {
            var gameCfg = this.$gameCfg[data.gameId];
            this.$root.gameId = data.gameId;
            this.$router.push({name:gameCfg.routerName, params:{'roomInfo':data}})
        };

        Vue.prototype.$s2cEndGame =  function (data) {
            this.$root.gameId = 0;
            this.end(data)
        };
    }
}

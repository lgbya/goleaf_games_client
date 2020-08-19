
export default {
    install(Vue)  {
        const self = Vue.prototype;
        self.$currComponent = null;
        self.$init = function(){
            var msgList = this.notifyRegister();
            self.$currComponent = this;
            for(var msg in msgList){
                this.$component["$s2c" + msg.substring(4)] = msgList[msg]
            }
        };

        self.$s2cError =  function (data) {
            this.$errorCode[data.code].fun(data,this);
        };

        self.$s2cResetLogin =  function (data) {
            this.$root.gameId = 0;
            this.$root.setLoginInfo(data);
        };

        self.$s2cStartGame =  function (data) {
            var self = this;
            var gameCfg = self.$cfg.game[data.gameId];
            self.$root.gameId = data.gameId;
            self.$dlg.closeAll();
            self.$dlg.mask('匹配成功, 创建游戏中。。。', function(){
                self.$router.push({name:gameCfg.routerName, params:{'roomInfo':data}})
            },{
                closeTime:2,
            });
        };

        self.$s2cContinueGame =  function (data) {
            var gameCfg = this.$cfg.game[data.gameId];
            this.$root.gameId = data.gameId;
            this.$router.push({name:gameCfg.routerName, params:{'roomInfo':data}})
        };

        self.$s2cEndGame =  function (data) {
            this.$root.gameId = 0;
            self.$currComponent.end(data)
        };



    }
}


export default {
    install(Vue)  {
        Vue.prototype.$init = function(){
            this.$component = this;

            var msgList = this.$component.notifyRegister();
            for(var msg in msgList){
                this.$component["$" + msg.substring(4)] = msgList[msg]
            }
        };

        Vue.prototype.$Error =  function (data) {
            this.$dlg.closeAll();

            this.$dlg.toast(data.message, {
                messageType: 'error',
                closeTime: 2,
                position:'topCenter',
            });

            this.msg = data.message
        };

        Vue.prototype.$StartGame =  function (data) {
            this.$router.push({name:"More",params:{'roomInfo':data}})
        };

        Vue.prototype.$ContinueGame =  function (data) {
            this.$router.push({name:"More",params:{'roomInfo':data}})
        };



    }
}

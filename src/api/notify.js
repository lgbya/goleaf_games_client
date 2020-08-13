import TimeMask from '../components/dlg/Time.vue'

export default {
    install(Vue)  {
        Vue.prototype.$uid = 0;
        Vue.prototype.S2C_Error =  function (data) {
            this.$dlg.closeAll();

            this.$dlg.toast(data.message, {
                messageType: 'error',
                closeTime: 2,
                position:'topCenter',
            });

            this.msg = data.message
        };

        Vue.prototype.S2C_Login = function (data) {
            var router = this.$router;
            this.$dlg.closeAll();
            this.$dlg.mask('登录成功！跳转游戏界面', function(){
                Vue.prototype.$uid = data.uid;
                localStorage.setItem("uid", data.uid);
                localStorage.setItem("userInfo", data);
                router.push("/select-game")
            },{
                closeTime: 1.5,
            })
        };

        Vue.prototype.S2C_Register = function (data) {
            Vue.prototype.uid = data.uid;
            console.log("注册并登录成功！uid"+data.uid)
        };

        Vue.prototype.S2C_MatchPlayer = function (data) {
            var vue = this;
            var match = function () {
                vue.$dlg.modal(TimeMask, {
                    title:"匹配游戏",
                    width: 320,
                    height: 160,
                    maxButton:false,
                    cancelCallback:function () {
                        vue.$dlg.alert('是否取消匹配玩家?',  function(){
                            vue.$websocketSend({C2S_CancelMatch:{}})
                        },{
                            messageType: 'confirm',
                            cancelCallback:match
                        })
                    }
                })
            };
            match()
        };

        Vue.prototype.S2C_CancelMatch = function (data) {
            this.$dlg.toast("已经取消匹配", {
                messageType: 'info',
                closeTime: 2,
                position:'topCenter',
            });
        };

        Vue.prototype.S2C_StartGame =  function (data) {
            this.$router.push({name:"More",params:{'roomInfo':data}})
        };
        
        Vue.prototype.S2C_MoraPlaying = function (data) {
            this.own.ply = data.ply;
            this.own = Object.assign({}, this.own);
        };

        Vue.prototype.S2C_MoraPlaying = function (data) {
            this.own.ply = data.ply;
            this.own = Object.assign({}, this.own);
        };

        Vue.prototype.S2C_MoreReslut = function (data) {

            for(var uid in data.game_info){
                if (uid != this.$uid){
                    this.rival.ply = data.game_info[uid];
                    this.rival = Object.assign({}, this.rival);
                }
            }

            var router = this.$router;
            if (data.win_uid == this.$uid){
                var info = "You Win!!!";
                var type = "success";
            }else if(data.win_uid == 0){
                var info = "No Win!!!";
                var type = "info";
            } else{
                var info = "You Loser!!!";
                var type = "error";
            }

            this.$dlg.alert(info,  function(){
                // router.push("/select-game")
            },{
                messageType: type,
            })
        };
    }
}

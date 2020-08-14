<template>
    <div class="row justify-content-center" style="padding-top: 10%">
        <div class="col-md-8">
            <button v-on:click="c2sMatchGame(1001)" type="button" class="btn btn-info btn-lg btn-block" >
                猜拳游戏
            </button>
            <br/>
            <button v-on:click="c2sMatchGame(1002)" type="button" class="btn btn-info btn-lg btn-block" >
                井字棋
            </button>
            <br/>
        </div>
    </div>
</template>

<script>
    import TimeMask from '../components/dlg/Time.vue'
    export default {
        name: "SelectGame",
        data(){
            return{
                msg:"",
            }
        },

        created(){
            this.$init();
            console.log(this.$root.uid)
        },

        methods:{
            notifyRegister:function(){
                return{
                    "S2C_MatchPlayer":this.s2cMatchPlayer,
                    "S2C_CancelMatch":this.s2cCancelMatch,
                }
            },

            c2sMatchGame:function (gameId) {
                this.$websocketSend({
                    C2S_MatchPlayer:{gameId:gameId}
                })
            },

            s2cMatchPlayer:function (data) {
                var self = this;
                var match = function () {
                    self.$dlg.modal(TimeMask, {
                        title:"匹配游戏",
                        width: 320,
                        height: 160,
                        maxButton:false,
                        cancelCallback:function () {
                            self.$dlg.alert('是否取消匹配玩家?',  function(){
                                self.$websocketSend({C2S_CancelMatch:{}})
                            },{
                                messageType: 'confirm',
                                cancelCallback:match
                            })
                        }
                    })
                };
                match()
            },

            s2cCancelMatch:function (data) {
                this.$dlg.toast("已经取消匹配", {
                    messageType: 'info',
                    closeTime: 2,
                    position:'topCenter',
                });
            }
        }
    }
</script>

<style >
    .v-dialog-dialog{
        max-width: 320px;
    }
</style>

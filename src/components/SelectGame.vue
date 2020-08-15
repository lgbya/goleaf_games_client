<template>
    <div class="row justify-content-center" style="padding-top: 10%">
        <div class="col-md-8">
            <div v-for="(item, index) in $gameCfg">
                <button v-on:click="c2sMatchGame(index)" type="button" class="btn btn-info btn-lg btn-block" >
                    {{item.zhCnName}}
                </button>
                <br/>
            </div>
        </div>
    </div>
</template>
<script>
    import TimeMask from '../components/dlg/Time.vue'
    export default {
        name: "SelectGame",
        data(){
            return{
                gameList:{},
            }
        },

        created(){
            var self = this;
            this.$init();
            self.$websocket.close();


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
                    C2S_MatchPlayer:{gameId:parseInt(gameId)}
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

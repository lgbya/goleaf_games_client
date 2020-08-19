<template>
    <div class="row justify-content-center" style="max-height: 411px;max-width: 544px;margin: 10% auto" >
        <div class="col-md-8">
            <div class="card">
                <div class="name">{{rival.name}}</div>
                <div style="height: 30px;">
                    <div class="select" v-if="currentUid==rival.uid">请选择！</div>
                    <div class="wait" v-else>等待中。。。</div>
                </div>
            </div>
            <br>
            <div class="card diagona" style="height: 260px;background-color: rgba(0, 0, 0, 0.03);">

                <div style="height: 30%;width: 30%;margin: 15% 0% 0% 60%">
                    <img :src="moreImgArr[rival.ply]" style="width: 100%;height: 100%"/>
                </div>
                <div style="height: 30%;width: 30%;margin: 0% 0% 0% 10%;">
                    <img :src="moreImgArr[own.ply]" style="width: 100%;height: 100%"/>
                </div>

            </div>
            <br>
            <div class="card">
                <div class="name">{{own.name}}</div>
                <div class="card-body" style="text-align: center;background: rgba(78, 85, 91, 0.04);">
                    <div >
                        <button v-on:click="c2sPlaying(1)" type="button" class="btn btn-default btn" style="border: 1px solid #9e9e9e9e">
                            <img :src="moreImgArr[1]" style="width: 40px;height: 40px"/>
                        </button>
                        <button v-on:click="c2sPlaying(2)" type="button"  class="btn btn-default btn" style="border: 1px solid #9e9e9e9e" >
                            <img :src="moreImgArr[2]" style="width: 40px;height: 40px"/>
                        </button>
                        <button v-on:click="c2sPlaying(3)" type="button" class="btn btn-default btn" style="border: 1px solid #9e9e9e9e">
                            <img :src="moreImgArr[3]" style="width: 40px;height: 40px"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "More",
        data(){
            return {
                moreImgArr:[
                    require("../../../assets/sikaozhong.jpg"),
                    require("../../../assets/more_1.jpg"),
                    require("../../../assets/more_2.jpg"),
                    require("../../../assets/more_3.jpg"),
                ],
                roomInfo:{},
                own:{},
                rival:{},
            }
        },
        created(){
            this.$init();
            this.roomInfo = this.$route.params.roomInfo;
            this.own = this.roomInfo.userList[this.$root.uid];
            this.own.ply = 0;
            for(var uid in this.roomInfo.userList){
                if (uid != this.$root.uid){
                    this.rival = this.roomInfo.userList[uid];
                    this.rival.ply = 0;
                }
            }

            if (this.roomInfo.start){
                this.start(this.roomInfo.start)
            }

            if (this.roomInfo.continue){
                this.continue(this.roomInfo.continue)
            }

        },
        methods:{
            notifyRegister:function(){
                return {
                    "S2C_MoraPlay":this.s2cPlaying,
                }
            },

            start:function(data){
                return
            },

            continue:function(data){
                this.own.ply = data.ply;
                this.own = Object.assign({}, this.own);
            },

            c2sPlaying:function (ply) {
                if (this.own.ply == 0){
                    this.$websocketSend({
                        C2S_MoraPlay:{ply:ply}
                    });
                }
            },

            s2cPlaying:function (data) {
                this.own.ply = data.ply;
                this.own = Object.assign({}, this.own);
            },

            end:function (data) {
                var gameInfo = data.end.gameInfo
                    for(var uid in gameInfo){
                        if (uid != this.$root.uid){
                            this.rival.ply = gameInfo[uid];
                            this.rival = Object.assign({}, this.rival);
                        }
                    }

                    var router = this.$router;
                    if (data.winUid == this.$root.uid){
                        var info = "You Win!!!";
                        var type = "success";
                    }else if(data.winUid == 0){
                        var info = "No Win!!!";
                        var type = "info";
                    } else{
                        var info = "You Loser!!!";
                        var type = "error";
                    }

                    this.$dlg.alert(info,function(){},{
                        messageType: type,
                    })
            },




        }
    }
</script>

<style scoped>
    .diagona{

        box-sizing:border-box;
        background:linear-gradient(40deg,transparent 50%, #ddd 50%, transparent 50.5%);
    }
    .wait{
        color: var(--light);
        text-align: center;
        line-height: 30px;
        background-color: #6c757d99;
    }
    .name{
        height: 35px;
        text-align: center;
        margin-top: 5px
    }
</style>

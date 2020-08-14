<template>
    <div class="row justify-content-center" style="max-height: 411px;max-width: 544px;margin: 10% auto" >
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{rival.name}}</div>
            </div>
            <br>
            <div class="card diagona" style="height: 300px;background-color: rgba(0, 0, 0, 0.03);">

                <div style="height: 30%;width: 30%;margin: 15% 0% 0% 60%">
                    <img :src="moreImgArr[rival.ply]" style="width: 100%;height: 100%"/>
                </div>
                <div style="height: 30%;width: 30%;margin: 0% 0% 0% 10%;">
                    <img :src="moreImgArr[own.ply]" style="width: 100%;height: 100%"/>
                </div>

            </div>
            <br>
            <div class="card">
                <div class="card-header">{{own.name}}</div>
                <div class="card-body" style="text-align: center">
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
                    "S2C_MoraPlaying":this.s2cPlaying,
                    "S2C_MoreResult":this.s2cResult,
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
                        C2S_MoraPlaying:{ply:ply}
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

                    this.$dlg.alert(info,  function(){
                        // router.push("/select-game")
                    },{
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

</style>

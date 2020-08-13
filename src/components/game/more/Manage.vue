<template>
    <div class="row justify-content-center" style="max-height: 411px;max-width: 544px;margin: 10% auto" >
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{rival.name}}</div>
            </div>
            <br>
            <div class="card diagona" style="height: 300px">

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
                        <button v-on:click="playing(1)" type="button" class="btn btn-default btn" style="border: 1px solid #9e9e9e9e">
                            <img :src="moreImgArr[1]" style="width: 40px;height: 40px"/>
                        </button>
                        <button v-on:click="playing(2)" type="button"  class="btn btn-default btn" style="border: 1px solid #9e9e9e9e" >
                            <img :src="moreImgArr[2]" style="width: 40px;height: 40px"/>
                        </button>
                        <button v-on:click="playing(3)" type="button" class="btn btn-default btn" style="border: 1px solid #9e9e9e9e">
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
                moreImg0:require("../../../assets/sikaozhong.jpg"),
                moreImg1:require("../../../assets/more_1.jpg"),
                moreImg2:require("../../../assets/more_2.jpg"),
                moreImg3:require("../../../assets/more_3.jpg"),
                roomInfo:{},
                own:{},
                rival:{},
            }
        },
        created(){
            //获取传入的参数
            this.roomInfo = this.$route.params.roomInfo;
            this.own = this.roomInfo.user_list[this.$uid];
            this.own.ply = 0;
            for(var uid in this.roomInfo.user_list){
                if (uid != this.$uid){
                    this.rival = this.roomInfo.user_list[uid];
                    this.rival.ply = 0;
                }
            }

        },
        methods:{
            playing:function (ply) {
                if (this.own.ply == 0){
                    this.$websocketSend({
                        C2S_MoraPlaying:{ply:ply}
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .diagona{

        box-sizing:border-box;
        background:linear-gradient(40deg,transparent 50%, #ddd 50%, transparent 50.5%);
    }

</style>

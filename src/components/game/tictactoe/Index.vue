<template>
    <div class="row justify-content-center" style="max-height: 411px;max-width: 544px;margin: 10% auto" >
        <div class="col-md-8">
            <div class="card">
                <div class="name">
                    {{rival.name}}
                    <img :src="rival.icon"  style="width: 10%"/>
                </div>
                <div style="height: 30px;">
                    <div class="select" v-if="currentUid==rival.uid">请选择！</div>
                    <div class="wait" v-else>等待中。。。</div>
                </div>
            </div>
            <br>

            <div class="square">
                <table class="square-inner table">
                    <tbody>

                    <tr >
                        <td ref="box1">
                            <img :src="blank" v-on:click="c2sPlaying(1)" ref="number1" class="numberImg"/>
                        </td>
                        <td ref="box2">
                            <img :src="blank" v-on:click="c2sPlaying(2)" ref="number2" class="numberImg"/>
                        </td>
                        <td ref="box3">
                            <img :src="blank" v-on:click="c2sPlaying(3)" ref="number3" class="numberImg"/>
                        </td>
                    </tr>

                    <tr>
                        <td ref="box4">
                            <img :src="blank" v-on:click="c2sPlaying(4)" ref="number4" class="numberImg"/>
                        </td>
                        <td ref="box5">
                            <img :src="blank" v-on:click="c2sPlaying(5)" ref="number5" class="numberImg"/>
                        </td>
                        <td ref="box6">
                            <img :src="blank" v-on:click="c2sPlaying(6)" ref="number6" class="numberImg"/>
                        </td>
                    </tr>

                    <tr>
                        <td ref="box7">
                            <img :src="blank" v-on:click="c2sPlaying(7)" ref="number7" class="numberImg"/>
                        </td>
                        <td ref="box8">
                            <img :src="blank" v-on:click="c2sPlaying(8)" ref="number8" class="numberImg"/>
                        </td>
                        <td ref="box9">
                            <img :src="blank" v-on:click="c2sPlaying(9)" ref="number9" class="numberImg"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="card">
                <div style="height: 30px;">
                    <div class="select" v-if="currentUid==own.uid">请选择！</div>
                    <div class="wait" v-else>等待中。。。</div>
                </div>
                <div class="name">
                    {{own.name}}
                    <img :src="own.icon"  style="width: 10%"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tictactoe",
        data(){
            return {
                right:require("../../../assets/tictactoe/right.jpg"),
                wrong:require("../../../assets/tictactoe/wrong.jpg"),
                blank:require("../../../assets/tictactoe/blank.jpg"),
                roomInfo:{},
                own:{},
                rival:{},
                currentUid:0
            }
        },
        mounted(){
            this.$init();
            this.roomInfo = this.$route.params.roomInfo;
            this.own = this.roomInfo.userList[this.$root.uid];
            this.own.list = new Array();
            for(var uid in this.roomInfo.userList){
                if (uid != this.$root.uid){
                    this.rival = this.roomInfo.userList[uid];
                    this.rival.list = new Array();
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
                    "S2C_TictactoePlay":this.s2cPlaying,
                }
            },

            start:function(data){
                this.currentUid = data.currentUid;
                if (data.userIcon[this.$root.uid]){
                    this.own.icon =  this.right;
                    this.rival.icon =  this.wrong
                }else{
                    this.own.icon =  this.wrong;
                    this.rival.icon =  this.right
                }
            },

            continue:function(data){
                let mode = data.mode;
                let playerList = mode.info;
                this.currentUid = mode.currentUid;

                if (playerList[this.$root.uid].icon){
                    this.own.icon =  this.right;
                    this.rival.icon =  this.wrong
                }else{
                    this.own.icon =  this.wrong;
                    this.rival.icon =  this.right
                }

                for(var uid in playerList){
                    let user = playerList[uid];
                    let icon = uid == this.$root.uid ? this.own.icon:this.rival.icon;
                    for (var key in user.list){
                        this.$refs["number"+ user.list[key]].src = icon;
                    }
                }

            },

            c2sPlaying:function (number) {

                this.$websocketSend({
                    C2S_TictactoePlay:{
                        number:number
                    }
                });
            },

            s2cPlaying:function (data) {
                let number = data.number;
                this.currentUid = data.currentUid;
                if (data.uid == this.$root.uid){
                    this.own.list.push(data.number);
                    this.own = Object.assign({}, this.own);
                    this.$refs["number"+number].src = this.own.icon;
                } else{
                    this.rival.list.push(data.number);
                    this.rival = Object.assign({}, this.rival);
                    this.$refs["number"+number].src = this.rival.icon;
                }

            },

            end:function (data) {
                let winCombine = data.end.winCombine;

                for (var key in winCombine){
                    this.$refs["box" + winCombine[key]].style="border: 3px solid #23c92082;" ;
                }
                this.$victoryDlg(this.$root.uid, data.winUid);
            },

        }
    }
</script>

<style scoped>
    .square{
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%; /* padding百分比是相对父元素宽度计算的 */
        margin-bottom: 30px;
    }
    .square-inner{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%; /* 铺满父元素容器，这时候宽高就始终相等了 */
    }

    .table{
        border-collapse: separate;
        border-spacing: 0.57em;
        font-size: 14px;
        table-layout: fixed;

    }

    .table td {
        padding: 0;
        height: 33%;
        width: 28%;
        text-align: center;
        vertical-align: inherit;

    }

    .numberImg{
        width: 100%;
    }

    .select{
        color: var(--light);
        text-align: center;
        line-height: 30px;
        background-color: var(--cyan);
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

<template>
  <div class="row justify-content-center" style="padding-top: 10%">
    <div class="col-md-8">
      <button v-on:click="matchGame(1001)" type="button" class="btn btn-info btn-lg btn-block" >
        猜拳游戏
      </button>
      <br/>
      <button v-on:click="test()" type="button" class="btn btn-info btn-lg btn-block" >
        井字棋
      </button>
      <br/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SelectGame",
    data(){
      return{
        msg:"",
      }
    },
    methods:{

      matchGame:function (gameId) {
        this.$websocketSend({
          C2S_MatchPlayer:{game_id:gameId}
        })
      }
    }
  }
</script>

<style >
  .v-dialog-dialog{
    max-width: 320px;

  }
</style>

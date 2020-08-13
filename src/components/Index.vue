<template>
  <div class="row justify-content-center" style="padding-top: 35%">
    <div class="col-md-8">
      <router-link to="/login">
        <button type="button" class="btn btn-info btn-lg btn-block" >
          玩家登录
        </button>
      </router-link>
      <router-link to="/foo">
        <button type="button" class="btn btn-default btn-lg btn-block" style="border: 1px solid #9e9e9e9e;margin-top: 10px">
          玩家注册
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

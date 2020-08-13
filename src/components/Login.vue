<template>

  <div class="row justify-content-center" style="margin-top: 22%" >

    <div class="col-md-8">
      <div class="card">
        <div class="card-header">玩家登录</div>
        <div class="card-body">
          <div class="form-group row mb-0">
            <div class="col-md-6 offset-md-4" >
              <input type="text" v-model="loginName" class="form-control" id="loginName" placeholder="登录账号">
            </div>
          </div>
          <br>

          <div class="form-group row mb-0">
            <div class="col-md-6 offset-md-4">
              <input type="password" v-model="loginPassword" class="form-control" id="loginPassword" placeholder="登录密码">
            </div>
          </div>
          <br>

          <div class="form-group row mb-0">
            <div class="col-md-6 offset-md-4" style="margin-left: 23%">
              <button type="submit" class="btn btn-info" v-on:click="login">
                登录
              </button>
              <button type="submit"  class="btn btn-default btn" style="border: 1px solid #9e9e9e9e" onclick="">
                注册
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        loginName:"Test1",
        loginPassword:"123456",
        msg:"test",
      }
    },
    methods: {
      login: function () {
        const loginDlg = this.$dlg.mask('登录请求中。。。', function(){},{});
        var data = {
          C2S_Login:{
            name: this.loginName,
            password: this.loginPassword
          }
        };
        this.$websocketSend(data);

      }
    }

  }
</script>

<style scoped>

</style>

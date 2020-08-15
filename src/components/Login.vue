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
                            <button type="button" class="btn btn-info" v-on:click="c2sLogin">
                                登录
                            </button>
                            <router-link to="/register">
                                <button type="button"  class="btn btn-default btn" style="border: 1px solid #9e9e9e9e">
                                    注册
                                </button>
                            </router-link>
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
                loginName:"Test01",
                loginPassword:"123456",
            }
        },
        created(){
            this.$init();
        },

        methods: {
            notifyRegister:function(){
                return{
                    "S2C_Login":this.s2cLogin
                }
            },

            c2sLogin: function () {
                var self = this;
                self.$dlg.mask('登录请求中。。。', function(){
                    self.$dlg.toast("请求超时。。。", {
                        messageType: 'error',
                        closeTime: 2,
                        position:'topCenter',
                    });
                },{
                    closeTime:10,
                });
                var data = {
                    C2S_Login:{
                        name: this.loginName,
                        password: this.loginPassword
                    }
                };
                self.$websocketSend(data);

            },

            s2cLogin:function (data) {
                var self = this;
                this.$dlg.closeAll();
                self.$root.setLoginInfo(data);
                self.$dlg.mask('登录成功！跳转游戏界面', function(){
                    self.$router.push("/select-game")
                },{
                    closeTime: 1.5,
                    singletonKey: "LoginSuccess",
                })
            }
        }

    }
</script>

<style scoped>

</style>

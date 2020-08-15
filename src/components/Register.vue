<template>

    <div class="row justify-content-center" style="margin-top: 22%" >

        <div class="col-md-8">
            <div class="card">
                <div class="card-header">玩家注册</div>
                <div class="card-body">
                    <div class="form-group row mb-0">
                        <div class="col-md-6 offset-md-4" >
                            <input type="text" v-model="name" class="form-control" id="name" placeholder="账号">
                        </div>
                    </div>
                    <br>

                    <div class="form-group row mb-0">
                        <div class="col-md-6 offset-md-4">
                            <input type="password" v-model="password" class="form-control" id="password" placeholder="密码">
                        </div>
                    </div>
                    <br>

                    <div class="form-group row mb-0">
                        <div class="col-md-6 offset-md-4">
                            <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword" placeholder="确认密码">
                        </div>
                    </div>
                    <br>
                    <div class="form-group row mb-0">
                        <div class="col-md-6 offset-md-4" style="margin-left: 23%">
                            <button type="button" class="btn btn-info" v-on:click="c2sRegister">
                                注册
                            </button>
                            <router-link to="/">
                                <button type="button"  class="btn btn-default btn" style="border: 1px solid #9e9e9e9e">
                                    登录
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
        name: "Register",
        data(){
            return{
                name:"",
                password:"",
                confirmPassword:"",
            }
        },
        created(){
            this.$init();
        },
        methods: {

            notifyRegister:function(){
                return{
                    "S2C_Register":this.s2cRegister
                }
            },

            c2sRegister: function () {
                this.$dlg.mask('注册请求中。。。', function(){},{
                });
                var data = {
                    C2S_Register:{
                        name: this.name,
                        password: this.password,
                        confirmPassword: this.confirmPassword,
                    }
                };
                this.$websocketSend(data);

            },

            s2cRegister:function (data) {
                var self = this;
                this.$dlg.closeAll();
                self.$root.setLoginInfo(data);
                self.$dlg.mask('注册成功！跳转游戏界面', function(){
                    self.$router.push("/select-game")
                },{
                    closeTime: 1.5,
                })
            }
        }

    }
</script>

<style scoped>

</style>

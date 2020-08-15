const errorCode = {
    0 : {
        explain:"提示错误",
        fun:function (data, self) {
            self.$dlg.closeAll();
            self.$dlg.toast(data.message, {
                messageType: 'error',
                closeTime: 2,
                position:'topCenter',
            });
        },
    },
    100 : {
        explain:"重新登录",
        fun:function(data, self){
            self.$dlg.toast(data.message,function () {
                self.$root.resetLoginInfo();
                self.$router.push({ name : "Login" })
            },{
                messageType: 'error',
                closeTime: 1.5,
                position:'topCenter',
            });
        },
    },
};

export default {
    install(Vue) {
        Vue.prototype.$errorCode = errorCode;
    }
}

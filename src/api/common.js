export default {
    install(Vue) {
        const self = Vue.prototype;

        self.$victoryDlg = function (uid, winUid) {
            let info = "You Loser!!!";
            let type = "error";

            if (winUid == uid){
                info = "You Win!!!";
                type = "success";
            }else if(winUid == 0){
                info = "No Win!!!";
                type = "info";
            }

            this.$dlg.alert(info,function(){},{
                messageType: type,
            })
        };
    }
}

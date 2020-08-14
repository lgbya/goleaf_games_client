export default {
    install(Vue)  {
        Vue.prototype.$websock = null;

        Vue.prototype.$preHeartTime = 0; //上个心跳包返回的服务器时间

        Vue.prototype.$nowServerTime = 0; //最新心跳包返回的服务器时间
        Vue.prototype.$heartTimeObj =  null;//心跳心跳倒计时

        Vue.prototype.$component = null;

        Vue.prototype.$timeout = 28*1000;//心跳时间

        Vue.prototype.$initWebSocket =  function (){ //初始化weosocket
            const wsuri = "ws://192.168.2.201:3563/?{'new':3}";
            Vue.prototype.$websock = new WebSocket(wsuri);
            Vue.prototype.$websock.onopen = this.$websocketOnopen;
            Vue.prototype.$websock.onerror = this.$websocketOnerror;
            Vue.prototype.$websock.onclose = this.$websocketClose;
            Vue.prototype.$websock.onmessage = this.$websocketOnmessage;
            Vue.prototype.$component = this;
            this.$startHeart()

        };

        Vue.prototype.$websocketOnopen = function (){ //连接建立之后执行send方法发送数据
            console.log('连接成功');
        };

        Vue.prototype.$websocketOnmessage = function (evt){//连接建立失败重连
            var filrReader = new FileReader();
            filrReader.onload = function() {
                var arrayBuffer = this.result;
                var decoder = new TextDecoder('utf-8');
                var json = JSON.parse(decoder.decode(new DataView(arrayBuffer)));
                console.log("返回数据:", json);
                for (var name in json){
                    if (name == "S2C_Heart"){
                        Vue.prototype.$preHeartTime = Vue.prototype.$nowServerTime;
                        Vue.prototype.$nowServerTime = json[name].time;
                    }else{
                        Vue.prototype.$component["$s2c" + name.substring(4)](json[name]);
                    }
                }
            };
            filrReader.readAsArrayBuffer(evt.data);
        };

        Vue.prototype.$websocketOnerror = function(){ //数据接收

        };

        Vue.prototype.$websocketSend = function(data){//数据发送
            console.log("发送数据:",  data);
            Vue.prototype.$component = this;
            Vue.prototype.$websock.send(JSON.stringify(data));
        };

        Vue.prototype.$websocketClose = function(){  //关闭
            clearTimeout(Vue.prototype.$timeoutObj);
            Vue.prototype.$initWebSocket();
        };

        Vue.prototype.$websocketReconnect = function(){  //关闭
            var self = this;
            if(self.$websock != null) {
                return;
            }

            //没连接上会一直重连，设置延迟避免请求过多
            self.timeoutnum && clearTimeout(self.timeoutnum);
            self.timeoutnum = setTimeout(function () {
                //新连接
                self.$initWebSocket();
            },5000);
        };

        Vue.prototype.$startHeart = function(){  //关闭
            var self = this;

            self.$heartTimeObj && clearTimeout(self.$heartTimeObj);

            self.$heartTimeObj = setInterval(function(){
                var nowTime = self.$nowServerTime;
                var preTime =  self.$preHeartTime;

                if (nowTime != 0 && preTime != 0 && nowTime - preTime > 30){
                    self.$websocketClose();
                }else{
                    //这里发送一个心跳，后端收到后，返回一个心跳消息，
                    if (self.$websock.readyState == 1) {//如果连接正常
                        self.$websocketSend({C2S_Heart:{}});
                    }else{//否则重连
                        console.log("心跳重连", preTime, nowTime);
                        self.$websocketReconnect();
                    }
                }

            }, self.$timeout);
        }

    }
}

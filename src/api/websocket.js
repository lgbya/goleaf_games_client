const wsuri = "ws://192.168.2.201:3563/?{'new':3}";

export default {
    install(Vue)  {
        Vue.prototype.$websocket = null;
        Vue.prototype.$component = null;

        Vue.prototype.$preHeartTime = 0; //上个心跳包返回的服务器时间
        Vue.prototype.$nowServerTime = 0; //最新心跳包返回的服务器时间
        Vue.prototype.$heartTimeObj =  null;//心跳心跳倒计时
        Vue.prototype.$timeout = 28*1000;//心跳时间

        Vue.prototype.$reconnectTimeObj =  null;//重新登录倒计时
        Vue.prototype.$reconnectNum =  0;//重新连接次数
        Vue.prototype.$reconnectMaxNum =  5;//重新连接最大次数
        Vue.prototype.$nextReconnectTime =  5000;//下次重连的时间


        Vue.prototype.$initWebSocket =  function (){ //初始化weosocket
            if (Vue.prototype.$component == null) {
                Vue.prototype.$component= this;
            }

            Vue.prototype.$websocket = new WebSocket(wsuri);
            Vue.prototype.$websocket.onopen = this.$websocketOnopen;
            Vue.prototype.$websocket.onerror = this.$websocketOnerror;
            Vue.prototype.$websocket.onclose = this.$websocketClose;
            Vue.prototype.$websocket.onmessage = this.$websocketOnmessage;
            this.$startHeart()
        };

        Vue.prototype.$websocketOnopen = function (){ //连接建立之后执行send方法发送数据
            console.log("连接成功！！！");
            let token = Vue.prototype.$component.$root.token;
            if (token !== ""){
                Vue.prototype.$websocketSend({C2S_ResetLogin:{token:token}});
            }
        };
        Vue.prototype.$websocketClose = function(){  //关闭
            clearTimeout(Vue.prototype.$reconnectTimeObj);
            clearTimeout(Vue.prototype.$heartTimeObj);
            Vue.prototype.$websocketReconnect();
        };

        Vue.prototype.$websocketReconnect = function(){  //关闭
            var self = Vue.prototype;
            //判断websocket有没有连接成功
            if(self.$websocket != null && self.$websocket.readyState == 1) {
                return;
            }

            //没连接上会一直重连，设置延迟避免请求过多
            self.$reconnectTimeObj && clearTimeout(self.$reconnectTimeObj);
            self.$reconnectTimeObj = setInterval(function () {
                self.$reconnectNum++;
                let result = self.$websocket != null && self.$websocket.readyState == 1;
                let result2 = self.$reconnectMaxNum == self.$reconnectNum;
                if (result || result2){
                    clearTimeout(self.$reconnectTimeObj);
                    return
                }

                //新连接
                self.$initWebSocket();

            }, self.$nextReconnectTime);
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
            Vue.prototype.$websocket.send(JSON.stringify(data));
        };

        Vue.prototype.$startHeart = function(){  //关闭
            var self = this;

            self.$heartTimeObj && clearTimeout(self.$heartTimeObj);

            self.$heartTimeObj = setInterval(function(){
                var nowTime = self.$nowServerTime;
                var preTime =  self.$preHeartTime;

                if (nowTime != 0 && preTime != 0 && nowTime - preTime > 30){
                    self.$websocket.close();
                }else{
                    //这里发送一个心跳，后端收到后，返回一个心跳消息，
                    if (self.$websocket.readyState == 1) {//如果连接正常
                        self.$websocketSend({C2S_Heart:{}});
                    }else{//否则重连
                        self.$websocket.close();
                    }
                }

            }, self.$timeout);
        }

    }
}

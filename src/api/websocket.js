export default {
    install(Vue)  {
        const self = Vue.prototype;

        self.$websocket = null;
        self.$component = null;
        self.$beforeSend = null;

        self.$preHeartTime = 0; //上个心跳包返回的服务器时间
        self.$nowServerTime = 0; //最新心跳包返回的服务器时间
        self.$heartTimeObj =  null;//心跳心跳倒计时
        self.$timeout = 15*1000;//心跳时间

        self.$reconnectTimeObj =  null;//重新登录倒计时
        self.$reconnectNum =  0;//重新连接次数
        self.$reconnectMaxNum =  5;//重新连接最大次数
        self.$nextReconnectTime =  5000;//下次重连的时间


        self.$initWebSocket =  function (){ //初始化weosocket


            if (self.$component == null) {
                self.$component= this;
            }

            self.$component.$dlg.closeAll();
            self.$websocket = new WebSocket(this.$cfg.websocket.uri);
            self.$websocket.onopen = this.$websocketOnopen;
            self.$websocket.onerror = this.$websocketOnerror;
            self.$websocket.onclose = this.$websocketClose;
            self.$websocket.onmessage = this.$websocketOnmessage;
            this.$startHeart()
        };

        Vue.prototype.$websocketOnopen = function (){ //连接建立之后执行send方法发送数据
            console.log("连接成功！！！");
            let self = Vue.prototype;
            let token = self.$component.$root.token;
            if (token !== ""){
                self.$websocketSend({C2S_ResetLogin:{token:token}});
            }
            if (self.$beforeSend !== null){
                self.$beforeSend();
                self.$beforeSend = null;
            }
        };
        self.$websocketClose = function(){  //关闭
            console.log("连接断开！！！");
            self.$websocketReconnect();
        };

        self.$websocketReconnect = function(){  //关闭

            //判断websocket有没有连接成功
            if(self.$websocket != null && self.$websocket.readyState == 1) {
                return;
            }
            self.$component.$dlg.mask('正在重新连接。。。',{
                closeTime: 10,
                singletonKey: "Reconect",
            });
            //没连接上会一直重连，设置延迟避免请求过多
            self.$heartTimeObj && clearTimeout(self.$heartTimeObj);
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

        self.$websocketOnmessage = function (evt){//连接建立失败重连
            var filrReader = new FileReader();
            filrReader.onload = function() {
                var arrayBuffer = this.result;
                var decoder = new TextDecoder('utf-8');
                var json = JSON.parse(decoder.decode(new DataView(arrayBuffer)));
                console.log("返回数据:", json);
                for (var name in json){
                    if (name == "S2C_Heart"){
                        self.$preHeartTime = self.$nowServerTime;
                        self.$nowServerTime = json[name].time;
                    }else{
                        self.$component["$s2c" + name.substring(4)](json[name]);
                    }
                }
            };
            filrReader.readAsArrayBuffer(evt.data);
        };

        self.$websocketOnerror = function(){ //数据接收

        };

        self.$websocketSend = function(data){//数据发送
            console.log("发送数据:",  data);

            let fun = function () {
                self.$websocket.send(JSON.stringify(data));
            };

            if(self.$websocket == null || self.$websocket.readyState !== 1) {
                self.$beforeSend = fun;
                self.$websocketReconnect();
            }else{
                fun();
            }
        };

        self.$startHeart = function(){  //关闭
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

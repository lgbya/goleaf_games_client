export default {
    install(Vue)  {
        Vue.prototype.$component = null;
        Vue.prototype.$ws = null;
        Vue.prototype.$initWebSocket =  function (){ //初始化weosocket
            const wsuri = "ws://192.168.2.201:3563/?{'new':3}";
            Vue.prototype.$ws = new WebSocket(wsuri);
            Vue.prototype.$ws.onopen = this.$websocketOnopen;
            Vue.prototype.$ws.onerror = this.$websocketOnerror;
            Vue.prototype.$ws.onclose = this.$websocketClose;
            Vue.prototype.$ws.onmessage = this.$websocketOnmessage;
            Vue.prototype.$component = this;

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
                for (var name in json){
                    console.log(json[name]);
                    Vue.prototype.$component[name](json[name])
                }
            };
            filrReader.readAsArrayBuffer(evt.data);
        };

        Vue.prototype.$websocketOnerror = function(){ //数据接收
            this.$initWebSocket();
        };

        Vue.prototype.$websocketSend = function(data){//数据发送
            Vue.prototype.$component = this;
            Vue.prototype.$ws.send(JSON.stringify(data));
        };

        Vue.prototype.$websocketClose = function(e){  //关闭
            Vue.prototype.$initWebSocket();
        }
    }
}

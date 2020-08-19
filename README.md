# goleaf_games_server

## 一，说明
#### 根据游戏服go leaf框架 + 客户端node + vue 写的多个小游戏集合， 现有猜拳，井字棋
#### 线上地址: http://139.159.155.172:8080/#/
#### 游戏服git地址:https://github.com/lgbya/goleaf_games_server

## 二，配置环境
**node**

## 三，安装步骤

1. **修改websocket文件**
```
mv src/config/websocket.js.example src/config/websocket.js

//修改对应的websocket地址
export default {
    uri : "ws://192.168.2.201:3563/?{'new':3}",
};
```

1. **修改index.js文件**
```
    cd config/index.js
    修改以下位置
	dev:{
	    host: '127.0.0.1',//对应的域名或者私有网络
        port: 8080, // 端口号
        .......
	}
```

1. **安装对应的依赖包**
```
    npm install
```

1. 运行项目
```
    npm run dev
```

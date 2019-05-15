# 怎样调试 Vue.js

```js
Vue.config.debug = true; 
Vue.config.devtools = true;
```

在 chrome 中下载 vue-devtool 工具

## 天朝安装方式

1.[vue-devtools github](https://github.com/vuejs/vue-devtools)

2.下载好后进入vue-devtools-master工程 

```shell
npm install

npm run build.
```

3.修改mainifest.json 中的 persistent 为true

4.打开谷歌浏览器设置--->扩展程序--》勾选开发者模式---》添加工程中的shells-->chrome的内容，至此恭喜已经安装成功！！！


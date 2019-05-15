# Vue 懒加载
基于Js的新的特性  **dynamic import**(动态导入)和 webpack supports 的支持，我们可以在 vue 项目中使用这项功能，让我们的页面在加载时具有更好的加载体验。

以下是常用的路由：

```js
import Vue from 'vue'
import Router from 'vue-router'
// 通常我们把要加载的页面都写在此
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
```

要设置为具有懒加载功能的路由，我们需要进行以下的代码改造：

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Home')
    },
    {
      path: '/about',
      name: 'about',
      component: loadView('About')
    }
  ]
})
```

下面我们简单的分析一下：
1. 我们移除了静态引入的 `home` 和 `about` 组件。
2. 我们创建了一个 `loadview` 函数，它动态的创建并引用 vue 组件。
3. 在动态引入的函数中，我们使用了 `/* webpackChunkName: "view-[request]" */` 去标记需要动态引入的文件。
4. 路由通过 `loadVieew` 函数的参数解析组件名称。

当我们使用 `yarn build` 时，我们将会得到以下结果：

我们会多得到2个 js 文件。在这里，我们需要注意的是 `loadView` 中添加的是你的文件地址，文件名不能写错，比如如果你的文件如下效果时

```shell
|— src
|      |— pages
|              |— home
|                      |— index.vue
|                      |— main.js
|                      |— layout.scss
|— router.js
```
这时，你的函数应该是下面这样：

```js
function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/pages/${view}/index.vue`)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView(‘home')
    },
    …
  ]
})
```

![WechatIMG5265.jpeg](http://wx3.sinaimg.cn/large/9444af88gy1frioifc9nmg21460pware.gif)

## 参考
[原文地址]( https://alligator.io/vuejs/lazy-loading-vue-cli-3-webpack/)


[TOC]

# Vue Plugins(Vue 插件)

## [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)
**状态持久化**

使用浏览器的本地存储（ local storage ）对状态（ state ）进行持久化。这意味着刷新页面或关闭标签页都不会删除你的数据。

一个很好的例子就是购物车：如果用户不小心关闭了一个标签，他们可以重新打开并回到之前页面的状态。

![image](http://wx1.sinaimg.cn/mw690/9444af88gy1fv5bje7n1rg20b40aa7wi.gif)


## [vuex-shared-mutations](https://github.com/xanf/vuex-shared-mutations)

**同步标签页、窗口**

可在不同的标签页之间同步状态。它通过 mutation 将状态储存到本地存储（local storage）来实现。选项卡、窗口中的内容更新时触发储存事件，重新调用 mutation ，从而保持状态同步。

![](http://wx4.sinaimg.cn/mw690/9444af88gy1fv5bjowcrxg20b40aa4qq.gif)

## [vuex-i18n](https://github.com/dkfbasel/vuex-i18n)
**语言本地化**

允许你轻松地用多种语言存储内容。让你的应用切换语言时更容易。

一个很酷的功能是你可以存储带有标记的字符串，比如"Hello {name}, this is your Vue.js app."。所有的翻译版本都会在标记的地方使用相同的字符串。

![image](http://wx2.sinaimg.cn/mw690/9444af88gy1fv5bjhd7mfg20b40aa1jo.gif)


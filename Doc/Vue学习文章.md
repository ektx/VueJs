[TOC]

[vuex最简单、最详细的入门文档](https://segmentfault.com/a/1190000009404727)

[你或许不知道Vue的这些小技巧](https://segmentfault.com/a/1190000015157246?utm_source=index-hottest)

### v-if尽量不要与v-for在同一节点使用:

**v-for 的优先级比 v-if 更高,如果它们处于同一节点的话，那么每一个循环都会运行一遍v-if**。

如果你想根据循环中的每一项的数据来判断是否渲染，那么你这样做是对的:
```html
    <li v-for="todo in todos" v-if="todo.type===1">
      {{ todo }}
    </li>
```
如果你想要根据某些条件跳过循环，而又跟将要渲染的每一项数据没有关系的话，你可以将v-if放在v-for的父节点：
```html
    // 根据elseData是否为true 来判断是否渲染，跟每个元素没有关系    
     <ul v-if="elseData">
      <li v-for="todo in todos">
        {{ todo }}
      </li>
    </ul>
    // 数组是否有数据 跟每个元素没有关系
    <ul v-if="todos.length">
      <li v-for="todo in todos">
        {{ todo }}
      </li>
    </ul>
    <p v-else>No todos left!</p>
```
如上，正确使用v-for与v-if优先级的关系，可以为你节省大量的性能。

## 深度watch与watch立即触发回调
watch很多人都在用，但是这watch中的这两个选项 `deep`、`immediate`，或许不是很多人都知道，我猜。

选项：deep

在选项参数中指定 `deep: true`，可以监听对象中属性的变化。

选项：immediate

在选项参数中指定 `immediate: true`, 将立即以表达式的当前值触发回调，也就是默认触发一次。
```js
    watch: {
        obj: {
          handler(val, oldVal) {
            console.log('属性发生变化触发这个回调',val, oldVal);
          },
          deep: true // 监听这个对象中的每一个属性变化
        },
        step: { // 属性
          //watch
          handler(val, oldVal) {
            console.log("默认触发一次", val, oldVal);
          },
          immediate: true // 默认触发一次
        },
      },
```

## 这些情况下不要使用箭头函数:
- 不应该使用箭头函数来定义一个生命周期方法
- 不应该使用箭头函数来定义 method 函数
- 不应该使用箭头函数来定义计算属性函数
- 不应该使用箭头函数来定义 watcher 函数
- 不应该对 data 属性使用箭头函数
- 不应该使用箭头函数来定义 watcher 函数
示例：
```js
    // 上面watch的栗子：
    handler:(val, oldVal)=> { // 可以执行
     console.log("默认触发一次", val, oldVal);
   },
   // method：
     methods: {
        plus: () => { // 可以执行
          // do something
        }
      }
   // 生命周期:
     created:()=>{ // 可以执行
       console.log('lala',this.obj) 
      },
是的，没错，这些都能执行。
```
but:

箭头函数绑定了父级作用域的上下文，this 将不会按照期望指向 Vue 实例。

也就是说，你不能使用this来访问你组件中的data数据以及method方法了。

this将会指向undefined。
还有下面这一点需要注意。

## 路由懒加载写法:
```js
    // 我所采用的方法，个人感觉比较简洁一些，少了一步引入赋值。
    const router = new VueRouter({
      routes: [
        path: '/app',
        component: () => import('./app'),  // 引入组件
      ]
    })
    // Vue路由文档的写法:
    const app = () => import('./app.vue') // 引入组件
    const router = new VueRouter({
      routes: [
        { path: '/app', component: app }
      ]
    })
```
文档的写法在于问题在于：如果我们的路由比较多的话，是不是要在路由上方引入赋值十几行组件？

第一种跟第二种方法相比就是把引入赋值的一步，直接写在component上面，本质上是一样的。两种方式都可以的，大家自由选择哈。

```js
// webpack 上写法

function loadView (view) {
    return () => import(/* webPackChunkName: "view-[request]" */) `pages/${view}/index.vue`)
}

const router = new Rputer({
    routes: [
        path: '/todoList',
        component: loadView('home')
    ]
})
```

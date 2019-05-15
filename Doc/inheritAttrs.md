# inheritAttrs
> 2.4.0 +

当子组件同时传了 a b c 三个prop,而子组件的prop选项只声明了 a和b，此时，c会作为html自定义属性在子组件的根元素上。

如果我们不想让它显示，我们可以使用 `inheritAttrs: false` 这样就不会出现上述问题。

```js
export default {
    name: 'child',
    props: ['a', 'b'],
    // 隐藏不使用的 props 属性
    inheritAttrs: false
}
```
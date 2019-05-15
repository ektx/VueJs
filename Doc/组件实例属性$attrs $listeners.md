$attrs 与 $listeners 在开发高级的组件时，可以方便我们对组件之间的属性与事件的传递工作。

## $attrs

> class 与 style 除外 

parent.vue
```html
<template>
    <child a="a" b="b" c="c"></child>
</template>
```

child.vue
```html
<template>
    <grandChild v-bind="$attrs" d="d"/>
</template>

<script>
export default {
    name: 'child',
    props: ['a', 'b'],
    inheritAttrs: false
}
</script>
```

grandChild.vue
```js
export default {
    name: 'grandChild',
    props: [],
    inheritAttrs: false,
    mounted () {
        console.log(this.$attrs)
        // {d: 'd', c: 'c'}
        // a b 在父级被 props 使用
    }
}
```

## $listeners

- vm.$listeners 是组件的内置属性，它的值是父组件（不含.native修饰器的）v-on 事件监听器。
- 组件可以通过在自己子组件上使用 `v-on="$listeners"` 进一步把值传给自己的子组件。如果子组件已经绑定 `$listeners`中同名的监听器，则2个监听器函数以冒泡的方式先后执行。

parent.vue
```html
<template>
    <child @update="onParentUpdate"/>
</template>

<script>
export default {
    name: 'parent',
    components: { Child },
    methods: {
        onParentUpdate () {
            console.log('parent.vue:onParentUpdate')
        }
    }
}
</script>
```

child.vue
```html
<template>
    <grandChild @update="onChildUpdate" v-on="$listeners"/>
</template>
<script>
export default {
    name: 'child',
    components: { grandChild },
    methods: {
        onChildUpdate () {
            console.log('child.vue:onChildUpdate')
        }
    }
}
</script>
```

grandChild.vue
```js
export default {
    name: 'grandchild',
    mounted () {
        console.log(this.$listeners)
        // {update: f }
        
        this.$listeners.update()
        // child.vue:onChildUpdate
        // parent.vue:onParentUpdate
    }
}
```
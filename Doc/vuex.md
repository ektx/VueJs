# vuex

vue 组件状态管理器

## 使用

```javascript
// 引用
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 声明实例
// 新建一个 store.js 中 src/assets 下
const store = new Vuex.Store({
	state: {
		count: 0
	}
})
```

在组件中使用
```javascript
// 调用
import store from 'src/assets/store'

export default {
	'name': 'child',
	data () {
		return {}
	},
	template: `<div>{{ val }}</div>`,
	computed: {
		val () {
			return store.state.count
		}
	}
}
```
## 核心概念

### Getter

### State

#### mapState 

```javascript
computed: {
	val () {
		return stroe.state.count
	}
}
```

我们可以用 `mapState` 函数来简化过程

```javascript
import { mapState } from 'vuex'

export default {
	computed: mapState({
		val: state => state.count,
		countAlias: 'val' // 别名 val 等价于 state => state.count
	})
}
```

还有更简单

```javascript
computed: mapState([
	// 映射 this.count 为 store.state.count
	'count'
])
```

[mapState 辅助函数](https://vuex.vuejs.org/zh-cn/state.html)
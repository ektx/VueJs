import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Welcome'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
	{
	  path: '/',
	  name: 'Hello',
	  component: Hello
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			noRequireAuth: true
		}
	},
	{
		path: '*',
		component: Hello
	}
  ]
})

// 验证 token,存在才跳转
router.beforeEach( (to, from, next) => {
	let token = localStorage.getItem('WEB_TOKEN');
console.log(to, from)

	if (to.meta.noRequireAuth) {
		next()
	} else {

		if (token) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	}
})


export default router;
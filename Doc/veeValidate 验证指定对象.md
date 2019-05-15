# VeeValidate

[toc]

- [官网](https://baianat.github.io/vee-validate/)

## 手动验证

有时我们可能需要对指定的内容进行验证，如，手动验证邮箱

```html
<div id="app">
  <input v-model="email" type="text" name="email">
  <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
  
  <button @click="validateEmail">validate email</button>
</div>
```

```js
Vue.use(VeeValidate);

new Vue({
	el: '#app',
  data: () => ({
  	email: ''
  }),
  methods: {
  	validateEmail() {
  	    // 验证邮箱
    	this.$validator.validate('email', this.email);
    }
  },
  created() {
  	this.$validator.attach('email', 'required|email');
  }
});
```

线上Demo：https://jsfiddle.net/pp0w8u6s/  
Issues：https://github.com/baianat/vee-validate/issues/242

## 验证表单

```html
<temlpate>
    <form @sublit.prevent="submitForm">
        <input v-model="name" type="text" name="name" v-validate="'min:6|required'">
        <input v-model="paswd" type="password" name="paswd" v-validate="'min:6|required'">
    </form>
</template>

<script>
export dafualt {
    name: 'demo',
    data () {
        return {
            name: '',
            paswd: ''
        }
    },
    methods: {
        submitForm () {
            this.$validator.validateAll().then(result => {
                if (result) {
                    console.log('OK')
                    return
                }
                
                console.error('Faild')
            })
        }
    }
}
</sccript>
```
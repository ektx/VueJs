<template>
  <div class="hello">
	<h1>Login</h1>

	<form v-on:submit.prevent="submitSubmit" action="">
		<input type="text" placeholder="name" v-model="name">
		<input type="password" placeholder="passwd" v-model="pawd">

		<button type="submit">提交</button>
	</form>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
	return {
	  msg: 'Welcome',
	  name: '',
	  pawd: ''
	}
  },
  methods: {
  	submitSubmit: function() {
  		console.log(this.name, this.pawd)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

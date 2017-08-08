<template>
  <nav>
    <a href="#">Home</a>
    <a href="#">user</a>
    <a href="#">about</a>
  </nav>
</template>

<script>
import sayHi from './components/sayHi'

export default {
  name: 'app',
  data () {
    return {
      value3: ''
    }
  },
  components: {
    sayHi
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  width: 100%;
  line-height: 42px;
  background: #fff;
  border-bottom: 1px solid #ddd;
}

nav a {
  display: inline-block;
  color: #333;
}
</style>

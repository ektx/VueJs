<template>
<div>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/hi">Hi</router-link>

  </nav>
  <router-view></router-view>

</div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
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

<!-- 程序入口vue组件 -->
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <btn>abc</btn>
    <btn>abc</btn>
    <router-view></router-view>
  </div>
</template>

<script>
import btn from './components/button';
export default {
  name: 'app',
  components: {
    btn
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
</style>

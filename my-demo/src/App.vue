<template>
  <div id="app">
    <img src="./assets/logo.png">
    <el-button type="success">成功按钮</el-button>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <sayHi></sayHi>
    <router-view></router-view>


  </div>
</template>

<script>
import sayHi from './components/sayHi'
import ElementUI from 'element-ui'

export default {
  name: 'app',
  components: {
    sayHi,
    ElementUI
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

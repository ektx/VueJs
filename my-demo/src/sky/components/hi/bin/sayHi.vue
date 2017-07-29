<template>
  <div id="say-hi">
    <h1>Hi</h1>
    <p>Hi! {{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'Sky-Hi',
  data () {
    return {
      name: 'zwl!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#say-hi {
  color: yellowgreen
}
</style>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  data () {
    return {
      name: 'sjakljsl'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background: green;
}
</style>

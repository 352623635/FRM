<template>
<h1>今天是{{date}}</h1>
</template>

<script>
export default {
  name: "home",
  data(){
    return{
      date:new Date().toLocaleDateString()
    }
  }
}
</script>

<style scoped>

</style>

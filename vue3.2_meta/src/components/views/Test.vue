<template>

</template>

<script setup lang="ts">
class class1 {
  string1:string|undefined
  fun=()=>{
    return(this.string1)
  }
}
// 类可以被继承
class class2 extends class1{}
//继承后可以继续更改
class class3 extends class1{
  constructor(string1: string, string2: string) {
    super()
    this.string1=string1
    this.string2=string2
  }

  string2:string|undefined
  fun=()=>{
    super.fun();
    return(this.string2)
  }
}
let target= new class3('string of 1', 'string of 2')
console.log(target.fun())
</script>

<style lang="scss" scoped>

</style>
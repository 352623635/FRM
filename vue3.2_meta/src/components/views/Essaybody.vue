<template>
  <div :style="'background-image: url('+host+':3001/background.jpg'+');background-size: cover;'">
    <div style="max-width: 1100px;background-color: white;min-width: 825px;margin: auto">
      <div style="width:91%;margin:auto">
        <TabBar :logo=logo :path=tabbar />
        <suspense>
          <EssayBody />
        </suspense>
        <Footer :footer=footer />
      </div>
    </div>
  </div>
</template>

<script setup>
    import store from "@/store";
    import {computed} from "vue";
    import axios from 'axios';
    import TabBar from "../single/TabBar.vue"
    import Footer from "../single/Footer.vue"
    import EssayBody from "../single/EssayBody.vue";
    const host =store.state.host;
    const tabbar=computed(()=>{return store.state.tabbar});
    const footer=computed(()=>{return store.state.footer});
    const logo=computed(()=>{return store.state.logo});

</script>

<style lang="scss" scoped>

</style>
<template>
  <div :style="'background-image: url('+host+':3001/background.jpg'+');min-width:750px'">
    <TabBar :logo=logo :path=tabbar />
    <suspense>
      <UploadSelf></UploadSelf>
    </suspense>
    <Footer :footer="footer" />
  </div>
</template>

<script lang="ts" setup>
import UploadSelf from '@/components/single/UploadSelf.vue';
import Footer from '@/components/single/Footer.vue';
import TabBar from '@/components/single/TabBar.vue';
import store from '@/store'
const host =store.state.host;

const tabbar = store.state.tabbar;
const footer = store.state.footer;
const logo = store.state.footer;


</script>

<style lang="scss">
@import "src/assets/global.scss";
</style>
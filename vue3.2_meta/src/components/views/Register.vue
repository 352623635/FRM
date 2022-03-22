<template>
  <div :style="'background-image: url('+host+':3001/background_login.jpg'+')'">
    <div style="max-width: 1100px;background-color: #97d5d9b5;min-width: 825px;margin: auto">
        <div class="Login">
            <TabBar :logo=logo :path=tabbar></TabBar>
            <Register></Register>
        </div>
        <Footer :footer="footer"></Footer>
    </div>
  </div>

</template>

<script lang="ts" setup>
    import Register from '@/components/single/RegisterDetail.vue';
    import Footer from '@/components/single/Footer.vue';
    import TabBar from '@/components/single/TabBar.vue';
    import store from '@/store'
    const host = store.state.host;

    const tabbar = store.state.tabbar;
    const footer = store.state.footer;
    const logo = store.state.logo;


</script>

<style lang="scss">
    .Login{
      width: 91%;
        margin: auto;
        height: 100%;
    }
    @import "src/assets/global.scss";
</style>
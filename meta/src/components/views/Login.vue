<template>
    <div :style="{backgroundSize: 'cover',width: '100%',backgroundImage:'url('+url+')'}" >
        <div class="Login">
            <TabBar :path=tabbar :logo=logo></TabBar>
            <LoRe></LoRe>
        </div>
        <Footer :footer="footer"></Footer>
    </div>

</template>

<script setup lang="ts">
    import LoRe from '@/components/single/LoginDetail.vue';
    import Footer from '@/components/single/Footer.vue';
    import TabBar from '@/components/single/TabBar.vue';
    import store from '@/store'
    const url='/src/assets/background.jpg';

    const tabbar = store.state.tabbar;
    const footer = store.state.footer;
    const logo = store.state.logo;


</script>

<style lang="scss">
    .Login{
        max-width: 1000px;
        margin: auto;
        min-width: 750px;
        height: 100%;
    }
    @import "src/assets/global.scss";
</style>
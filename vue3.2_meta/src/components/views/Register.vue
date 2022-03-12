<template>
    <div :style="{backgroundSize: 'cover',width: '100%',backgroundImage:'url('+url+')'}" >
        <div class="Login">
            <TabBar :logo=logo :path=tabbar></TabBar>
            <Register></Register>
        </div>
        <Footer :footer="footer"></Footer>
    </div>

</template>

<script lang="ts" setup>
    import Register from '@/components/single/RegisterDetail.vue';
    import Footer from '@/components/single/Footer.vue';
    import TabBar from '@/components/single/TabBar.vue';
    import store from '@/store'
    const url='/src/assets/background.jpg';

    const tabbar = store.state.tabbar;
    const footer = store.state.footer;
    const logo = store.state.footer;


</script>

<style lang="scss">
    .Login{
        max-width: 1000px;
        margin: auto;
        min-width: 800px;
        height: 100%;
    }
    @import "src/assets/global.scss";
</style>
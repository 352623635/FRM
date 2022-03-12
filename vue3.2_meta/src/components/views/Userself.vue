<template xmlns="">
    <div :style="{backgroundSize: 'cover',width: '100%',backgroundImage:'url('+url+')'}" >
        <div class="Login">
            <TabBar :logo=logo :path=tabbar></TabBar>
            <suspense>
                <User_self></User_self>
            </suspense>
        </div>
        <Footer :footer="footer"></Footer>
    </div>

</template>

<script lang="ts" setup>
    import UserSelf from '@/components/single/UserSelf.vue';
    import Footer from '@/components/single/Footer.vue';
    import TabBar from '@/components/single/TabBar.vue';
    import store from '@/store'
    import User_self from "../single/UserSelf.vue";

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
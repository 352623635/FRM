<template style="width: 100%;background-color: white;min-width:750px">
    <TabBar :logo=logo :path=tabbar />

    <suspense>
        <PushEssay />
    </suspense>
    <Footer :footer=footer />
</template>

<script setup>
    import store from "@/store";
    import {computed} from "vue";
    import axios from 'axios';
    import TabBar from "../single/TabBar.vue"
    import Footer from "../single/Footer.vue"

    import PushEssay from "../single/PushEssay.vue";

    const tabbar=computed(()=>{return store.state.tabbar});
    const footer=computed(()=>{return store.state.footer});
    const logo=computed(()=>{return store.state.logo});

</script>

<style lang="scss" scoped>

</style>
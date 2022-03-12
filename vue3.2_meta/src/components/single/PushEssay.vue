<template>
    <div>

    </div>
</template>

<script setup>
    import store from '@/store';
    import {computed,ref} from "vue";
    const session=computed(()=>{return store.state.session});

</script>

<style scoped>

</style>
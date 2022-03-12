<template>

</template>

<script setup>
    import axios from 'axios'
    import request from "@/utils/request";
    request.get('/web/user/user_self').then(res=>console.log(res))
</script>

<style scoped>

</style>
<template>
  <div :style="'background-image: url('+host+':3001/background.jpg'+');background-size: cover;'">
    <div style="max-width: 1100px;background-color: #97d5d9b5;min-width: 825px;margin: auto">
      <div style="width:91%;margin:auto">
        <TabBar :logo=logo :path=tabbar />

        <div v-if="type==='read'">
          <suspense>
          <UserSelf @update="type_change" ></UserSelf>
          </suspense>
        </div>
        <div v-else-if="type==='write'">
          <suspense>
            <UpdateSelf @update="type_change"></UpdateSelf>
          </suspense>
        </div>

        <Footer :footer="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
    import UpdateSelf from '@/components/single/UpdateSelf.vue'
    import UserSelf from '@/components/single/UserSelf.vue';
    import Footer from '@/components/single/Footer.vue';
    import TabBar from '@/components/single/TabBar.vue';
    import store from '@/store'
    import {ref} from "vue";
    const host =store.state.host;
    const tabbar = store.state.tabbar;
    const footer = store.state.footer;
    const logo = store.state.logo;

    const type = ref('read');

    const type_change = (mess:any):void=>{
      type.value=mess;
    }

</script>

<style lang="scss">
    @import "src/assets/global.scss";
</style>
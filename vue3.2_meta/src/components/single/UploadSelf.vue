<template>
  <div style="max-width:1000px;;min-width:750px;background-color: #f0f0f0;margin: auto">
    <div class="common-layout">
      <el-container>
        <el-header height="275px">

        </el-header>

        <el-container>

          <el-container>
            <el-main style="padding:10px;height: 550px;background-color: azure">
            </el-main>


            <el-footer>Footer</el-footer>
          </el-container>
          <el-aside width="325px">

          </el-aside>
        </el-container>
      </el-container>
    </div>



  </div>
</template>

<script setup>
import axios from 'axios'
import request from "@/utils/request";
import {User, Iphone, Location, Tickets, OfficeBuilding,} from '@element-plus/icons-vue';
import store from "@/store";
import Criterion from "./Criterion.vue"
const {host,session} = store.state ;

</script>

<style lang="scss" scoped>

</style>
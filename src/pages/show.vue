<template>
  <div class="all">
    <el-row :gutter="20">
      <el-col>
        <div v-if="shopid==6">蜜蜂自习室Max(印象城二店)</div>
        <div v-else>蜜蜂自习（印象城店）</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple first">
          <div class="roomName">
            <button @click="getdata"> chaxun </button>
          </div>
          <span>show</span>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Utils from '../utils/api'
 /* import user from './user/Users'  */
  /*  import {
    dataList
  } from 'H:/bumblebee/bumblebee/src/pages/user/Users.vue'   */
  export default {
   /*  components:{user}, */
    data() {
      return {
        shopid: sessionStorage.getItem('shopid'),
        date:sessionStorage.getItem('date')
      }
    },
    methods: {
 /* getdata(){
   setTimeout(() => {
      const llist=this.$refs.user.dataList();
        console.log(llist)
   }, 100); */
      /*  getdata(){
         const res=Utils.$emit('demo','')
         console.log(res)
       } */
      
    },
    created:{
     
    }
  }

</script>

<style lang="less" scoped>
  .all {
    width: 100%;
    height: 100%;
    background-color: aqua;
  }

  .bg-purple {
    border: 1px solid black;
    width: 40vw;
    height: 40vh;
  }

</style>

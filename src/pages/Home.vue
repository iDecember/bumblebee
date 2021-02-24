<template>

  <!--  <el-button type="info" @click="logout">退出</el-button> -->

  <el-container class="home-container">
    <el-header>
      <div class="logo">
        <img src="../assets/logo2.png" alt="">
        <!-- <span>蜜蜂自习</span> -->
      </div>
      <div style="width:90vm;text-align:right">
      <span style="font-weight:bold;font-familt:'微软雅黑'">{{name}}</span>
      <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class='toggle-button' @click='toggleCollapse'>|||</div>

        <el-menu :default-active="activePath" class="el-menu-vertical-demo" :collapse='isCollapse'
          background-color="#545c64" text-color="#fff"  :router='true' active-text-color="#fff" :collapse-transition='false' >
          <!-- 一级菜单 -->
          <el-menu-item v-for="(item,index) in menus" :key='index' :index=item.index @click="saveNavState(item.index)">
            <!-- 图标 -->
              <i class="el-icon-location"></i>
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 文本 -->
              <span>{{item.name}}</span>
            </template>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-main>
         <keep-alive>
           <!-- 路由占位符 -->
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data(){
      
      return{
        
        name:sessionStorage.getItem('name'),
        menus:[
          {name:'门店选择',index:'./shopInfo',icon:'el-icon-location'},
          {name:'账目管理',index:'./bills',icon:'el-icon-location'}
        ],
        
        //是否折叠
        isCollapse:false,
        //激活链接
        activePath:''
      }
      
    },

    created(){
    this.activePath=window.sessionStorage.getItem('activePath')
    },
    methods:{
      logout(){
        window.sessionStorage.clear()
        this.$router.push('login').catch(data=>{})
      },
      //点击切换 菜单折叠展开
      toggleCollapse(){
        this.isCollapse=!this.isCollapse
      },
      /*  保存连接的激活状态*/
      saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath=activePath
      }
          }
    
  }

</script>

<style lang="less" scoped>
  .el-header {
    background-color: #FDBB0D;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
  }

  .el-aside {
    background-color: #545C64;
  }

  .el-main {
    background-color: pink;
  }

  .home-container {
    height: 100%;
  }

  img {
    width: 180px;
    height: 60px;
  }
.toggle-button{
  background-color: #333744;
  font-size: 10px;
  line-height:24px;
  color:rgb(35, 17, 100);
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

}
</style>

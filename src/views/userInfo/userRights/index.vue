<template>
  <!--用户权限-->
  <div class="user-rights">
    <el-row>
      <el-col :xs="6" :md="6" :lg="6" :xl="4" class="chart-col">
        <user-info-rights-list class="rights-list" />
      </el-col>
      <el-col :xs="18" :md="18" :lg="18" :xl="18" class="chart-col">
        <rights-info></rights-info>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    userInfoRightsList: () => import("./components/userInfoRightsList.vue"), //树形菜单
    rightsInfo: () => import("./components/rightsInfo"), //详细信息
  },
 
};
</script>


<style lang="scss" scoped>
.user-rights {
  width: 100%;
  height: 100%;
  margin-top: 50px;
  .rights-list {
    margin: 0 auto;
  }
}
</style>
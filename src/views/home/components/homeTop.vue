<template>
  <div class="home-top">
    <!--近三月的所有用户活跃度-->
    <el-row>
      <el-col :xs="24" :md="24" :lg="12" :xl="12" class="chart-col">
        <el-card class="box-card">
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </el-card>
      </el-col>

      <!-- 累计注册用户：当月活跃用户 -->
      <el-col :xs="24" :md="24" :lg="12" :xl="12" class="chart-col">
        <el-card class="box-card">
          <ve-pie :data="pieData" :settings="chartSettings"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["pieData", "chartData", "chartSettings"],
};
</script>

<style lang="scss" scoped>
.home-top {
  .chart-col {
    // margin: 15px;
  }
  .box-card{
    // border: 1px solid red;
    // border-radius: 5px;
    margin: 10px;
  }
}
</style>
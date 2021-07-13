<template>
  <div class="home-center">
    <el-row>
      <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
        <el-card class="box-card">
          <div class="card-top">
            <span class="title">当前总注册人数</span>
          </div>
          <div class="card-btm">
            <span class="num">{{ countCurrentRegUser }}</span>
            <span class="trend">
              <el-tooltip
                class="item"
                effect="dark"
                :content="'比上个月多注册' + currentMonthRegUser + '个'"
                placement="top-start"
              >
                <span class="trend"
                  ><i class="el-icon-top"></i
                  ><i>{{ currentMonthRegUser }}</i></span
                >
              </el-tooltip>
            </span>
            <el-progress
              type="circle"
              :percentage="countMonthAndCountRegUser"
            ></el-progress>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
        <el-card class="box-card">
          <div class="card-top">
            <span class="title">当天在线人数</span>
          </div>
          <div class="card-btm">
            <span class="num">5</span>
            <span class="trend">
              <el-tooltip
                class="item"
                effect="dark"
                :content="'比上个月多注册' + currentMonthRegUser + '个'"
                placement="top-start"
              >
                <span class="trend"
                  ><i class="el-icon-top"></i
                  ><i>{{ currentMonthRegUser }}</i></span
                >
              </el-tooltip>
            </span>
            <el-progress
              type="circle"
              :percentage="countMonthAndCountRegUser"
            ></el-progress>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
        <el-card class="box-card">
          <div class="card-top">
            <span class="title">当前插件总数</span>
          </div>
          <div class="card-btm">
            <span class="num">5</span>
            <span class="trend"><i class="el-icon-top"></i><i>10</i></span>
            <el-progress type="circle" :percentage="10"></el-progress>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
        <el-card class="box-card">
          <div class="card-top">
            <span class="title">当前总注册人数</span>
          </div>
          <div class="card-btm">
            <span class="num">5</span>
            <span class="trend"><i class="el-icon-top"></i><i>10</i></span>
            <el-progress type="circle" :percentage="10"></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["countCurrentRegUser", "currentMonthRegUser"],
  watch: {
    countMonthAndCountRegUser(newVal) {
      console.log(newVal, "newVal");
    },
  },
  computed: {
    /**计算当月注册人数与总注册人数的差值 */
    countMonthAndCountRegUser() {
      return (
        (this.currentMonthRegUser / this.countCurrentRegUser).toFixed(2) * 100
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.home-center {
  .chart-col {
    // margin: 15px;
  }
  .el-card {
    margin: 10px;
    .card-top {
      margin-bottom: 10px;
      .title {
        font-size: 16px;
        font-weight: 700;
      }
    }

    .card-btm {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .num {
        border-left: 2px solid red;
        padding-left: 5px;
        font-size: 22px;
      }
    }
  }
}
</style>
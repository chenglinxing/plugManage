<template>
  <div class="home-index">
    <!--头部数据-->
    <home-top
      :pieData="pieData"
      :chartData="chartData"
      :chartSettings="chartSettings"
    />
    <!--中间数据-->
    <home-center
    class="home-center"
      :countCurrentRegUser="countCurrentRegUser"
      :currentMonthRegUser="currentMonthRegUser"
    />
  </div>
</template>

<script>
/*eslint-disable*/
import { getActiveUser, getCountRegUser } from "@api/index";

export default {
  components: {
    homeTop: () => import("./components/homeTop"), //头部数据组件
    homeCenter: () => import("./components/homeCenter"), //中间数据组件
  },
  data() {
    //折线图 => 近三月的所有用户活跃度
    this.chartSettings = {
      yAxisName: ["           用户活跃数量"], //y轴名称
      // xAxisName: ["日期"], //x轴名称
    };
    //饼图 => 用户累计注册总数：用户当月注册总数
    this.pieSettings = {};
    return {
      //折线图 => 近三月的所有用户活跃度
      chartData: {
        columns: ["month", "用户活跃数量"],
        rows: [],
      },

      //饼图 => 用户累计注册总数：用户当月注册总数
      pieData: {
        columns: ["label", "count"],
        rows: [
          { label: "用户累计注册总数", count: null },
          { label: "用户当月注册总数", count: null },
        ],
      },
      countCurrentRegUser: 0, //当前注册的总人数
      currentMonthRegUser: 0, //当月注册的总人数
    };
  },

  methods: {
    /**获取近三月所有的活跃用户数量 */
    async initActiveUser() {
      const data = await getActiveUser();
      if (data.code == 200) {
        this.chartData.rows = data.data;
      }
    },

    /**用户累计注册总数：用户当月注册总数 */
    async getCountRegUser() {
      const data = await getCountRegUser();
      if (data.code == 200) {
        //赋值饼图
        this.pieData.rows[0].count = data.data[0].countAll;
        this.pieData.rows[1].count = data.data[0].currentMonth;
        //赋值注册总人数
        this.countCurrentRegUser = data.data[0].countAll;
        //赋值当月注册总人数
        this.currentMonthRegUser = data.data[0].currentMonth;
      }
    },
  },
  created() {
    this.initActiveUser();
    this.getCountRegUser();
  },
};
</script>

<style lang="scss" scoped>
.home-index {
  box-sizing: border-box;
  .chart-col {
    margin: 15px;
  }

  .el-card {
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

  .home-center{
    margin-top: 1.5vh;
  }
}
</style>
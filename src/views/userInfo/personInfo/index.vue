<template>
  <div class="person-info">
    <el-tabs
      :tab-position="tabPosition"
      style="height: 600px"
      @tab-click="tabClick"
      v-model="currentTabsName"
      class="tabs"
    >
      <el-tab-pane label="基本信息" name="basicInfo">
        <basic-info />
      </el-tab-pane>
      <el-tab-pane label="权限信息" name="configInfo">
        <config-info />
      </el-tab-pane>
      <el-tab-pane label="邮件配置" name="mailConfig">
        <mail-config />
      </el-tab-pane>
      <el-tab-pane label="系统信息" name="roleManagement">
        <role-management />
      </el-tab-pane>
    </el-tabs>

    <!-- <el-button @click="callCamera">开启摄像头</el-button> -->
    <!-- <el-button @click="changeDevice" style="margin-right: 10px"
      >切换摄像头</el-button
    >
    <el-button @click="closeCamera">关闭摄像头</el-button>
    <canvas ref="canvas" width="640" height="480"></canvas> -->
    <!-- <video ref="video" width="640" height="480" autoplay></video> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfoByUserId } from "@api/user";
export default {
  components: {
    basicInfo: () => import("./components/basicInfo"), //基本信息
    configInfo: () => import("./components/configInfo"), //权限信息
    roleManagement: () => import("./components/roleManagement"), //角色管理
    mailConfig: () => import("./components/mailConfig"), //邮件配置
  },
  data() {
    return {
      tabPosition: "left",
      currentTabsName: "basicInfo",
      videoArr: [], //所有的摄像头,也可以加入音频设备
      modelSel: "", //当前使用的摄像头
      myInterval: null,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    tabClick(tab) {
      this.currentTabsName = tab.name;
    },

    /**根据userId获取用户信息 */
    async init() {
      const { data } = await getUserInfoByUserId(this.userInfo.userId);
      this.$store.commit("getUserInfo", data);
      console.log(data, "用户信息");
    },

    /*开启摄像头*/
    // callCamera() {
    //   navigator.mediaDevices
    //     .getUserMedia({
    //       video: true,
    //     })
    //     .then((success) => {
    //       this.$refs["video"].srcObject = success;
    //       this.$refs["video"].play();
    //     })
    //     .catch((error) => {
    //       console.error("摄像头开启失败，请检查摄像头是否可用！");
    //     });
    // },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.person-info {
  width: 100%;
  height: 100%;
  margin: 20px;
}
.el-tabs {
  width: 90%;
  .el-tab-pane {
    margin-left: 80px;
  }
}
</style>
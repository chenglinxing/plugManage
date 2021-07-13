<template>
  <div class="layout">
    <pe-header />

    <div class="container-menu">
      <pe-aside
        class="pe-aside"
        :menuList="menuList"
        :menuLoading="menuLoading"
      />

      <div class="content">
        <el-scrollbar class="main" style="height: 100%">
          <!--导航栏-->

          <transition name="out" mode="out-in">
            <router-view />
          </transition>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>


<script>
import { getUserRights } from "@api/user.js";
export default {
  components: {
    PeHeader: () => import("./Header"),
    PeAside: () => import("./Aside"),
  },
  data() {
    return {
      isCollapse: false,
      menuList: [], //菜单 数据处理过
      currentMenuList: [], //数据未处理 只存path
      menuLoading: true, //菜单加载
    };
  },
  watch: {
    // $route(to, from) {
    //   console.log(to, from, this.menuList);
    //   let flag = this.currentMenuList.includes(to.path);
    //   console.log(flag, "fffffffff");
    //   if (!flag) {
    //     this.$router.replace("/404");
    //   }
    // },
  },
  methods: {
    async initMenu() {
      const data = await this.$store.dispatch("getUserMenuAction");
      // console.log(data, "dddddddd");
      if (data.toTreeData.length > 0) {
        this.menuList = data.toTreeData;
        this.menuLoading = false;
        let arr = [];
        // console.log(data.data);
        data.data.forEach((i) => {
          arr.push(i.menuPath);
        });
        this.currentMenuList = arr;
        this.$store.commit('getCurrentMenuList',arr)
      }
    },
  },
  created() {
    this.initMenu();
  },
};
</script>

<style lang="scss" scoped>
.container-menu {
  display: flex;
  flex-direction: row;
  .content /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
    box-sizing: border-box;
  }
  .content {
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    display: block;
    width: 100%;
    box-sizing: border-box;
    height: calc(100vh - 60px);
    border-radius: 4px;
  }
}
</style>
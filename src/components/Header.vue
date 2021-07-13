<template>
  <div class="header-index">
    <!--logo 及 后台管理系统名称-->
    <div
      class="left"
      v-show="!isCollapse"
      :class="{ 'left-no-collapse': !isCollapse }"
    >
      <img :src="logoImg" alt="" />
      <span>{{ $t("backManageSystem") }}</span>
    </div>

    <div
      class="left"
      v-show="isCollapse"
      :class="{ 'left-collapse': isCollapse }"
    >
      <img :src="logoImg" alt="" />
    </div>

    <!--折叠菜单 及 面包屑-->
    <div
      class="center"
      :class="{
        'center-no-collapse': !isCollapse,
        'center-collapse': isCollapse,
      }"
    >
      <!--折叠菜单-->
      <div class="collapse">
        <i
          :class="{
            'el-icon-s-unfold': isCollapse,
            'el-icon-s-fold': !isCollapse,
          }"
          type="text"
          @click="handleCollapse"
        ></i>
      </div>

      <!--导航栏--面包屑-->
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!--头部右边-->
    <div class="right">
      <div class="right-operate">
        <i class="el-icon-s-operation" @click="changeLanguage"></i>
        <i class="el-icon-picture-outline-round" @click="jumpOffWebsite"></i>
        <el-tooltip
          class="item"
          effect="dark"
          :content="fullName"
          placement="bottom"
        >
          <i
            :class="'icon iconfont icon-' + fullScreenIcon"
            @click="handleFullScreen"
          ></i>
        </el-tooltip>

        <el-badge is-dot class="item">
          <i class="el-icon-chat-line-round" type="text"></i>
        </el-badge>
      </div>
      <!--退出登录-->
      <div class="out-login">
        <el-avatar
          :src="avatarSrc"
          v-if="avatarSrc.includes('uploadFile')"
        ></el-avatar>
        <el-avatar :icon="avatarSrc" v-else></el-avatar>
        <el-dropdown @command="handleCommand" size="small">
          <span class="el-dropdown-link">
            {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">用户信息</el-dropdown-item>
            <hr />
            <el-dropdown-item command="out">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@api/baseUrl";
export default {
  data() {
    return {
      isCollapse: false,
      userName: localStorage.getItem("userName"),
      logoImg: require("../assets/images/logo6.png"),
      fullScreenIcon: "amplification",
      fullName: "全屏",
      isfullScreen: true, //是否全屏 默认false
    };
  },
  computed: {
    avatarSrc() {
      let fileName = this.$store.state.userInfo.fileNewName;
      return !fileName
        ? "el-icon-user-solid"
        : `${baseUrl}/uploadFile/${fileName}`;
    },
  },
  watch: {
    imgName(newVal, oldVal) {
      console.log(newVal, oldVal, "ppppppppp");
    },
  },
  methods: {
    //点击折叠
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$bus.$emit("isCollapse", this.isCollapse);
    },

    /**退出登录 */
    handleCommand(command) {
      let out = command == "out";
      if (out) {
        this.$router.push("/login");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.removeItem("loginStatus");
        window.localStorage.removeItem("vuex");
        //修改登录状态
        this.$store.commit("getLoginStatus", false);
        this.$store.commit("getUserMenu", []);
        this.$store.commit("getCurrentMenuList", []);
        this.$store.commit("getUserInfo", {});
      } else {
        this.$router.push("personInfo");
      }
    },

    /**跳转官网 */
    jumpOffWebsite() {
      this.$router.push("/offWebsite");
    },

    /**切换语言 */
    changeLanguage() {
      this.$i18n.locale = this.$i18n.locale == "en" ? "zh" : "en";
    },

    /**放大缩小 */
    handleFullScreen() {
      //默认提示全屏
      if (this.fullScreenIcon == "amplification") {
        this.fullScreenIcon = "suoxiao";
        this.fullName = "缩小";
      } else {
        this.fullScreenIcon = "amplification";
        this.fullName = "全屏";
      }

      if (this.isfullScreen) {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        this.isfullScreen = false;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.isfullScreen = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-index {
  height: 50px;
  width: 100%;
  color: #fff;
  background-color: #001529;
  display: flex;
  align-items: center;
  .collapse {
    margin: 30px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }

  .left {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left-collapse {
    flex: 70px;
    margin: 0 auto;

    img {
      height: 30px;
      width: 70px;
      width: 70px !important;
    }
  }

  .left-no-collapse {
    flex: 200px;
    display: flex;
    justify-content: space-around;
    img {
      height: 30px !important;
      width: 70px;
    }
    span {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      color: #fff;
    }
  }

  .center {
    height: inherit;
    display: flex;
    align-items: center;
    color: #fff;
  }

  .center-no-collapse {
    flex: calc(100% - 500px);
  }

  .center-collapse {
    flex: calc(100% - 370px);
  }

  .right {
    flex: 300px;
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .right-operate {
      i {
        font-size: 20px;
        margin: 0 5px;

        cursor: pointer;
      }
    }
    .out-login {
      margin-right: 20px;
      @include flex;
      .el-dropdown {
        margin-left: 0.5rem;
      }
    }
  }

  /deep/.el-breadcrumb {
    .el-breadcrumb__inner {
      color: #fff !important;
    }
  }
}

/deep/ .el-dropdown-menu__item {
  padding: 0 20px;
  cursor: pointer;
}


.el-badge {
  width: 20px;
  height: 21px;
}
</style>
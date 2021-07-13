<template>
  <div class="aside">
    <el-menu
      :default-active="onRoutes"
      router
      :collapse="isCollapse"
      @select="selectMenu"
      
      background-color="#001529"
      text-color="#fff"
      :menuLoading="menuLoading"
    >
      <template v-for="(item, i) in menuList">
        <!--一级菜单-->
        <template v-if="!item.children">
          <el-menu-item :index="item.menuPath" :key="i">
            <i :class="item.menuIcon ? item.menuIcon : ''"></i>
            <span slot="title">{{ item.menuName }}</span>
          </el-menu-item>
        </template>

        <template v-else>
          <el-submenu :index="item.menuPath" :key="i">
            <template slot="title">
              <i :class="item.menuIcon ? item.menuIcon : ''"></i>
              <span slot="title">{{ item.menuName }}</span>
            </template>
            <self-Menu :menu-list="item.children" />
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: "self-Menu",
  props: {
    menuList: Array,
    menuLoading:Boolean
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {
    this.$bus.$on("isCollapse", (res) => {
      this.isCollapse = res;
    });
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("./", "");
    },
  },
  methods: {
    selectMenu(index, path) {
      // console.log(index, path);
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  background-color: #001529 !important;
  color: #111;
  /**设置el-menu的默认宽度 */
  .el-menu {
    width: 200px;
  }
  /**设置当菜单折叠起来的宽度 */
  .el-menu--collapse {
    width: 70px;
  }
}
.el-menu-item {
  background-color: #fff;
}

/deep/.el-submenu__title {
  padding: 0px 15px !important;
}

/deep/ .el-submenu {
  .el-menu--inline {
    .el-menu-item {
      i {
        padding-left: 15px !important;
      }
    }

    .el-submenu {
      i {
        padding-left: 15px !important;
      }
      .el-menu--inline {
        i {
          padding-left: 30px !important;
        }
        .el-menu-item {
          i {
            padding-left: 45px !important;
          }
        }
      }
    }
  }
}
.el-menu-item {
  padding: 0 15px !important;
}

.el-menu--collapse {
  .el-menu-item {
    /deep/.el-tooltip {
      padding: 0 !important;
      i {
        padding: 0 15px !important;
      }
    }
    .el-submenu {
      i {
        padding: 0 15px !important;
      }
    }
  }
}
</style>
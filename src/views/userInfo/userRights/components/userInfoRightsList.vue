<template>
  <div class="user-info-rights">
    <el-tree
      :data="treeData"
      show-checkbox
      node-key="menuId"
      :props="defaultProps"
      :default-checked-keys="defaultCheckedKeys"
      @node-click="nodeClick"
    >
    </el-tree>
  </div>
</template>

<script>
/*eslint-disable*/
import { getMenuDetail } from "@api/user";
export default {
  data() {
    return {
      treeData: this.$store.state.userMenuList, //树形结构的数据
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      defaultCheckedKeys: [1],
      menuDetail: {},
    };
  },

  methods: {
    async init(menuId) {
      const data = await getMenuDetail(menuId);
      if (data.code == 200) {
        this.menuDetail = data.data[0];
      } else {
        this.$message.error("获取菜单信息失败！");
        this.menuDetail = {};
      }
      // console.log(this.menuDetail, "menuDetail");
      this.$bus.$emit("formDataByParent", this.menuDetail);
    },
    /**点击后返回对应菜单信息  由于改变后对原数据发生改变，在不用深拷贝的情况下  根据menuId去调接口 */
    async nodeClick(obj, node, i) {
      // console.log(obj, node, i);
      this.init(obj.menuId);
    },
  },
  created() {
    //默认menuId=1
    let menuId = 1;
    this.init(menuId);
  },
};
</script>

<style lang="scss" scoped>
@mixin bs {
  box-sizing: border-box;
}

.user-info-rights {
  width: 100%;
  height: 100%;

}
</style>
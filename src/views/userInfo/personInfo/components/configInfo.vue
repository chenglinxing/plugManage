<template>
  <!-- 权限信息 -->
  <div class="config-info">
    <el-form :model="formData" size="small" label-width="110px">
      <el-form-item label="权限：">
        <el-input :value="formData.userRights | rights" disabled></el-input>
      </el-form-item>

      <el-form-item label="用户是否注销：">
        <el-input :value="formData.isDel | isDel" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  filters: {
    /**权限 */
    rights(res) {
      let rightsList = [
        { key: "1", label: "超级管理员" },
        { key: "2", label: "管理员" },
        { key: "3", label: "普通用户" },
      ];
      let right = rightsList.filter((i) => {
        if (i.key == res) {
          return i.label;
        }
      });
      return right[0].label;
    },

    /**用户是否注销 */
    isDel(res) {
      return res == null ? "否" : Number(res) == 1 ? "是" : "否";
    },
  },
  created() {
    this.formData = this.userInfo;
  },
};
</script>

<style lang="scss" scoped>
.config-info {
  .el-form {
    .el-input {
      width: 30%;
    }
  }
}
</style>
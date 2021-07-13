<template>
  <!--邮件配置-->
  <div class="maile-config">
    <el-form :model="formData" size="small" label-width="100px">
      <el-form-item label="用户邮箱：">
        <el-input v-model="formData.userEmail" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      formData: {}, //用户信息
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.formData = this.userInfo;
  },
};
</script>

<style lang="scss" scoped>
.maile-config {
  .el-form {
    .el-input {
      width: 30%;
    }
  }
}
</style>
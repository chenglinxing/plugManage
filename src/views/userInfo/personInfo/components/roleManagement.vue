<template>
  <!--系统信息-->
  <div class="role-management">
    <el-form :model="formData" size="small" label-width="100px">
      <el-form-item label="用户名：">
        <el-input v-model="formData.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱：">
        <el-input v-model="formData.userEmail" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input
          :value="formData.registerTime | dateFormat"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input
          :value="formData.lastLoginTime | dateFormat"
          disabled
        ></el-input>
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
  filters: {
    dateFormat(msg) {
      return msg.substring(0, 10);
    },
  },
  created() {
    this.formData = this.userInfo;
  },
};
</script>

<style lang="scss" scoped>
.role-management {
  .el-form {
    .el-input {
      width: 30%;
    }
  }
}
</style>
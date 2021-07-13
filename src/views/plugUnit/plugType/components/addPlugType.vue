<template>
  <!--添加插件-->
  <div class="add-plug">
    <el-form
      :model="addPlugForm"
      ref="addPlugForm"
      size="small"
      label-width="110px"
      class="add-plug-form"
    >
      <el-form-item
        label="插件类型名称"
        prop="plugTypeName"
        :rules="[{ required: true, message: '请输入正确的插件类型名称' }]"
      >
        <el-input
          clearable
          v-model="addPlugForm.plugTypeName"
          placeholder="请输入插件类型名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="插件类型描述"
        prop="plugTypeDes"
        :rules="[{ required: true, message: '请输入插件类型描述' }]"
      >
        <el-input
          clearable
          v-model="addPlugForm.plugTypeDes"
          type="textarea"
          maxlength="200"
          show-word-limit
          placeholder="请输入插件类型描述"
          :autosize="{ minRows: 4, maxRows: 4 }"
        ></el-input>
      </el-form-item>
    </el-form>

    <!--操作-->
    <div class="btn-operate">
      <el-button type="primary" @click="determine('addPlugForm')"
        >确定</el-button
      >
      <el-button type="primary" @click="cancelPlugForm('addPlugForm')"
        >取消</el-button
      >
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { dateFormat } from "@u/dateFormat.js";
import { insertPlugType, updatePlugInfoById } from "@api/plug.js";
import throttle from "lodash.throttle";
export default {
  props: ["plugTypeList", "updateFormData", "operateStatus"],
  data() {
    return {
      addPlugForm: {
        plugTypeName: "", //插件类型名
        plugTypeDes: "", //插件类型描述
        userId: localStorage.getItem("userId"), //当前登录用户
      },
    };
  },
  methods: {
    /**点击确定 */
    determine: throttle(function (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          /**新增 */
          if (this.operateStatus == 0) {
            const data = await insertPlugType(this.addPlugForm);
            if (data.code == 200) {
              this.$message.success(data.msg);
              //清空表单
              this.$refs[formName].resetFields();
              //关闭页面
              this.$emit("closePlugDialog", "success");
            }
          } else {
            /**修改 */
            const data = await updatePlugInfoById(this.addPlugForm);
            if (data.code == 200) {
              this.$message.success(data.msg);
              //清空表单
              this.$refs[formName].resetFields();
              //关闭页面
              this.$emit("closePlugDialog", "success");
            } else {
              this.$message.error("修改失败！");
            }
          }
        } else {
          this.$message.error("存在必填项！");
          return false;
        }
      });
    }, 2000),

    /**点击取消 */
    cancelPlugForm(formName) {
      //清空表单
      this.$refs[formName].resetFields();
      //关闭页面
      this.$emit("closePlugDialog", "cancel");
    },
  },
  created() {
    /**判断状态是否为修改 */
    if (this.operateStatus == 1) {
      this.addPlugForm = this.updateFormData;
    }
    //存状态
    this.addPlugForm.status = this.operateStatus;
  },
};
</script>

<style lang="scss" scoped>
.add-plug {
  .add-plug-form {
    .el-input,
    .el-textarea {
      width: 80%;
    }
  }

  .btn-operate {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
<template>
  <!--添加插件-->
  <div class="add-plug">
    <el-form
      :model="addPlugForm"
      ref="addPlugForm"
      size="small"
      label-width="100px"
      class="add-plug-form"
    >
      <el-form-item
        label="插件名称"
        prop="plugName"
        :rules="[{ required: true, message: '请输入正确的插件名称' }]"
      >
        <el-input
          clearable
          v-model="addPlugForm.plugName"
          placeholder="请输入插件名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="插件链接"
        prop="plugLink"
        :rules="[
          {
            required: true,
            message: '请输入正确的插件链接',
            pattern:
              '^((https?|ftp|news):\\/\\/)?([a-z]([a-z0-9\\-]*[\\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\\/[a-z0-9_\\-\\.~]+)*(\\/([a-z0-9_\\-\\.]*)(\\?[a-z0-9+_\\-\\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$',
          },
        ]"
      >
        <el-input
          clearable
          v-model="addPlugForm.plugLink"
          placeholder="请输入插件链接http://xx.xx"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="插件类型"
        prop="plugTypeId"
        :rules="[
          {
            required: true,
            message: '请输入插件类型',
          },
        ]"
      >
        <el-select v-model="addPlugForm.plugTypeId">
          <el-option
            v-for="(item, index) in plugTypeList"
            :key="index"
            :label="item.plugTypeName"
            :value="item.plugTypeId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="插件描述"
        prop="plugDes"
        :rules="[{ required: true, message: '请输入插件描述' }]"
      >
        <el-input
          clearable
          v-model="addPlugForm.plugDes"
          type="textarea"
          maxlength="200"
          show-word-limit
          placeholder="请输入插件描述"
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
import { insertPlug, updatePlugById } from "@api/plug.js";
import throttle from "lodash.throttle";
export default {
  props: ["plugTypeList", "updateFormData", "operateStatus"],
  data() {
    return {
      addPlugForm: {
        plugName: "", //插件名
        plugLink: "", //插件链接
        plugDes: "", //插件描述
        // insertPlugDate: dateFormat(new Date(), "YYYY-mm-dd HH:MM:SS"), //插件添加日期
        userId: localStorage.getItem("userId"), //当前登录用户
        plugTypeId: 2, //插件类型
        status: null,
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
            const data = await insertPlug(this.addPlugForm);
            if (data.code == 200) {
              this.$message.success(data.msg);
              //清空表单
              this.$refs[formName].resetFields();
              //关闭页面
              this.$emit("closePlugDialog", "success");
            }
          } else {
            /**修改 */
            const data = await updatePlugById(this.addPlugForm);
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
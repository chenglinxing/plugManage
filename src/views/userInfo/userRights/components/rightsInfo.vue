<template>
  <div class="rights-info">
    <el-form
      :model="formData"
      label-position="left"
      size="small"
      label-width="130px"
      ref="formData"
      class="formData"
    >
      <el-form-item
        prop="menuName"
        label="菜单名称："
        :rules="[{ required: true, message: '菜单名称必填' }]"
      >
        <el-input v-model="formData.menuName"></el-input>
      </el-form-item>

      <el-form-item prop="menuPath" label="菜单路径：">
        <el-input v-model="formData.menuPath" disabled></el-input>
      </el-form-item>

      <el-form-item
        prop="menuIcon"
        label="菜单图标："
        :rules="[{ required: true, message: '菜单图标必填' }]"
      >
        <el-input v-model="formData.menuIcon"></el-input>
      </el-form-item>

      <el-form-item prop="isIncludedChildMenu" label="是否包含子菜单：">
        <el-select v-model="formData.isIncludedChildMenu" disabled>
          <el-option
            v-for="(item, index) in isTrueList"
            :key="index"
            :label="item.label"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        prop="menuRights"
        label="菜单权限："
        :rules="[{ required: true, message: '菜单权限必填' }]"
      >
        <el-select v-model="formData.menuRights" multiple placeholder="请选择">
          <el-option
            v-for="(item, index) in userRightList"
            :key="index"
            :label="item.rightName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="操作：">
        <el-button
          class="determine-btn"
          type="primary"
          size="small"
          @click="determine('formData')"
          >确定修改</el-button
        >
      </el-form-item>
    </el-form>

    <!-- <el-upload action="#" list-type="picture-card" :http-request="httpRequest">
      <i class="el-icon-plus"></i>
    </el-upload> -->
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog> -->

    <!-- <el-button @click="download">下载</el-button> -->
  </div>
</template>

<script>
import { updateMenuDetail, uploadFile, downloadTest } from "@api/user";
import throttle from "lodash.throttle";
import { baseUrl } from "@api/baseUrl";
export default {
  data() {
    return {
      formData: {
        menuName: "", //菜单名
        menuPath: "", //菜单路径
        menuIcon: "", //菜单Icon
        isIncludedChildMenu: null, //是否包含子菜单
        menuRights: "", //菜单权限
      },
      //假设前端的用户角色写死
      userRightList: [
        { id: "1", rightName: "超级管理员" },
        { id: "2", rightName: "管理员" },
        { id: "3", rightName: "普通用户" },
      ],
      isTrueList: [
        { key: 0, label: "是" },
        { key: 1, label: "否" },
      ],
      imgSrc: null,
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  //   computed: {
  //     imageSrc() {
  //       return `${baseUrl}/upload_tmp/${this.imgSrc}`;
  //     },
  //   },
  methods: {
    /**修改 */
    determine: throttle(function (formName) {
      console.log(this.formData, "修改");
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data, code, msg } = await updateMenuDetail(this.formData);
          if (code == 200) {
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        } else {
          this.$message.error("请输入必填项！");
          return false;
        }
      });
    }, 2000),

    // /**文件上传 */
    // async httpRequest(params) {
    //   let { file } = params;
    //   const formData = new FormData();
    //   formData.append("fileName", file);
    //   const data = await uploadFile(formData);
    //   this.imgSrc = data;
    //   this.dialogVisible = true;
    // },

    // async download() {
    //   const data = await downloadTest();
    //   this.imgSrc = data;
    //   //   window.location.href = `${baseUrl}/upload_tmp/EMMA MC平台-IT项目计划V1.xlsx`;
    // },
  },
  created() {
    //赋默认值
    this.formData = this.$store.state.userMenuList[0];
    this.$bus.$on("formDataByParent", (res) => {
      if (!Array.isArray(res.menuRights)) {
        res.menuRights = res.menuRights.split(",");
        this.formData = res;
      } else {
        this.formData = res;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.rights-info {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  border-left: 3px solid #ccc;
  .formData {
    .el-input,
    .el-select {
      width: 60%;
    }
  }
}
</style>
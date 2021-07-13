<template>
  <!--基本信息-->
  <div class="basic-info">
    <el-form :model="formData" size="small" label-width="110px">
      <el-form-item label="用户名：">
        <el-input v-model="formData.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱：">
        <el-input v-model="formData.userEmail" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册时间：">
        <el-input
          :value="formData.registerTime | dateFormat"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="最后登录时间：">
        <el-input
          :value="formData.lastLoginTime | dateFormat"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="用户头像：">
        <el-upload
          class="avatar-uploader"
          action="#"
          :http-request="httpRequest"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <el-button @click="handlePreview" v-show="showPreviewBtn" type="primary"
          >预览</el-button
        >

        <el-button @click="updateAvatar" v-show="showPreviewBtn"
          >上传头像</el-button
        >

        <el-button @click="downloadFile" v-show="showPreviewBtn" type="primary"
          >下载头像</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="previewImage">
      <img width="100%" height="20%" :src="imageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl } from "@api/baseUrl";
import { mapState } from "vuex";
import {
  uploadFile,
  previewFile,
  uploadAvatar,
  downloadAvatar,
} from "@api/upload";
export default {
  data() {
    return {
      formData: {}, //用户信息
      imageUrl: "",
      previewImage: false,
      showPreviewBtn: false, //默认隐藏预览按钮
      fileId: "", //文件的二进制名称
      currentFileId: "", //判断上传后的fileId是否相同  如果相同则提示图片重复上传
      currentFileNameCN: "", //当前图片的名称
    };
  },
  computed: {
    ...mapState(["userInfo", "userId"]),
  },
  filters: {
    dateFormat(msg) {
      return msg.substring(0, 10);
    },
  },
  methods: {
    /**上传之前 */
    beforeAvatarUpload(file) {
      console.log(file);
      let { name, size } = file;
      let nameArr = name.split(".");
      //文件后缀名
      let fileType = nameArr[nameArr.length - 1];
      //文件大小
      let fileSize = (size / 1024 / 1024).toFixed(4);
      console.log(fileType, fileSize);
      //文件大小不超过2M且格式必须是jpg/png
      let fileTypeList = ["jpg", "png"];
      if (!(fileSize > 2 || fileTypeList.includes(fileType))) {
        this.$message.error("文件类型只能为jpg或png且文件大小不能超过2M");
        return false;
      }
    },

    /**上传文件 及 预览*/
    async httpRequest(params) {
      const { file } = params;
      // console.log(
      //   this.beforeAvatarUpload(file),
      //   "this.beforeAvatarUpload(file)"
      // );
      // if (!this.beforeAvatarUpload(file)) {
      //   return;
      // }
      let { name, size } = file;
      let nameArr = name.split(".");
      //文件后缀名
      let fileType = nameArr[nameArr.length - 1];
      //文件大小
      let fileSize = (size / 1024 / 1024).toFixed(4);
      console.log(fileType, fileSize);
      //文件大小不超过2M且格式必须是jpg/png
      let fileTypeList = ["jpg", "png"];
      if (!(fileSize > 2 || fileTypeList.includes(fileType))) {
        this.$message.error("文件类型只能为jpg或png且文件大小不能超过2M");
        return false;
      }
      const formData = new FormData();
      formData.append("file", file);
      const fileData = await uploadFile(formData);
      let { filename, fileNameCN, originalname } = fileData;
      //返回的fileId 用于上传时用
      this.fileId = filename;
      //用于下载时的文件名
      this.currentFileNameCN = fileNameCN || originalname;
      const { data } = await previewFile(filename);
      this.imageUrl = `${baseUrl}/uploadFile/${data.fileNewName}`;
      //显示预览 上传 下载 按钮
      this.showPreviewBtn = true;
    },

    /**预览图片 */
    handlePreview() {
      this.previewImage = true;
    },

    /**上传头像 上传成功则用户头像*/
    async updateAvatar() {
      let params = {
        fileId: this.fileId,
        userId: this.userInfo.userId,
      };
      const { code, msg } = await uploadAvatar(params);
      if (code == 200) {
        this.$message.success(msg);
        this.$parent.$parent.$parent.init();
      } else {
        this.$message.error(msg);
      }
    },

    /**下载头像 */
    async downloadFile() {
      const data = await downloadAvatar(this.fileId);
      let a = document.createElement("a");
      a.download = this.currentFileNameCN;
      a.style.display = "none";
      let blob = new Blob([data]);
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.click();
      window.URL.revokeObjectURL(url);
    },
  },
  created() {
    //获取用户信息
    this.formData = this.userInfo;
    this.fileId = this.userInfo.fileId;
    this.currentFileNameCN = this.userInfo.fileNewName;
    //判断是否存在用户图片
    if (this.userInfo.fileId) {
      this.imageUrl = `${baseUrl}/uploadFile/${this.userInfo.fileNewName}`;
      this.showPreviewBtn = true;
    } else {
      this.showPreviewBtn = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.basic-info {
  .el-form {
    .el-input {
      width: 30%;
    }
  }

  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .disabled .el-upload--picture-card {
    display: none !important;
  }
}

/deep/ .el-dialog__headerbtn .el-dialog__close::before {
  color: #aaa;
  font-size: 20px;
  margin-top: 5px;
}
</style>
<template>
  <div class="user-info-list">
    <!--筛选搜索-->
    <el-card class="border-card">
      <div class="div-card card-header">
        <i class="el-icon-search"></i>
        <span class="card-name">筛选搜索</span>
      </div>

      <div class="div-card card-search">
        <el-form
          :model="userForm"
          label-position="left"
          size="small"
          label-width="90px"
          class="plug-form"
          ref="userForm"
        >
          <el-row>
            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <el-form-item prop="userName" label="用户名称：">
                <el-input
                  v-model="userForm.userName"
                  placeholder="请输入用户名称"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <el-form-item prop="userEmail" label="用户邮箱">
                <el-input
                  v-model="userForm.userEmail"
                  placeholder="请输入用户邮箱"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <div class="form-btn">
                <el-button type="primary" @click="searchPlugList"
                  >查询</el-button
                >
                <el-button @click="resetUserForm('userForm')">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>

    <!--数据列表-->
    <el-card>
      <div class="div-card card-header data-list">
        <div class="card-icon-name">
          <i class="el-icon-tickets"></i>
          <span class="card-name">数据列表</span>
        </div>
      </div>
    </el-card>

    <!--查询列表  table数据-->
    <el-table :data="tableData" border v-loading="tableLoading">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="60"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        label="用户名称"
        prop="userName"
        align="center"
      ></el-table-column>

      <el-table-column label="用户密码" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.userPassword" show-password></el-input>
        </template>
      </el-table-column>

      <el-table-column
        label="用户邮箱"
        prop="userEmail"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="table-operate">
            <el-button @click="updateUserInfo(scope.row.userId)"
              >修改</el-button
            >
            <el-button @click="deleteUserInfo(scope.row.userId)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      :page-sizes="psgeSizeArr"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
/*eslint-disable*/
import { dateFormat } from "@u/dateFormat.js";
import { getAllUser } from "@api/user.js";

export default {
  data() {
    return {
      userForm: {
        userName: "", //用户名
        userEmail: "", //用户邮箱
        userId: localStorage.getItem("userId"), //当前登录用户
      }, //表单数据

      tableData: [], //table表格数据
      linkTarget: "", //打开新页面跳转 默认不打开
      linkHref: "", // 打开的链接
      tableLoading: false, //table加载
      total: 0,
      page: {
        currentPage: 1, //当前页码
        pageSize: 5, //当前页的数量
      },
      psgeSizeArr: [5, 10, 20, 50],
      plugTitle: "", //根据添加插件或修改插件决定显示名称
      isShowPlugDialog: false, //是否显示插件的dialog 默认隐藏
      plugTypeList: [], //插件类型 根据接口获取
    };
  },

  methods: {
    /**默认获取10条插件记录 */
    async init() {
      this.tableLoading = true;
      const data = await getAllUser(
        this.userForm.userName,
        this.userForm.userEmail,
        this.page.currentPage,
        this.page.pageSize
      );
      if (data.code == 200) {
        this.tableData = data.data.data;
        this.total = data.data.count;
      } else {
        this.tableData = [];
      }
      this.tableLoading = false;
    },

    /**查询插件列表 */
    searchPlugList() {
      this.page.currentPage = 1;
      this.init();
    },

    /**重置查询内容 */
    resetUserForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**修改用户 */
    updateUserInfo(id) {
      console.log("修改", id);
    },

    /**删除插件 */
    deleteUserInfo(id) {
      console.log("删除", id);
    },

    /**table的索引 */
    indexMethod(index) {
      return index + 1 + (this.page.currentPage - 1) * this.page.pageSize;
    },

    /**分页 = > 改变每页展示数量 */
    sizeChange(size) {
      this.page.pageSize = size;
      this.init();
    },

    /**当前页发生改变  */
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.init();
    },

    /**子组件传入 关闭dialog*/
    closePlugDialog(val) {
      this.isShowPlugDialog = false;
      //如果是添加成功后  关闭dialog则刷新页面 重新获取数据
      if (val == "success") {
        //回到首页
        this.page = {
          currentPage: 1, //当前页码
          pageSize: 5, //当前页的数量
        };
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
@mixin bs {
  box-sizing: border-box;
}
.user-info-list {
  @include bs;
  .el-card {
    margin-bottom: 15px;
    .card-header {
      font-size: 17px;
      margin-bottom: 20px;
    }
  }

  .data-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .plug-form {
    .el-input,
    .el-date-picker {
      width: 80%;
    }

    .form-btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .card-name {
    margin-left: 10px;
  }

  .table-operate {
    box-sizing: border-box;
    padding: 10px 0;
  }

  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
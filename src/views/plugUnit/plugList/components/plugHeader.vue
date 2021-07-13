<template>
  <div class="plug-header">
    <!--筛选搜索-->
    <el-card class="border-card">
      <div class="div-card card-header">
        <i class="el-icon-search"></i>
        <span class="card-name">筛选搜索</span>
      </div>
      <!-- {{ flag }}
      <el-button @click="$emit('update:flag',!flag)">123</el-button> -->
      <div class="div-card card-search">
        <el-form
          :model="plugForm"
          label-position="left"
          size="small"
          label-width="90px"
          class="plug-form"
          ref="plugForm"
        >
          <el-row>
            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <el-form-item prop="plugName" label="插件名称：">
                <el-input
                  v-model="plugForm.plugName"
                  placeholder="请输入插件名称"
                  clearable
                ></el-input>    
              </el-form-item>
            </el-col>

            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <el-form-item prop="plugLink" label="插件链接：">
                <el-input
                  v-model="plugForm.plugLink"
                  placeholder="请输入插件链接"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <el-form-item
                prop="insertPlugDate"
                label="插件添加日期："
                label-width="110px"
              >
                <!-- <el-input v-model="plugForm.insertPlugDate"></el-input> -->
                <el-date-picker
                  v-model="plugForm.insertPlugDate"
                  type="date"
                  placeholder="选择插件添加日期"
                  clearable
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <div class="form-btn">
                <el-button type="primary" @click="searchPlugList"
                  >查询</el-button
                >
                <el-button @click="resetPlugForm('plugForm')">重置</el-button>
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

        <div class="insert-plug">
          <el-button @click="addPlug" type="primary">添加插件</el-button>
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
        label="插件名称"
        prop="plugName"
        align="center"
      ></el-table-column>
      <el-table-column label="插件类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.plugTypeName">{{
            scope.row.plugTypeName
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="插件链接"
        :show-overflow-tooltip="true"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <el-link
            :href="linkHref"
            :target="linkTarget"
            type="primary"
            :underline="false"
            @click="handleLink(scope.row.plugLink)"
            >{{ scope.row.plugLink }}</el-link
          > -->
          <a>{{ scope.row.plugLink }}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="插件添加日期"
        prop="insertPlugDate"
        align="center"
      ></el-table-column>
      <el-table-column
        label="插件描述"
        prop="plugDes"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="table-operate">
            <el-button @click="updatePlug(scope.row.plugId)">修改</el-button>
            <el-button @click="deletePlug(scope.row.plugId)">删除</el-button>
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

    <el-dialog :title="plugTitle" :visible.sync="isShowPlugDialog" width="40%">
      <add-plug
        v-if="isShowPlugDialog"
        @closePlugDialog="closePlugDialog"
        :plugTypeList="plugTypeList"
        :operateStatus="operateStatus"
        :updateFormData="updateFormData"
      />
    </el-dialog>
  </div>
</template>

<script>
/*eslint-disable*/
import { dateFormat } from "@u/dateFormat.js";
import {
  selectPlug,
  getAllPlugType,
  getOnePlug,
  deletePlugById,
} from "@api/plug.js";
import throttle from "lodash.throttle";

export default {
  components: {
    addPlug: () => import("./addPlug"),
  },
  props: {
    flag: Boolean,
  },
  data() {
    return {
      plugForm: {
        plugName: "", //插件名
        plugLink: "", //插件链接
        insertPlugDate: "", //插件添加日期
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
      updateFormData: {}, //点击修改根据plugId获取详情
      operateStatus: 0, //操作状态 默认0 新增  1修改
      timer: null,
    };
  },

  methods: {
    /**默认获取10条插件记录 */
    async init() {
      this.tableLoading = true;
      // this.timer = setInterval(async () => {
      const data = await selectPlug(
        this.plugForm.plugName,
        this.plugForm.plugLink,
        this.plugForm.insertPlugDate,
        this.page.currentPage,
        this.page.pageSize
      );
      if (data.code == 200) {
        this.tableData = data.data.data;
        this.total = data.data.count;
      } else {
        this.tableData = [];
        this.total = this.tableData.length;
      }
      this.tableLoading = false;
      // }, 2000);
    },

    /**查询插件列表 */
    searchPlugList() {
      this.page.currentPage = 1;

      //时间转换
      if (this.plugForm.insertPlugDate) {
        this.plugForm.insertPlugDate = dateFormat(
          new Date(this.plugForm.insertPlugDate),
          "YYYY-mm-dd"
        );
      } else {
        this.plugForm.insertPlugDate = "";
      }

      console.log(this.plugForm);
      this.init();
    },

    /**重置查询内容 */
    resetPlugForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**添加插件 */
    addPlug() {
      this.plugTitle = "新增插件";
      this.isShowPlugDialog = true;
      this.operateStatus = 0;
    },

    /**点击链接  如果当前域名与链接中的域名相同  则直接跳转，否则打开一个链接页面再跳转*/
    handleLink(link) {
      //获取当前页面的域名
      let origin = window.location.origin;
      console.log(link.includes(origin));

      //域名相同则
      if (link.includes(origin)) {
        // this.linkTarget = "_blank";
        // this.linkHref = link;
        return true;
      }
      return false;
    },

    /**修改插件 */
    updatePlug: throttle(async function (id) {
      const data = await getOnePlug(id);
      if (data.code == 200) {
        //获取详情
        this.updateFormData = data.data[0];
        //显示dialog
        this.isShowPlugDialog = true;
        this.plugTitle = "修改插件";
        //操作状态为修改
        this.operateStatus = 1;
      } else {
        this.$message.error("获取插件详情失败");
      }
    }, 2000),

    /**删除插件 */
    deletePlug(id) {
      // console.log("删除", id);
      this.$confirm("是否删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
        callback: async (action) => {
          if (action === "confirm") {
            const data = await deletePlugById(id);
            if (data.code == 200) {
              this.$message.success(data.msg);
              this.init();
            }
          }
        },
      });
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

    /**获取所有的插件类型 */
    async initPlugType() {
      const data = await getAllPlugType();
      this.plugTypeList = data.data;
    },
  },
  created() {
    this.init();
    this.initPlugType();
  },
  // destroyed() {
  //   this.timer = null;
  // },
};
</script>

<style lang="scss" scoped>
@mixin bs {
  box-sizing: border-box;
}
.plug-header {
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
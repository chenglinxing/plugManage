<template>
  <div class="plug-header">
    <!--筛选搜索-->
    <el-card class="border-card">
      <div class="div-card card-header">
        <i class="el-icon-search"></i>
        <span class="card-name">筛选搜索</span>
      </div>

      <div class="div-card card-search">
        <el-form
          :model="plugTypeForm"
          label-position="left"
          size="small"
          label-width="110px"
          class="plug-form"
          ref="plugTypeForm"
        >
          <el-row>
            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <el-form-item prop="plugTypeId" label="插件类型ID：">
                <el-input
                  v-model="plugTypeForm.plugTypeId"
                  placeholder="请输入插件类型ID"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <el-form-item prop="plugTypeName" label="插件类型名称：">
                <el-input
                  v-model="plugTypeForm.plugTypeName"
                  placeholder="请输入插件类型名称"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :md="12" :lg="12" :xl="6" class="chart-col">
              <el-form-item
                prop="addTypeTime"
                label="插件类型添加日期："
                label-width="140px"
              >
                <el-date-picker
                  v-model="plugTypeForm.addTypeTime"
                  type="date"
                  placeholder="请选择插件类型添加日期"
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
                <el-button @click="resetPlugForm('plugTypeForm')"
                  >重置</el-button
                >
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
          <el-button @click="addPlug" type="primary">添加插件类型</el-button>
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
        label="插件类型名称"
        prop="plugTypeName"
        align="center"
      ></el-table-column>
      <el-table-column
        label="插件添加日期"
        prop="addTypeTime"
        align="center"
      ></el-table-column>
      <el-table-column
        label="插件类型描述"
        prop="plugTypeDes"
        :show-overflow-tooltip="true"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="table-operate">
            <el-button @click="updatePlug(scope.row.plugTypeId)"
              >修改</el-button
            >
            <el-button @click="deletePlug(scope.row.plugTypeId)"
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

    <el-dialog :title="plugTitle" :visible.sync="isShowPlugDialog" width="40%">
      <add-plug-type
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
  getAllPlugTypePag,
  getPlugTypeInfoById,
  deletePlugInfoById,
} from "@api/plug.js";

export default {
  components: {
    addPlugType: () => import("./addPlugType"),
  },
  data() {
    return {
      plugTypeForm: {
        plugTypeName: "", //插件类型名
        plugTypeId: "", //插件类型Id
        addTypeTime: "", //插件添加日期
        userId: localStorage.getItem("userId"), //当前登录用户
      }, //表单数据

      tableData: [], //table表格数据

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
      operateStatus: 0, //默认点击新增 修改则为1
      updateFormData: {}, //修改根据id获取的详情
    };
  },

  methods: {
    /**默认获取10条插件记录 */
    async init() {
      this.tableLoading = true;
      const data = await getAllPlugTypePag(
        this.plugTypeForm.plugTypeId,
        this.plugTypeForm.plugTypeName,
        this.plugTypeForm.addTypeTime,
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
      //时间转换
      if (this.plugTypeForm.addTypeTime) {
        this.plugTypeForm.addTypeTime = dateFormat(
          this.plugTypeForm.addTypeTime,
          "YYYY-mm-dd"
        );
      } else {
        this.plugTypeForm.addTypeTime = "";
      }

      console.log(this.plugTypeForm);
      this.init();
    },

    /**重置查询内容 */
    resetPlugForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**添加插件 */
    addPlug() {
      this.plugTitle = "新增插件类型";
      this.isShowPlugDialog = true;
      this.operateStatus = 0;
    },

    /**修改插件 */
    async updatePlug(id) {
      // console.log("修改", id);
      const data = await getPlugTypeInfoById(id);
      this.plugTitle = "修改插件类型";
      this.isShowPlugDialog = true;
      this.operateStatus = 1;
      this.updateFormData = data.data[0];
    },

    /**删除插件 */
    deletePlug(id) {
      // console.log("删除", id);

      this.$confirm("是否删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
        callback: async (action) => {
          if (action === "confirm") {
            const data = await deletePlugInfoById(id);
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
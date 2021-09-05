<template>
  <div class="dept-manage">
    <div class="query-form">
      <el-form :inline="true" ref="queryForm" :model="queryForm">
        <el-form-item>
          <el-input
            placeholder="请输入部门名称"
            v-model="queryForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDeptList">查询</el-button>
          <el-button @click="handleReset('queryFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleOpen">创建</el-button>
      </div>
      <el-table
        :data="deptList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
        stripe
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          v-bind="item"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="action == 'create' ? '创建部门' : '编辑部门'"
      v-model="showModal"
    >
      <el-form
        ref="dialogForm"
        :model="deptForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader
            placeholder="请选择上级部门"
            v-model="deptForm.parentId"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            :options="deptList"
            :show-all-levels="true"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input
            placeholder="请输入部门名称"
            v-model="deptForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="user">
          <el-select
            placeholder="请选择部门负责人"
            v-model="deptForm.user"
            @change="handleUser"
          >
            <!-- 输入框数据联动，通过@change事件，将多选框的值选中
          下面对值进行设置，设置为当前项目的id，name，Email -->
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人邮箱" prop="userEmail">
          <el-input
            placeholder="请输入负责人邮箱"
            v-model="deptForm.userEmail"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import utils from "../utils/utils";

export default {
  name: "Dept",
  data() {
    return {
      queryForm: {
        deptName: "",
      },
      columns: [
        {
          label: "部门名称",
          prop: "deptName",
        },
        {
          label: "负责人",
          prop: "userName",
        },
        {
          label: "更新时间",
          prop: "updateTime",
          formatter: (row, column, value) => {
            return utils.formateDate(new Date(value));
          },
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter: (row, column, value) => {
            return utils.formateDate(new Date(value));
          },
        },
      ],
      userList: [],
      deptList: [],
      deptForm: {
        parentId: [null],
      },
      pager: {
        pageNum: 1,
        pageSize: 10,
      },
      rules: {
        parentId: [
          {
            required: true,
            message: "请选择上级部门",
            trigger: "blur",
          },
        ],
        deptName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur",
          },
        ],
        user: [
          {
            required: true,
            message: "请选择负责人",
            trigger: "blur",
          },
        ],
      },
      action: "create",
      showModal: false,
    };
  },
  mounted() {
    this.getDeptList();
    this.getAllUserList();
  },
  methods: {
    async getDeptList() {
      let list = await this.$api.getDeptList(this.queryForm);
      this.deptList = list;
    },
    async getAllUserList() {
      this.userList = await this.$api.getAllUserList();
    },
    handleUser(val) {
      const [userId, userName, userEmail] = val.split("/");
      Object.assign(this.deptForm, { userId, userName, userEmail });
    },
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        // 浅拷贝，将user重新赋值过去
        // console.log(this.deptForm);
        Object.assign(this.deptForm, row, {
          user: `${row.userId}/${row.userName}/${row.userEmail}`,
        });
      });
    },
    async handleDel(_id) {
      this.action = "delete";
      await this.$api.deptOperate({ _id, action: this.action });
      this.$message.success("删除成功");
      this.getDeptList();
    },
    handleOpen() {
      this.deptForm.deptName = "";
      this.deptForm.userEmail = "";

      this.deptForm.user = "";
      this.action = "create";
      this.showModal = true;
    },
    handleClose() {
      this.handleReset("dialogForm");
      this.showModal = false;
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.deptForm, action: this.action };
          // console.log(params);
          delete params.user;
          let res = await this.$api.deptOperate(params);
          if (res) {
            this.$message.success("操作成功");
            this.handleClose();
            this.getDeptList();
          }
        }
      });
    },
  },
};
</script>


<style lang="scss">
.dept-manage {
  height: 100%;
  .query-form {
    background-color: #ffffff;
    padding: 22px 20px 0;
    border-radius: 5px;
  }
  .base-table {
    border-radius: 5px;
    background: #ffffff;
    margin-top: 20px;
    margin-bottom: 20px;
    .action {
      border-radius: 5px 5px 0px 0px;
      background: #ffffff;
      padding: 20px;
      border-bottom: 1px solid #ece8e8;
    }
    .pagination {
      text-align: right;
      padding: 10px;
    }
  }
}
</style>
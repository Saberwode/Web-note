<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="user" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID">
          </el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称">
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state" placeholder="请输入状态">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleClick">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :formatter="item.formatter"
          :width="item.width"
        >
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        class="pagination"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="收货地址" v-model="dialogFormVisible">
      <el-form
        :model="userForm"
        label-width="100px"
        ref="userForm"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            placeholder="请输入用户名称"
            :disabled="action === 'edit'"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="userForm.userEmail"
            placeholder="请输入用户邮箱"
            :disabled="action === 'edit'"
            ><template #append>@qq.com</template></el-input
          >
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="userForm.mobile"
            placeholder="请输入用户手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input
            v-model="userForm.job"
            placeholder="请输入用户岗位"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select
            v-model="userForm.roleList"
            placeholder="请选择系统角色"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="role in roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId">
          <!-- <el-select v-model="userForm.deptId"></el-select> -->
          <el-cascader
            v-model="userForm.deptId"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            placeholder="请选择所属部门"
            clearable
            style="width: 100%"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import utils from "../utils/utils";
export default {
  name: "User",
  mounted() {
    this.getUserList();
    this.getRoleAllList();
    this.getDeptList();
  },
  data() {
    return {
      // 初始化用户表单对象--查询用的最上面的表单
      user: {
        state: 0,
      },
      // 初始化用户列表对象--渲染表格标题
      columns: [
        {
          label: "用户ID",
          prop: "userId",
        },
        {
          label: "用户名",
          prop: "userName",
        },
        {
          label: "用户邮箱",
          prop: "userEmail",
        },
        {
          label: "用户角色",
          prop: "role",
          formatter(row, column, value) {
            // console.log(row);
            return {
              0: "管理员",
              1: "普通用户",
            }[value];
          },
        },
        {
          label: "用户状态",
          prop: "state",
          formatter(row, column, value) {
            // console.log(row);
            return {
              1: "在职",
              2: "离职",
              3: "试用期",
            }[value];
          },
        },
        {
          label: "注册时间",
          prop: "createTime",
          width: 180,
          formatter: (row, column, value) => {
            return utils.formateDate(new Date(value));
          },
        },
        {
          label: "最后登录时间",
          prop: "lastLoginTime",
          width: 180,
          formatter: (row, column, value) => {
            return utils.formateDate(new Date(value));
          },
        },
      ],
      // 初始化列表数据--渲染表格内容
      userList: [],
      // 分页对象
      pager: {
        pageNum: 1,
        pageSize: 10,
      },
      checkUserIds: [],
      // 弹框显示
      dialogFormVisible: false,
      // 新增用户form对象
      userForm: {
        state: 3,
      },
      // 系统角色列表--从服务端请求角色列表进行渲染，不是写死的
      roleList: [],
      // 部门列表--从服务端请求部门列表进行渲染，不是写死的
      deptList: [],
      // 用户操作行为
      action: "add",
      // 定义表单校验规则
      rules: {
        userName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
        ],
        userEmail: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
        ],
        mobile: [
          {
            pattern: /1[3-9]\d{9}/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        deptId: [
          { required: true, message: "请输入用户部门", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      // 将user和pager对象解构成一个个的参数，作为一个整体传入params，传给服务器
      let params = { ...this.user, ...this.pager };
      try {
        const { list, page } = await this.$api.getUserList(params);
        this.userList = list;
        this.pager.total = page.total;
      } catch (error) {
        console.error(error);
      }
    },
    // 查询
    handleQuery() {
      this.getUserList();
    },
    // 重置--这里面传了一个标签对象，为了新增表单也可以重置复用
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    // 页码发生改变--分页事件处理
    handleCurrentChange(current) {
      this.pager.pageNum = current;
      this.getUserList();
    },
    // 删除
    async handleDel(row) {
      await this.$api.userDel({
        userIds: [row.userId],
      });
      this.$message.success("删除成功");
      this.getUserList();
    },
    // 编辑
    handleEdit(row) {
      this.action = "edit";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // 浅拷贝，其中row是插件获取到的当前行对象，将当前行对象去覆盖掉原对象内容
        Object.assign(this.userForm, row);
      });
    },
    // 批量删除
    async handlePatchDel() {
      if (this.checkUserIds.value.length == 0) {
        this.$message.error("请勾选至少一个用户");
        return;
      }
      const res = await this.$api.userDel({
        userIds: this.checkUserIds.value,
      });
      if (res.modifiedCount) {
        this.$message.success("删除成功");
        this.getUserList();
      } else {
        this.$message.error("删除失败");
      }
    },
    // 表格多选
    handleSelectionChange(list) {
      let arr = [];
      list.map((item) => {
        arr.push(item.userId);
      });
      this.checkUserIds.value = arr;
    },
    // 新增
    handleClick() {
      this.action = "add";
      this.dialogFormVisible = true;
    },
    // 表单提交
    handleSubmit() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          this.userForm.userEmail += "@qq.com";
          // console.log('=>',this.userForm);
          this.userForm.action = this.action;

          let res = await this.$api.userSubmit(this.userForm);
          if (res) {
            this.dialogFormVisible = false;
            this.$message.success("用户创建成功");
            this.handleReset("userForm");
            this.getUserList();
          }
        }
      });
    },
    // 关闭表单
    handleClose() {
      this.dialogFormVisible = false;
      this.handleReset("userForm");
    },
    // 获取系统角色列表--通过访问服务器动态渲染系统角色，方便新增
    async getRoleAllList() {
      const list = await this.$api.getRoleAllList();
      this.roleList = list;
    },
    // 获取部门列表--通过访问服务器动态渲染部门列表
    async getDeptList() {
      const list = await this.$api.getDeptList();
      this.deptList = list;
    },
  },
};
</script>

<style lang="scss">
.user-manage {
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
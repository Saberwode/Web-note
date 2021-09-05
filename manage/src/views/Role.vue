<template>
  <div class="role-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">创建</el-button>
      </div>
      <!-- 必须加入key才可以变成树形结构 -->
      <!-- tree-prop是可以将json数据中的孩子字段进行改名，如果不是叫children的话 -->
      <el-table :data="roleList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button
              @click="handleOpenPermission(scope.row)"
              size="mini"
              type="primary"
              >设置权限</el-button
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
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        class="pagination"
        @current-change="handleCurrentChange"
      />
      <!-- 占位div -->
      <!-- <div class="bottom"></div> -->
    </div>

    <!-- 弹出框，新增修改 -->
    <el-dialog title="用户新增" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="roleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="roleForm.roleName"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            v-model="roleForm.remark"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 权限弹出框 -->
    <el-dialog title="权限设置" v-model="showPermission">
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="选择权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="_id"
            default-expand-all
            :props="{ label: 'menuName' }"
          ></el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPermission = false">取消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import utils from "../utils/utils";
export default {
  name: "Role",
  data() {
    return {
      queryForm: {
        roleName: "",
      },
      columns: [
        {
          label: "角色名称",
          prop: "roleName",
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "权限列表",
          prop: "permissionList",
          width: 200,
          formatter: (row, column, value) => {
            let names = [];
            let list = value.halfCheckedKeys || [];
            list.map((key) => {
              let name = this.actionMap[key];
              if (name) names.push(name);
            });
            return names.join("/");
          },
        },
        {
          label: "更新时间",
          prop: "updateTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
        },
      ],
      roleList: [],
      pager: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      // 显示弹出框
      showModal: false,
      action: "create",
      roleForm: {},
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
        ],
      },
      showPermission: false,
      curRoleId: "",
      curRoleName: "",
      menuList: [],
      actionMap: {},
    };
  },
  mounted() {
    this.getRoleList();
    this.getMenuList();
  },
  methods: {
    // 菜单列表初始化
    async getRoleList() {
      try {
        let { list, page } = await this.$api.getRoleList({
          ...this.queryForm,
          ...this.pager,
        });
        this.roleList = list;
        this.pager.total = page.total;
      } catch (e) {
        throw new Error(e);
      }
    },
    // 菜单列表初始化
    async getMenuList() {
      try {
        let list = await this.$api.getMenuList();
        // console.log(list);
        this.menuList = list;
        this.getActionMap(list);
      } catch (e) {
        throw new Error(e);
      }
    },
    getActionMap(list) {
      let actionMap = {};
      const deep = (arr) => {
        while (arr.length) {
          let item = arr.pop();
          // 如果满足条件说明子菜单就是按钮，只要碰到action，就是最后一级菜单
          if (item.children && item.action) {
            // 将id和name做一个映射，存入对象中
            actionMap[item._id] = item.menuName;
          }
          // 说明这个是一个菜单，但是下一级不是按钮
          if (item.children && !item.action) {
            deep(item.children);
          }
        }
      };
      // 因为前面item是引用的list，会改变list的值
      // 通过两次json格式化，将list更改格式传入
      deep(JSON.parse(JSON.stringify(list)));
      this.actionMap = actionMap;
    },

    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    // 创建
    handleAdd() {
      this.action = "create";
      this.showModal = true;
    },
    // 编辑
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        // this.roleForm = row;
        this.roleForm = {
          _id: row._id,
          roleName: row.roleName,
          remark: row.remark,
        };
      });
    },
    // 删除
    async handleDel(_id) {
      await this.$api.roleOperate({ _id, action: "delete" });
      this.$message.success("删除成功");
      this.getRoleList();
    },
    // 弹框关闭
    handleClose() {
      this.handleReset("dialogForm");
      this.showModal = false;
    },
    // 提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { roleForm, action } = this;
          let params = { ...roleForm, action };
          let res = await this.$api.roleOperate(params);
          if (res) {
            this.showModal = false;
            this.$message.success("创建成功");
            this.handleReset("dialogForm");
            this.getRoleList();
          }
        }
      });
    },
    // 分页提交
    handleCurrentChange(current) {
      this.pager.pageNum = current;
      this.getRoleList();
    },
    handleOpenPermission(row) {
      this.curRoleName = row.roleName;
      this.curRoleId = row._id;
      this.showPermission = true;
      let { checkedKeys } = row.permissionList;
      setTimeout(() => {
        this.$refs.tree.setCheckedKeys(checkedKeys);
      });
    },
    async handlePermissionSubmit() {
      // 返回被选中的结点
      let nodes = this.$refs.tree.getCheckedNodes();
      // 返回被半选中的结点
      let halfKeys = this.$refs.tree.getHalfCheckedKeys();
      // 按钮数组
      let checkedKeys = [];
      // 菜单数组
      let parentKeys = [];
      nodes.map((node) => {
        // 如果该节点中没有孩子结点，证明这个节点是一个按钮
        if (!node.children) {
          checkedKeys.push(node._id);
        } else {
          // 除了按钮其他的都是菜单，菜单不能作为选中进行赋值，需要设置半选
          // 如果直接对菜单进行设置选中的话，那么其子节点都会被选中
          parentKeys.push(node._id);
        }
      });
      let params = {
        // 查看是选中的哪个角色
        _id: this.curRoleId,
        permissionList: {
          checkedKeys,
          halfCheckedKeys: parentKeys.concat(halfKeys),
        },
      };
      await this.$api.updatePermission(params);
      this.showPermission = false;
      this.$message.success("设置成功");
      this.getRoleList();
    },
  },
};
</script>

<style lang="scss">
.role-manage {
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
    .bottom {
      height: 10px;
      background: #fff;
      height: 25px;
      border-radius: 0px 0px 5px 5px;
    }
  }
}
</style>
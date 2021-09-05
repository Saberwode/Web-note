<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState">
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="2" label="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getMenuList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">新增</el-button>
      </div>
      <!-- 必须加入key才可以变成树形结构 -->
      <!-- tree-prop是可以将json数据中的孩子字段进行改名，如果不是叫children的话 -->
      <el-table
        :data="menuList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              @click="handleAdd(2, scope.row)"
              type="primary"
              size="mini"
              >新增</el-button
            >
            <el-button @click="handleEdit(scope.row)" size="mini"
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
      <!-- 占位div -->
    <div class="bottom"></div>
    </div>
    
    <!-- 弹出框，新增修改 -->
    <el-dialog title="用户新增" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="menuForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <!-- 级联选择器，较复杂的下拉列表 -->
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
            placeholder="请选择父级菜单"
          ></el-cascader>
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="menuForm.menuName"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuForm.menuType == 1"
        >
          <el-input
            v-model="menuForm.icon"
            placeholder="请输入菜单图标"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="menuForm.menuType == 1"
        >
          <el-input
            v-model="menuForm.path"
            placeholder="请输入路由地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="menuCode">
          <el-input
            v-model="menuForm.menuCode"
            placeholder="请输入权限标识"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="组件路径"
          prop="component"
          v-show="menuForm.menuType == 1"
        >
          <el-input
            v-model="menuForm.component"
            placeholder="请输入组件路径"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="menuState"
          
        >
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import utils from "../utils/utils";
export default {
  name: "Menu",
  data() {
    return {
      queryForm: {
        menuState: 1,
      },
      menuList: [],
      columns: [
        {
          label: "菜单名称",
          prop: "menuName",
          width: 150,
        },
        {
          label: "图标",
          prop: "icon",
        },
        {
          label: "菜单类型",
          prop: "menuType",
          formatter(row, column, value) {
            return {
              1: "菜单",
              2: "按钮",
            }[value];
          },
        },
        {
          label: "权限标识",
          prop: "menuCode",
        },
        {
          label: "路由地址",
          prop: "path",
        },
        {
          label: "组件路径",
          prop: "component",
        },
        {
          label: "菜单状态",
          prop: "menuState",
          width: 90,
          formatter(row, column, value) {
            return {
              1: "正常",
              2: "停用",
            }[value];
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
      // 显示弹出框
      showModal: false,
      menuForm: {
        parentId: [null],
        menuType: 1,
        menuState: 1,
      },
      action: "",
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在2-8个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    // 菜单列表初始化
    async getMenuList() {
      try {
        let list = await this.$api.getMenuList(this.queryForm);
        this.menuList = list;
      } catch (e) {
        throw new Error(e);
      }
    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    // 新增菜单
    handleAdd(type, row) {
      this.showModal = true;
      this.action = "add";
      if (type == 2) {
        // 筛选掉为父菜单为空的，只留下本行的id
        this.menuForm.parentId = [...row.parentId, row._id].filter(
          (item) => item
        );
      }
    },
    handleEdit(row) {
      this.showModal = true;
      this.action = 'edit';
      this.$nextTick(()=>{
        Object.assign(this.menuForm, row);
      })
    },
    async handleDel(_id) {
      await this.$api.menuSubmit({_id, action:'delete'});
      this.$message.success('删除成功')
      this.getMenuList();
    },
    // 菜单操作-提交
    handleSubmit() {
      // validate验证--验证表单是否合乎规则
      this.$refs.dialogForm.validate(async (valid) => {
        // 对action,menuForm进行解构
        let { action, menuForm } = this;
        // 对menuForm进行解构，因为action是一个字段，就不用解构了
        let params = { ...menuForm, action };
        let res = await this.$api.menuSubmit(params);
        this.showModal = false;
        this.$message.success("操作成功");
        this.handleReset("dialogForm");
        this.getMenuList();
      });
    },
    // 弹框关闭
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
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
    .bottom{
    height: 10px;
    background: #fff;
    height: 25px;
    border-radius: 0px 0px 5px 5px;
  }
  }
  
}
</style>
<template>
  <div class="base-layout">
    <!-- 左部 -->
    <div :class="['nav-left', isCollapse ? 'fold' : 'unfold']">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/logo.png" />
        <span>Manager</span>
      </div>
      <!-- 菜单页 -->
      <div class="menu">
        <el-menu
          :default-active="activeMenu"
          class="nav-menu"
          background-color="#001529"
          text-color="#fff"
          router
          :collapse="isCollapse"
        >
          <tree-menu :userMenu="userMenu"></tree-menu>
        </el-menu>
      </div>
    </div>
    <!-- 右部 -->
    <div :class="['container-right', isCollapse ? 'fold' : 'unfold']">
      <!-- 右上 -->
      <div class="nav-top">
        <div class="nav-fold">
          <!-- 折叠菜单 -->
          <i class="el-icon-s-fold" @click="fold"></i>
          <!-- 面包屑 ：路径 -->
          <span class="user-name">
            <bread-crumb></bread-crumb>
            <!-- saberwode -->
          </span>
        </div>
        <div class="user-info">
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              <!-- 审批通知 -->

              <el-badge :is-dot="noticeCount > 0 ? true : false" class="notice">
                <i class="el-icon-bell"></i>
              </el-badge>
              {{ userInfo.userName }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱：{{ userInfo.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 右下 -->
      <div class="wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// import TreeMenu from "./TreeMenu.vue";
import TreeMenu from "./TreeMenu.vue";
import BreadCrumb from "./BreadCrumb.vue";
export default {
  name: "Home",
  components: {
    TreeMenu,
    BreadCrumb,
  },
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      isCollapse: false,
      noticeCount: 0,
      userMenu: [],
      activeMenu: location.hash.slice(1),
    };
  },

  mounted() {
    this.getNoticeCount();
    this.getMenuList();
  },
  methods: {
    handleLogout(key) {
      if (key === "email") return;
      this.$store.commit("saveUserInfo", "");
      this.userInfo = null;
      this.$router.push("/login");
    },
    fold() {
      this.isCollapse = !this.isCollapse;
    },
    async getNoticeCount() {
      const count = await this.$api.noticeCount();
      this.noticeCount = count;
    },
    async getMenuList() {
      try {
        const list = await this.$api.getMenuList();
        // console.log(list);
        this.userMenu = list;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.base-layout {
  position: relative;
  .nav-left {
    position: fixed;
    width: 200px;
    background-color: #001529;
    // 这个等同于:100%
    // height: 100vh;
    height: 100%;
    transition: width 0.5s;
    overflow: hidden;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      color: #fff;

      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }

    .nav-menu {
      border-right: none;
    }
    // 这种写法相当于将.fold的css内容写入到父元素中&将自动被替换为父元素
    &.fold {
      width: 64px;
    }
    &.unfold {
      width: 200px;
    }
  }
  .container-right {
    margin-left: 200px;
    // transition需要设置width初值，不然没有效果
    // transition: width 1s;

    // padding: 0 20px;
    // 为什么不能在这里统一设置外边距，是因为设置的外边距是属于父容器的，不属于子容器
    // 颜色会随着父容器，而不是子容器
    .nav-top {
      display: flex;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      justify-content: space-between;

      .user-name {
        margin-left: 10px;
        display: inline-block;
      }

      .user-info {
        padding-right: 10px;
        .notice {
          margin-left: 20px;
          padding-right: 10px;
          line-height: 30px;
        }
      }
    }
    .wrapper {
      padding: 20px;
      background: #e9eaee;
      // heigh: calc(100vh - 50px);
      min-height: calc(100vh - 50px);
      height: 100%;
      .wrapper-main {
        background-color: #ffffff;
        height: 100%;
      }
    }

    &.fold {
      margin-left: 64px;
    }
    &.unfold {
      margin-left: 200px;
    }
  }
}
</style>

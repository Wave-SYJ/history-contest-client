<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <!-- 页头 -->
      <el-header height="60px">
        <div class="home-header-container">
          <h1 class="home-header-title">东南大学校史校情知识竞赛</h1>
          <span>
            <span>欢迎您，{{ userRole }} {{ userInfo.name }} ！</span>
            <span class="exit" @click="logout()">退出</span>
          </span>
        </div>
      </el-header>
      <el-container>
        <!-- 内容页面 -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "",
        role: ""
      }
    };
  },
  computed: {
    userRole() {
      switch (this.userInfo.role) {
        case "ROLE_STUDENT":
          return "学生";
        case "ROLE_ADMIN":
          return "管理员";
      }
      return "";
    }
  },
  created() {
    this.$store.dispatch("user/getInfo").then(() => {
      this.userInfo = this.$store.state.user;
    });
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  width: 100%;
  padding: 0;
  z-index: 10;

  .home-header-container {
    box-shadow: 0 2px 8px #f0f1f2;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding-left: 40px;
    padding-right: 40px;

    .home-header-title {
      display: flex;
    }

    span {
      display: flex;
      justify-content: space-around;

      * {
        margin: 10px;
      }
    }
  }

  .exit {
    text-decoration: none;
    color: #1989fa;
    cursor: pointer;
  }
}

.el-aside {
  height: 100%;
  box-shadow: 0 2px 8px #f0f1f2;

  .el-menu {
    height: 100%;
  }

  .el-menu-item.is-active {
    background-color: #ffffff;
  }
}
</style>

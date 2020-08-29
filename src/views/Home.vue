<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <!-- 页头 -->
      <el-header height="60px">
        <div class="home-header-container">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="font-size: 18px">
              <el-button icon="el-icon-menu"></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus"
                >狮子头</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-circle-plus-outline"
                >螺蛳粉</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check"
                >蚵仔煎</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <i style="font-size: 18px" class="el-icon-menu"></i> -->
          <h1 style="font-size: 18px">东南大学校史校情知识竞赛</h1>
          <span style="font-size: 18px">
            <span class="text-button" @click="logout()">退出</span>
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
import { removeToken } from "@/utils/storage";

export default {
  created() {
    this.$store.dispatch("user/getInfo");
  },
  methods: {
    logout() {
      removeToken();
      this.$router.push("/login");
      this.$store.commit("user/CLEAR_INFO");
    }
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
    padding-left: 20px;
    padding-right: 20px;

    .home-header-title {
      display: flex;
    }

    span {
      display: flex;
      justify-content: space-around;
    }
  }

  .text-button {
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

<template>
  <div>
    <el-row>
      <div>欢迎您，{{ userRole }} {{ userInfo.name }} ！</div>
    </el-row>
    <el-row>
      <div v-if="userInfo.status === constants.STATUS_NOT_START">
        <el-button type="primary">开始答题</el-button>
      </div>
      <div v-else-if="userInfo.status === constants.STATUS_STARTED">
        <el-button type="primary">继续答题</el-button>
        <el-button>重新答题</el-button>
      </div>

      <div v-if="userInfo.role === constants.ROLE_ADMIN">
        <el-button @click="goToStudentList">学生信息</el-button>
        <el-button>试卷信息</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
import constants from "@/constants.js";

export default {
  data() {
    return {
      constants
    };
  },
  computed: {
    userInfo() {
      console.log(this.$store.state.user);
      return this.$store.state.user;
    },
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
  methods: {
    goToStudentList() {
      this.$router.push("/students");
    }
  }
};
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>

<template>
  <div>
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
      return this.$store.state.user;
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

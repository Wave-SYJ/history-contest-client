<template>
  <div>
    <el-row>
      <el-button @click="goToStudentList">学生信息</el-button>
      <el-button>试卷信息</el-button>
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

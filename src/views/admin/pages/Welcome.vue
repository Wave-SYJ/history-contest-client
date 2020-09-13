<template>
  <div v-loading="loading">
    <el-row> 当前数据库中， </el-row>
    <el-row> 学生数量：{{ studentCount }} </el-row>
    <el-row> 选择题数量：{{ choiceCount }} </el-row>
    <el-row> 判断题数量：{{ judgeCount }} </el-row>
  </div>
</template>

<script>
import constants from "@/constants.js";
import userApi from "@/api/user";
import choiceApi from "@/api/choiceQuestion";
import judgeApi from "@/api/judgeQuestion";

export default {
  data() {
    return {
      constants,
      studentCount: 0,
      choiceCount: 0,
      judgeCount: 0,
      loading: false
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
  },
  async created() {
    this.loading = true;
    this.studentCount = await userApi.getCount();
    this.choiceCount = await choiceApi.getCount();
    this.judgeCount = await judgeApi.getCount();
    this.loading = false;
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

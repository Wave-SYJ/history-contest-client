<template>
  <div>
    <el-row> </el-row>
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

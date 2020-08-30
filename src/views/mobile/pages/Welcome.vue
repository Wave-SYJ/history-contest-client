<template>
  <div>
    <van-nav-bar title="东南大学校史校情知识竞赛" @click-right="onClickRight">
      <template #right>
        <van-icon name="user-o" size="18" color="black" />
      </template>
    </van-nav-bar>

    <van-popup
      v-model="showPopup"
      position="right"
      :style="{ height: '100%', width: '70%' }"
    >
      <van-cell-group title="学生信息">
        <van-cell title="姓名" :value="userInfo.name" />
        <van-cell title="学号" :value="userInfo.sid" />
        <van-cell title="一卡通号" :value="userInfo.cardId" />
      </van-cell-group>

      <van-row style="padding: 1rem">
        <el-button style="width: 100%" type="danger" @click="onLogout">
          退出
        </el-button>
      </van-row>
    </van-popup>

    <van-button type="info" @click="onStartExam">主要按钮</van-button>
  </div>
</template>

<script>
import { removeToken } from "@/utils/storage";

export default {
  data() {
    return {
      showPopup: false
    };
  },
  methods: {
    onClickRight() {
      this.showPopup = !this.showPopup;
    },
    onStartExam() {
      this.$router.push("/exam/1");
    },
    onLogout() {
      removeToken();
      this.$router.push("/login");
      this.$store.commit("user/CLEAR_INFO");
    }
  },
  created() {
    this.$store.dispatch("user/getInfo");
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  }
};
</script>

<style></style>

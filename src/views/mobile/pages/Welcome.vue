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

    <div class="welcome" v-if="userInfo.status !== constants.STATUS_SUBMITTED">
      <h3>欢迎您，{{ userInfo.name }} 同学！</h3>
      <p>
        本次竞赛共有
        {{ constants.CHOICE_QUESTION_NUM + constants.JUDGE_QUESTION_NUM }}
        小题，包含：
      </p>
      <ul>
        <li>
          选择题 {{ constants.CHOICE_QUESTION_NUM }} 题，每题
          {{ constants.CHOICE_QUESTION_SCORE }} 分。
        </li>
        <li>
          判断题 {{ constants.JUDGE_QUESTION_NUM }} 题，每题
          {{ constants.JUDGE_QUESTION_SCORE }} 分。
        </li>
      </ul>
      <p>时间限制为 {{ constants.TIME_LIMIT / 60 / 1000 }} 分钟。</p>
      <p>答题过程中请不要中途退出。</p>

      <div>
        <van-button type="info" @click="onStartExam">
          开始答题
        </van-button>
      </div>
    </div>

    <div class="welcome" v-else>
      <h3>欢迎您，{{ userInfo.name }} 同学！</h3>
      <p>您的得分：</p>
      <p>{{ score }}</p>
      <van-button type="info" @click="onGetDetails">
        查看详情
      </van-button>
    </div>
  </div>
</template>

<script>
import { removeToken } from "@/utils/storage";
import paperApi from "@/api/paper";
import constants from "@/constants";

export default {
  data() {
    return {
      showPopup: false,
      constants,
      score: 0
    };
  },
  methods: {
    onGetDetails() {
      this.$router.push("/details");
    },
    onClickRight() {
      this.showPopup = !this.showPopup;
    },
    onStartExam() {
      this.$router.replace("/exam/1");
    },
    onLogout() {
      removeToken();
      this.$router.replace("/login");
      this.$store.commit("user/CLEAR_INFO");
    }
  },
  async created() {
    await this.$store.dispatch("user/getInfo");
    if (this.userInfo.status === constants.STATUS_SUBMITTED)
      this.score = await paperApi.getScore();
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.welcome {
  width: 70%;
  left: 15%;
  right: 15%;
  position: absolute;

  text-align: center;
}
</style>

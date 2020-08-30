<template>
  <div>
    <div>
      <van-nav-bar
        title="东南大学校史校情知识竞赛"
        @click-right="onClickRight"
        @click-left="$router.back(-1)"
      >
        <template #left>
          <van-icon name="arrow-left" size="18" color="black" />
        </template>
        <template #right>
          <div style="font-size: 18px">
            <i class="el-icon-s-fold"></i>
          </div>
        </template>
      </van-nav-bar>

      <van-popup
        v-model="showPopup"
        position="right"
        :style="{ height: '100%', width: '70%' }"
      >
        <van-cell-group title="答题信息">
          <van-grid :column-num="3">
            <van-grid-item
              v-for="value in 30"
              :key="value"
              icon="photo-o"
              :text="value.toString()"
            />
          </van-grid>
        </van-cell-group>
      </van-popup>

      <Question
        :currentQuestion="currentQuestion"
        :currentType="currentType"
        :currentId="$route.params.id"
        :currentAnswer="currentAnswer"
        :remainTime="remainTime"
        @change="onCurrentAnswerChanged"
      >
      </Question>

      <div class="button-group">
        <el-button icon="el-icon-arrow-left">上一页</el-button>
        <el-button type="primary">
          下一页
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import constants from "@/constants";
import paperApi from "@/api/paper";
import Question from "./Question.vue";

export default {
  data() {
    return {
      showPopup: false,
      paper: {
        id: null,
        choiceAnswerSheet: [],
        judgeAnswerSheet: []
      },
      remainTime: 24 * 60 * 60 * 3600 * 1000
    };
  },
  methods: {
    onCurrentAnswerChanged(name) {
      if (this.currentType === "选择题")
        this.paper.choiceAnswerSheet[this.realCurrentIndex] = name;
      else this.paper.judgeAnswerSheet[this.realCurrentIndex] = name;
      console.log(this.paper);
    },
    onClickRight() {
      this.showPopup = !this.showPopup;
    },
    async getPaper() {
      if (this.userInfo.status === constants.STATUS_NOT_START) {
        this.paper = await paperApi.generatePaper();
        this.$store.commit("user/SET_INFO", {
          status: constants.STATUS_GENERATED
        });
      }

      if (this.userInfo.status === constants.STATUS_GENERATED) {
        this.startTime = new Date();
        await paperApi.calibrateTime(this.startTime);
        this.$store.commit("user/SET_INFO", {
          status: constants.STATUS_STARTED
        });
      }

      this.paper = await paperApi.getPaper();

      this.remainTime =
        constants.TIME_LIMIT - (new Date().getTime() - this.paper.startTime);
      console.log(this.remainTime);
      console.log(this.paper);
    }
  },
  components: {
    Question
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
    realCurrentIndex() {
      let index = this.$route.params.id;
      if (this.paper.id === null) return 0;
      if (index <= constants.CHOICE_QUESTION_NUM) return index;
      else return index - constants.CHOICE_QUESTION_NUM;
    },
    currentQuestion() {
      let index = this.$route.params.id;
      if (this.paper.id === null) return {};
      if (index <= constants.CHOICE_QUESTION_NUM)
        return this.paper.choiceQuestions[index - 1];
      else
        return this.paper.judgeQuestions[
          index - constants.CHOICE_QUESTION_NUM - 1
        ];
    },
    currentType() {
      let index = this.$route.params.id;
      if (this.paper.id === null) return "";
      if (index <= constants.CHOICE_QUESTION_NUM) return "选择题";
      else return "判断题";
    },
    currentAnswer() {
      let index = this.$route.params.id;
      if (this.paper.id === null) return -1;
      if (index <= constants.CHOICE_QUESTION_NUM)
        return this.paper.choiceAnswerSheet[index - 1];
      else
        return this.paper.judgeAnswerSheet[
          index - constants.CHOICE_QUESTION_NUM - 1
        ];
    }
  },
  created() {
    this.getPaper();
  }
};
</script>

<style lang="scss" scoped>
.button-group {
  position: absolute;
  right: 10px;
}
</style>

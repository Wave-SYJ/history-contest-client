<template>
  <div v-loading.fullscreen.lock="loading">
    <div>
      <van-nav-bar title="东南大学校史校情知识竞赛" @click-right="onClickRight">
        <template #right>
          <div style="font-size: 18px">
            <i class="el-icon-s-fold"></i>
          </div>
        </template>
      </van-nav-bar>

      <van-popup
        v-model="showPopup"
        position="right"
        :style="{ height: '100%', width: '70%', maxWidth: '300px' }"
        v-loading="!this.$store.state.user.id"
      >
        <van-cell-group title="答题信息">
          <van-grid :column-num="3" :border="true" clickable>
            <van-grid-item
              v-for="value in totalQuestion"
              :key="value"
              :text="value.toString()"
              :to="'/student/exam/' + value"
              :replace="true"
              @click="showPopup = false"
              :class="{ 'grid-item-selected': $route.params.id == value }"
            >
              <template #icon>
                <div :class="['circle', { selected: isSelected(value) }]"></div>
              </template>
            </van-grid-item>
          </van-grid>
        </van-cell-group>
      </van-popup>

      <van-cell :title="`#${$route.params.id} ${currentType}（${score}分）`">
        <template #default>
          <van-count-down :time="remainTime">
            <template #default="timeData">
              <span class="block">{{ formatTimeNumber(timeData.hours) }}</span>
              <span class="colon">:</span>
              <span class="block">{{
                formatTimeNumber(timeData.minutes)
              }}</span>
              <span class="colon">:</span>
              <span class="block">{{
                formatTimeNumber(timeData.seconds)
              }}</span>
            </template>
          </van-count-down>
        </template>
      </van-cell>

      <div class="question">
        <h3 class="question-head">
          {{ currentQuestion.question }}
        </h3>

        <div class="question-body">
          <van-radio-group
            v-model="selectedAnswer[0]"
            @change="onCurrentAnswerChanged"
          >
            <van-radio :name="0">
              {{
                currentType == "选择题"
                  ? "A. " + currentQuestion.choiceA
                  : "正确"
              }}
            </van-radio>
            <van-radio :name="1">
              {{
                currentType == "选择题"
                  ? "B. " + currentQuestion.choiceB
                  : "错误"
              }}
            </van-radio>
            <van-radio v-show="currentType == '选择题'" :name="2">
              {{ "C. " + currentQuestion.choiceC }}
            </van-radio>
            <van-radio v-show="currentType == '选择题'" :name="3">
              {{ "D. " + currentQuestion.choiceD }}
            </van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
    <div>
      <div class="button-group">
        <el-button
          class="submit-button"
          @click="onSubmit"
          :loading="submitting"
        >
          交卷
        </el-button>
        <div class="page-button-group">
          <el-button
            icon="el-icon-arrow-left"
            @click="onPageChange(-1)"
            :disabled="$route.params.id == 1"
            >上一页</el-button
          >
          <el-button
            type="primary"
            @click="onPageChange(1)"
            :disabled="
              $route.params.id ==
                paper.choiceAnswerSheet.length + paper.judgeAnswerSheet.length
            "
          >
            下一页
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constants from "@/constants";
import paperApi from "@/api/paper";

export default {
  data() {
    return {
      showPopup: false,
      paper: {
        id: null,
        choiceAnswerSheet: [],
        judgeAnswerSheet: []
      },
      remainTime: 24 * 60 * 60 * 3600 * 1000,
      selectedAnswer: [-1],
      loading: true,
      submitting: false
    };
  },
  methods: {
    isSelected(id) {
      if (id <= constants.CHOICE_QUESTION_NUM)
        return this.paper.choiceAnswerSheet[id - 1] != -1;
      else
        return (
          this.paper.judgeAnswerSheet[id - constants.CHOICE_QUESTION_NUM - 1] !=
          -1
        );
    },
    async onSubmit() {
      this.submitting = true;
      try {
        await paperApi.submit(
          this.paper.choiceAnswerSheet,
          this.paper.judgeAnswerSheet
        );
        this.$store.commit("user/SET_INFO", {
          status: constants.STATUS_SUBMITTED
        });
        this.$router.replace("/student/details");
      } catch (error) {
        this.$message.error("交卷失败，请重试");
        this.submitting = false;
      }
    },
    formatTimeNumber(num) {
      return num < 10 ? "0" + num : num;
    },
    onPageChange(num) {
      let nextPage = parseInt(this.$route.params.id) + num;
      if (
        nextPage >= 1 &&
        nextPage <= constants.CHOICE_QUESTION_NUM + constants.JUDGE_QUESTION_NUM
      ) {
        this.$router.replace("/student/exam/" + nextPage);
      }
    },
    onCurrentAnswerChanged(name) {
      if (this.currentType === "选择题") {
        this.paper.choiceAnswerSheet[this.realCurrentIndex - 1] = name;
      } else {
        this.paper.judgeAnswerSheet[this.realCurrentIndex - 1] = name;
      }
    },
    onClickRight() {
      this.showPopup = !this.showPopup;
    },
    async getPaper() {
      this.paper = await paperApi.generatePaper();
      this.$store.commit("user/SET_INFO", {
        status: constants.STATUS_GENERATED
      });

      if (this.userInfo.status === constants.STATUS_GENERATED) {
        this.paper.startTime = new Date();
        await paperApi.calibrateTime(this.paper.startTime);
        this.$store.commit("user/SET_INFO", {
          status: constants.STATUS_STARTED
        });
      }

      this.remainTime =
        constants.TIME_LIMIT - (new Date().getTime() - this.paper.startTime);
    }
  },
  watch: {
    $route() {
      this.selectedAnswer[0] = this.currentAnswer;
    }
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
    score() {
      if (this.currentType === "选择题") return constants.CHOICE_QUESTION_SCORE;
      else return constants.JUDGE_QUESTION_SCORE;
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
    },
    totalQuestion() {
      return constants.CHOICE_QUESTION_NUM + constants.JUDGE_QUESTION_NUM;
    }
  },
  async created() {
    this.loading = true;
    await this.getPaper();
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
.submit-button {
  position: absolute;
  left: 1rem;
}

.page-button-group {
  position: absolute;
  right: 1rem;
}

.circle {
  margin-bottom: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: 2px solid black;
  border-radius: 50%;

  &.selected {
    background-color: #00c3ff;
  }
}

.van-row {
  margin: 1rem;
}

.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 4px;
}

.question {
  width: 100%;
  padding: 1rem;
  margin: 0;
  box-sizing: border-box;
  text-align: center;

  .question-head {
    font-weight: 700;
    font-size: 1rem;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  .question-body {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
    padding-top: 2rem;

    .van-radio {
      line-height: 2rem;
      min-height: 1.7rem;
    }
  }
}

.grid-item-selected {
  border-bottom: lightgreen solid 5px;
}
</style>

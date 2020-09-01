<template>
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

    <van-notice-bar
      :scrollable="false"
      :text="`您的成绩：${completePaper.score} / 100`"
    />
    <div class="details">
      <h2 class="details-header">答题详情</h2>

      <div
        :class="[
          'card',
          item.answer === completePaper.choiceAnswerSheet[index]
            ? 'correct'
            : 'wrong'
        ]"
        v-for="(item, index) in completePaper.choiceQuestions"
        :key="item.id"
      >
        <van-cell
          :title="
            `#${index + 1} 选择题（${constants.CHOICE_QUESTION_SCORE}分）`
          "
        >
        </van-cell>
        <div class="question">
          <h3 class="question-head">{{ item.question }}</h3>
          <div class="question-body">
            <van-radio-group :value="completePaper.choiceAnswerSheet[index]">
              <van-radio
                :name="0"
                :checked-color="item.answer === 0 ? '#07c160' : 'red'"
              >
                <span>{{ "A. " + item.choiceA }}</span>
              </van-radio>
              <van-radio
                :name="1"
                :checked-color="item.answer === 1 ? '#07c160' : 'red'"
              >
                {{ "B. " + item.choiceB }}
              </van-radio>
              <van-radio
                :name="2"
                :checked-color="item.answer === 2 ? '#07c160' : 'red'"
              >
                {{ "C. " + +item.choiceC }}
              </van-radio>
              <van-radio
                :name="3"
                :checked-color="item.answer === 3 ? '#07c160' : 'red'"
              >
                {{ "D. " + item.choiceD }}
              </van-radio>
            </van-radio-group>
            本题答案：{{ String.fromCharCode(item.answer + 65) }}
          </div>
        </div>
      </div>

      <div
        :class="[
          'card',
          item.answer === completePaper.choiceAnswerSheet[index]
            ? 'correct'
            : 'wrong'
        ]"
        v-for="(item, index) in completePaper.judgeQuestions"
        :key="item.id"
      >
        <van-cell
          :title="
            `#${index + constants.CHOICE_QUESTION_NUM + 1} 判断题（${
              constants.JUDGE_QUESTION_SCORE
            }分）`
          "
        >
        </van-cell>
        <div class="question">
          <h3 class="question-head">{{ item.question }}</h3>
          <div class="question-body">
            <van-radio-group :value="completePaper.judgeAnswerSheet[index]">
              <van-radio
                :name="0"
                :checked-color="item.answer === 1 ? '#07c160' : 'red'"
              >
                正确
              </van-radio>
              <van-radio
                :name="1"
                :checked-color="item.answer === 0 ? '#07c160' : 'red'"
              >
                错误
              </van-radio>
            </van-radio-group>
            本题答案：{{ item.answer ? "正确" : "错误" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeToken } from "@/utils/storage";
import paperApi from "@/api/paper";
import canstants from "@/constants";

export default {
  data() {
    return {
      showPopup: false,
      completePaper: {},
      constants: canstants
    };
  },
  methods: {
    onClickRight() {
      this.showPopup = !this.showPopup;
    },
    onLogout() {
      removeToken();
      this.$router.push("/login");
      this.$store.commit("user/CLEAR_INFO");
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    }
  },
  async created() {
    this.completePaper = await paperApi.getCompletePaper();
  }
};
</script>

<style lang="scss" scoped>
.details {
  margin: 0 1rem;

  .card {
    margin-bottom: 24px;
    padding: 1rem;
    background-color: #fff;
    border-radius: 1rem;

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
  }

  .correct {
    border: #07c160 2px solid;
    box-shadow: 0 0.6rem 1rem #07c16148;
  }

  .wrong {
    border: #ff0000 2px solid;
    box-shadow: 0 0.6rem 1rem #ff000048;
  }
}
</style>

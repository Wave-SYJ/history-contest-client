<template>
  <div>
    <van-cell :title="`#${currentId} ${currentType}`">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #default>
        <van-count-down :time="remainTime">
          <template #default="timeData">
            <span class="block">{{ formatTimeNumber(timeData.hours) }}</span>
            <span class="colon">:</span>
            <span class="block">{{ formatTimeNumber(timeData.minutes) }}</span>
            <span class="colon">:</span>
            <span class="block">{{ formatTimeNumber(timeData.seconds) }}</span>
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
          v-model="updatedAnswer"
          @change="name => $emit('change', name)"
        >
          <van-radio :name="0">{{ currentQuestion.choiceA }}</van-radio>
          <van-radio :name="1">{{ currentQuestion.choiceB }}</van-radio>
          <van-radio :name="2">{{ currentQuestion.choiceC }}</van-radio>
          <van-radio :name="3">{{ currentQuestion.choiceD }}</van-radio>
        </van-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updatedAnswer: -1
    };
  },
  methods: {
    formatTimeNumber(num) {
      return num < 10 ? "0" + num : num;
    }
  },
  props: [
    "currentQuestion",
    "currentType",
    "currentId",
    "currentAnswer",
    "remainTime"
  ]
};
</script>

<style lang="scss" scoped>
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
</style>

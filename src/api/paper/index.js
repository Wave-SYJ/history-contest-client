import request from "@/utils/request";

export default {
  generatePaper() {
    return request({
      url: "/paper/generate",
      method: "get"
    });
  },
  calibrateTime(time) {
    return request({
      url: "/paper/calibrate",
      method: "post",
      data: {
        time
      }
    });
  },
  getPaper() {
    return request({
      url: "/paper",
      method: "get"
    });
  },
  selectChoiceAnswer(answerSheet) {
    return request({
      url: "/paper/choice",
      method: "put",
      data: answerSheet
    });
  },
  selectJudgeAnswer(answerSheet) {
    return request({
      url: "paper/judge",
      method: "put",
      data: answerSheet
    });
  },
  submit() {
    return request({
      url: "paper/submit",
      method: "put"
    });
  },
  getCompletePaper() {
    return request({
      url: "paper/complete",
      method: "get"
    });
  }
};

import request from "@/utils/request";

export default {
  getQuestionList() {
    return request({
      url: "/choice/list",
      method: "get"
    });
  },
  getQuestionPage(current, size) {
    return request({
      url: "/choice/page",
      method: "post",
      data: {
        pageIndex: current,
        pageSize: size
      }
    });
  },
  editQuestion(question) {
    return request({
      url: "/choice/edit",
      method: "put",
      data: question
    });
  },
  insertQuestion(question) {
    return request({
      url: "/choice/insert",
      method: "put",
      data: question
    });
  },
  deleteQuestion(id) {
    return request({
      url: "choice/" + id,
      method: "delete"
    });
  },
  deleteQuestions(ids) {
    return request({
      url: "choice",
      method: "delete",
      data: ids
    });
  }
};

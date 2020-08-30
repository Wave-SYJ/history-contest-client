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
  }
};

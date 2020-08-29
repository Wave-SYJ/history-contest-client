import request from "@/utils/request";

export default {
  getInfo() {
    return request({
      url: "/user",
      method: "get"
    });
  }
};

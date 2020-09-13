import request from "@/utils/request";

export default {
  get() {
    return request({
      url: "/department",
      method: "get"
    });
  }
};

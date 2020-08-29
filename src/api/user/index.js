import request from "@/utils/request";

export default {
  getInfo() {
    return request({
      url: "/user",
      method: "get"
    });
  },
  getStudentList() {
    return request({
      url: "/user/student/list",
      method: "get"
    });
  },
  editStudent(student) {
    return request({
      url: "user/student/edit",
      method: "put",
      data: student
    });
  },
  deleteStudent(id) {
    return request({
      url: "user/student/" + id,
      method: "delete"
    });
  },
  deleteStudents(ids) {
    return request({
      url: "user/student",
      method: "delete",
      data: ids
    });
  },
  insertStudent(student) {
    return request({
      url: "user/student/insert",
      method: "put",
      data: student
    });
  }
};

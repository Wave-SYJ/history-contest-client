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
  getStudentPage(current, size) {
    return request({
      url: "/user/student/page",
      method: "post",
      data: {
        pageIndex: current,
        pageSize: size
      }
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
  },
  changePassword(data) {
    return request({
      url: "user/password",
      method: "put",
      data
    });
  },
  queryStudent(pageIndex, pageSize, queryType, queryValue) {
    return request({
      url: "user/student/query",
      method: "post",
      data: {
        pageIndex,
        pageSize,
        queryType,
        queryValue
      }
    });
  },
  exportStudentList() {
    // console.log(request);
    // return request({
    //   url: "user/student/export",
    //   method: "get",
    //   config: {
    //     responseType: "blob"
    //   }
    // });
    return request.get("user/student/export", {
      responseType: "blob"
    });
  },
  importStudentAndInsert(formData) {
    return request({
      url: "user/student/import/insert",
      data: formData,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  importStudentAndCover(formData) {
    return request({
      url: "user/student/import/cover",
      data: formData,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  getCount() {
    return request({
      url: "user/student/count",
      method: "get"
    });
  },
  deleteAll() {
    return request({
      url: "user/student/all",
      method: "delete"
    });
  },
  deleteAdmin(id) {
    return request({
      url: "user/admin/" + id,
      method: "delete"
    });
  },
  deleteAdmins(ids) {
    return request({
      url: "user/admins",
      method: "delete",
      data: ids
    });
  },
  getAdminList() {
    return request({
      url: "/user/admin/list",
      method: "get"
    });
  },
  insertAdmin(data) {
    console.log(data);
    return request({
      url: "/user/admin/insert",
      method: "put",
      data
    });
  },
  editAdmin(data) {
    return request({
      url: "/user/admin",
      method: "put",
      data
    });
  },
  importAdminAndInsert(formData) {
    return request({
      url: "user/admin/import/insert",
      data: formData,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  importAdminAndCover(formData) {
    return request({
      url: "user/admin/import/cover",
      data: formData,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
};

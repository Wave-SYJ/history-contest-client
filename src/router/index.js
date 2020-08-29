import Vue from "vue";
import VueRouter from "vue-router";
import constants from "@/constants.js";

Vue.use(VueRouter);

export const menuList = [
  {
    path: "/index",
    component: () => import("@/views/pages/Welcome.vue"),
    meta: { title: "主页", role: constants.ROLE_ALL, icon: "el-icon-s-home" }
  },
  {
    path: "/exam",
    meta: {
      title: "答题",
      role: constants.ROLE_STUDENT,
      icon: "el-icon-s-order"
    }
  },
  {
    path: "/students",
    component: () => import("@/views/pages/StudentList.vue"),
    meta: {
      title: "学生列表",
      role: constants.ROLE_ADMIN,
      icon: "el-icon-s-grid"
    }
  }
];

export const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    component: () => import("@/views/Home.vue"),
    redirect: "/index",
    children: menuList
  }
];

const router = new VueRouter({
  routes
});

export default router;

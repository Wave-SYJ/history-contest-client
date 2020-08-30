import Vue from "vue";
import VueRouter from "vue-router";
import constants from "@/constants.js";
import { isMobile } from "@/utils/device";

Vue.use(VueRouter);

export const menuList = [
  {
    path: "/index",
    component: () =>
      isMobile()
        ? import("@/views/mobile/pages/Welcome.vue")
        : import("@/views/pc/pages/Welcome.vue"),
    meta: { title: "主页", role: constants.ROLE_ALL, icon: "el-icon-s-home" }
  },
  {
    path: "/exam",
    component: () => import("@/views/mobile/pages/Exam.vue"),
    meta: {
      title: "答题",
      role: constants.ROLE_STUDENT,
      icon: "el-icon-s-order"
    }
  },
  {
    path: "/students",
    component: () => import("@/views/pc/pages/StudentList.vue"),
    meta: {
      title: "学生列表",
      role: constants.ROLE_ADMIN,
      icon: "el-icon-s-grid"
    }
  },
  {
    path: "/choice",
    component: () => import("@/views/pc/pages/ChoiceQuestionList.vue"),
    meta: {
      title: "选择题列表",
      role: constants.ROLE_ADMIN,
      icon: "el-icon-s-grid"
    }
  },
  {
    path: "/judge",
    component: () => import("@/views/pc/pages/JudgeQuestionList.vue"),
    meta: {
      title: "判断题列表",
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
    component: () =>
      isMobile()
        ? import("@/views/mobile/Home.vue")
        : import("@/views/pc/Home.vue"),
    redirect: "/index",
    children: menuList
  }
];

const router = new VueRouter({
  routes
});

export default router;

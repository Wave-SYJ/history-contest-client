import Vue from "vue";
import VueRouter from "vue-router";
import constants from "@/constants.js";
import { isMobile } from "@/utils/device";
import store from "@/store";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

export const menuList = [
  {
    path: "/index",
    name: "index",
    component: () =>
      isMobile()
        ? import("@/views/mobile/pages/Welcome.vue")
        : import("@/views/pc/pages/Welcome.vue"),
    meta: {
      title: "主页",
      icon: "el-icon-s-home",
      role: [constants.ROLE_ADMIN, constants.ROLE_STUDENT]
    }
  },
  {
    path: "/students",
    name: "students",
    component: () => import("@/views/pc/pages/StudentList.vue"),
    meta: {
      title: "学生列表",
      role: [constants.ROLE_ADMIN],
      icon: "el-icon-s-grid"
    }
  },
  {
    path: "/choice",
    name: "choice",
    component: () => import("@/views/pc/pages/ChoiceQuestionList.vue"),
    meta: {
      title: "选择题列表",
      role: [constants.ROLE_ADMIN],
      icon: "el-icon-s-grid"
    }
  },
  {
    path: "/judge",
    name: "judge",
    component: () => import("@/views/pc/pages/JudgeQuestionList.vue"),
    meta: {
      title: "判断题列表",
      role: [constants.ROLE_ADMIN],
      icon: "el-icon-s-grid"
    }
  },
  {
    path: "/details",
    name: "details",
    component: () => import("@/views/mobile/pages/Details.vue"),
    meta: {
      role: [constants.ROLE_STUDENT],
      status: [constants.STATUS_SUBMITTED]
    }
  },
  {
    path: "/exam/:id",
    name: "exam",
    component: () => import("@/views/mobile/pages/Exam.vue"),
    meta: {
      role: [constants.ROLE_STUDENT],
      status: [
        constants.STATUS_NOT_START,
        constants.STATUS_GENERATED,
        constants.STATUS_STARTED
      ]
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
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    name: "home",
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

router.beforeEach(async (to, from, next) => {
  if (to.name == "login" || to.name == "index") {
    next();
    return;
  }

  if (store.state.user.id == -1) {
    await store.dispatch("user/getInfo");
  }

  const role = store.state.user.role;
  const status = store.state.user.status;

  if (
    to.meta.role.some(r => r == constants.ROLE_ADMIN) &&
    role == constants.ROLE_ADMIN
  )
    next();

  if (
    to.meta.role.some(r => r == constants.ROLE_STUDENT) &&
    role == constants.ROLE_STUDENT &&
    to.meta.status.some(s => s == status)
  )
    next();

  next(false);
});

export default router;

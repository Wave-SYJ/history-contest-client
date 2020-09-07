import Vue from "vue";
import VueRouter from "vue-router";
import constants from "@/constants.js";
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
    path: "/admin/index",
    name: "index",
    component: () => import("@/views/admin/pages/Welcome.vue"),
    meta: {
      title: "主页",
      icon: "el-icon-s-home",
      role: [constants.ROLE_ADMIN]
    }
  },
  {
    path: "/admin/students",
    name: "students",
    component: () => import("@/views/admin/pages/StudentList.vue"),
    meta: {
      title: "学生列表",
      icon: "el-icon-s-grid",
      role: [constants.ROLE_ADMIN]
    }
  },
  {
    path: "/admin/choice",
    name: "choice",
    component: () => import("@/views/admin/pages/ChoiceQuestionList.vue"),
    meta: {
      title: "选择题列表",
      icon: "el-icon-s-grid",
      role: [constants.ROLE_ADMIN]
    }
  },
  {
    path: "/admin/judge",
    name: "judge",
    component: () => import("@/views/admin/pages/JudgeQuestionList.vue"),
    meta: {
      title: "判断题列表",
      icon: "el-icon-s-grid",
      role: [constants.ROLE_ADMIN]
    }
  }
];

export const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/admin/home",
    name: "admin-home",
    redirect: "/admin/index",
    component: () => import("@/views/admin/Home.vue"),
    children: menuList,
    meta: {
      role: [constants.ROLE_ADMIN]
    }
  },
  {
    path: "/student/home",
    name: "student-home",
    redirect: "student/index",
    component: () => import("@/views/student/Home.vue"),
    meta: {
      role: [constants.ROLE_STUDENT],
      status: [
        constants.STATUS_NOT_START,
        constants.STATUS_GENERATED,
        constants.STATUS_STARTED,
        constants.STATUS_SUBMITTED
      ]
    },
    children: [
      {
        path: "/student/index",
        component: () => import("@/views/student/pages/Welcome.vue"),
        meta: {
          role: [constants.ROLE_STUDENT],
          status: [
            constants.STATUS_NOT_START,
            constants.STATUS_GENERATED,
            constants.STATUS_STARTED,
            constants.STATUS_SUBMITTED
          ]
        }
      },
      {
        path: "/student/exam/:id",
        name: "exam",
        component: () => import("@/views/student/pages/Exam.vue"),
        meta: {
          role: [constants.ROLE_STUDENT],
          status: [
            constants.STATUS_NOT_START,
            constants.STATUS_GENERATED,
            constants.STATUS_STARTED
          ]
        }
      },
      {
        path: "/student/details",
        name: "details",
        component: () => import("@/views/student/pages/Details.vue"),
        meta: {
          role: [constants.ROLE_STUDENT],
          status: [constants.STATUS_SUBMITTED]
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.name == "login") return next();

  if (store.state.user.id == -1) {
    await store.dispatch("user/getInfo");
  }

  const role = store.state.user.role;
  const status = store.state.user.status;

  if (
    to.meta.role.some(r => r == constants.ROLE_ADMIN) &&
    role == constants.ROLE_ADMIN
  )
    return next();
  if (
    to.meta.role.some(r => r == constants.ROLE_STUDENT) &&
    role == constants.ROLE_STUDENT &&
    to.meta.status.some(s => s == status)
  )
    return next();

  next({
    name: "login",
    query: { redirect: to.meta.redirect }
  });
});

export default router;

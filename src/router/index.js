import Vue from "vue";
import VueRouter from "vue-router";
import constants from "@/constants.js";
import store from "@/store";

Vue.use(VueRouter);

const Login = resolve => require(["@/views/Login.vue"], resolve);
const Register = resolve => require(["@/views/Register.vue"], resolve);

const AdminHome = resolve => require(["@/views/admin/Home.vue"], resolve);
const StudentHome = resolve => require(["@/views/student/Home.vue"], resolve);

const StudentIndex = resolve =>
  require(["@/views/student/pages/Welcome.vue"], resolve);
const Exam = resolve => require(["@/views/student/pages/Exam.vue"], resolve);
const Details = resolve =>
  require(["@/views/student/pages/Details.vue"], resolve);

const AdminIndex = resolve =>
  require(["@/views/admin/pages/Welcome.vue"], resolve);
const StudentList = resolve =>
  require(["@/views/admin/pages/StudentList.vue"], resolve);
const ChoiceList = resolve =>
  require(["@/views/admin/pages/ChoiceQuestionList.vue"], resolve);
const JudgeList = resolve =>
  require(["@/views/admin/pages/JudgeQuestionList.vue"], resolve);
const ChangePassword = resolve =>
  require(["@/views/admin/pages/ChangePassword.vue"], resolve);

export const menuList = [
  {
    path: "/admin/index",
    name: "index",
    component: AdminIndex,
    meta: {
      title: "主页",
      icon: "el-icon-s-home",
      role: [constants.ROLE_ADMIN]
    }
  },
  {
    path: "/admin/students",
    name: "students",
    component: StudentList,
    meta: {
      title: "学生列表",
      icon: "el-icon-s-grid",
      role: [constants.ROLE_ADMIN]
    }
  },
  {
    path: "/admin/choice",
    name: "choice",
    component: ChoiceList,
    meta: {
      title: "选择题列表",
      icon: "el-icon-s-grid",
      role: [constants.ROLE_ADMIN]
    }
  },
  {
    path: "/admin/judge",
    name: "judge",
    component: JudgeList,
    meta: {
      title: "判断题列表",
      icon: "el-icon-s-grid",
      role: [constants.ROLE_ADMIN]
    }
  },
  {
    path: "/admin/changePassword",
    name: "changePassword",
    component: ChangePassword,
    meta: {
      title: "修改密码",
      icon: "el-icon-lock",
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
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/admin/home",
    name: "admin-home",
    redirect: "/admin/index",
    component: AdminHome,
    children: menuList,
    meta: {
      role: [constants.ROLE_ADMIN]
    }
  },
  {
    path: "/student/home",
    name: "student-home",
    redirect: "student/index",
    component: StudentHome,
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
        component: StudentIndex,
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
        component: Exam,
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
        component: Details,
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
  if (to.name == "login" || to.name == "register") return next();

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

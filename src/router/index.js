import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

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
    children: [
      {
        path: "/index",
        component: () => import("@/views/pages/Welcome.vue")
      },
      {
        path: "/exam"
      },
      {
        path: "/students",
        component: () => import("@/views/pages/StudentList.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;

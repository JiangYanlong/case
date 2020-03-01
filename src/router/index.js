import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/views/layout/Layout";
export const constantRouterMap = [
  {
    path: "",
    component: Layout,
    redirect: "case",
    children: [
      {
        path: "case",
        component: () => import("@/views/case/index"),
        name: "portal",
        meta: {
          title: "首页",
          icon: "case",
          noCache: true,
          requireAuth: true
        }
      },
      {
        path: "caseExecute",
        component: () => import("@/views/case/caseExecute/index"),
        name: "caseExecute",
        meta: {
          title: "预案执行",
          icon: "caseExecute",
          noCache: true,
          requireAuth: true
        }
      },
      {
        path: "casePre",
        component: () => import("@/views/case/casePre/index"),
        name: "casePre",
        meta: {
          title: "预案实例",
          icon: "casePre",
          noCache: true,
          requireAuth: true
        }
      },
      {
        path: "caseStart",
        component: () => import("@/views/case/caseStart/index"),
        name: "caseStart",
        meta: {
          title: "预案启动",
          icon: "caseStart",
          noCache: true,
          requireAuth: true
        }
      },
      {
        path: "caseTmp",
        component: () => import("@/views/case/caseTmp/index"),
        name: "caseTmp",
        meta: {
          title: "预案模板",
          icon: "caseTmp",
          noCache: true,
          requireAuth: true
        }
      },
    ]
  }
];

const router = new Router({
  mode: "history", // require service support
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export default router;

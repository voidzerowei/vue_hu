import { createRouter, createWebHistory } from "vue-router";

// 定义路由配置
const routes = [
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/dashboard-index.vue"),
    hidden: true,
  },
  {
    path: "/x6",
    component: () => import("@/views/antv-x6/x6-index.vue"),
    hidden: true,
  },
  {
    path: "/ruanzhu",
    component: () => import("@/views/ruanzhu/ruan-zhu.vue"),
    hidden: true,
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/themes";
import DataList from "../pages/Task1/DataList.vue";
import DataDetail from "../pages/Task1/DataDetail.vue";
import DataAdd from "../pages/Task1/DataAdd.vue";
import TableList from "../pages/Task2/TableList.vue";
import TableDetail from "../pages/Task2/TableDetail.vue";
import TableAdd from "../pages/Task2/TableAdd.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "/data-list",
          name: "data-list",
          component: DataList,
        },
        {
          path: "/data-list/:id",
          name: "data-detail",
          component: DataDetail,
          meta: {
            parent: "data-list", // Changed from activeMenu to parent
          },
        },
        {
          path: "/data-list/add",
          name: "add-data",
          component: DataAdd,
          meta: {
            parent: "data-list", // Changed from activeMenu to parent
          },
        },
        {
          path: "/table-list",
          name: "table-list",
          component: TableList,
        },
        {
          path: "/table-list/:id",
          name: "table-detail",
          component: TableDetail,
          meta: {
            parent: "table-list", // Changed from activeMenu to parent
          },
        },
        {
          path: "/table-list/add",
          name: "add-table",
          component: TableAdd,
          meta: {
            parent: "table-list", // Changed from activeMenu to parent
          },
        },
      ],
    },
  ],
});

export default router;

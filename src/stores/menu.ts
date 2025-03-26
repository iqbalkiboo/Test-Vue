import { type Icon } from "@/components/Base/Lucide/Lucide.vue";
import { defineStore } from "pinia";

export interface Menu {
  icon: Icon;
  title: string;
  badge?: number;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface MenuState {
  value: Array<Menu | string>;
}

export const useMenuStore = defineStore("menu", {
  state: (): MenuState => ({
    value: [
      "DATA",
      {
        icon: "ActivitySquare",
        pageName: "data-list",
        title: "Data List",
      },
      {
        icon: "Database",
        pageName: "table-list",
        title: "Table List",
      },
    ],
  }),
});

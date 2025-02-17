// store/slices/menuSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../../types";

interface MenuState {
  menus: MenuItem[];
}

const initialState: MenuState = {
  menus: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus(state, action: PayloadAction<MenuItem[]>) {
      state.menus = action.payload;
    },

    addMenu(state, action: PayloadAction<MenuItem>) {
      const newMenu = action.payload;

      const addMenuRecursive = (menus: MenuItem[], newMenu: MenuItem): MenuItem[] => {
        return menus.map((menu) => {
          if (menu.id === newMenu.parentId) {
            return {
              ...menu,
              children: menu.children ? [...menu.children, newMenu] : [newMenu],
            };
          }
          return {
            ...menu,
            children: menu.children ? addMenuRecursive(menu.children, newMenu) : menu.children,
          };
        });
      };

      if (newMenu.parentId) {
        state.menus = addMenuRecursive(state.menus, newMenu);
      } else {
        state.menus = [...state.menus, newMenu];
      }
    },

    updateMenu(state, action: PayloadAction<{ menuId: string; updatedMenu: Partial<MenuItem> }>) {
      const { menuId, updatedMenu } = action.payload;

      const updateMenuRecursive = (menus: MenuItem[]): MenuItem[] => {
        return menus.map((menu) => {
          if (menu.id === menuId) {
            return { ...menu, ...updatedMenu }; // Merge updates into the menu item
          }
          return {
            ...menu,
            children: menu.children ? updateMenuRecursive(menu.children) : menu.children,
          };
        });
      };

      state.menus = updateMenuRecursive(state.menus);
    },

    deleteMenu(state, action: PayloadAction<string>) {
      const menuId = action.payload;

      const deleteMenuRecursive = (menus: MenuItem[]): MenuItem[] => {
        return menus
          .filter((menu) => menu.id !== menuId) // Remove the matching menu
          .map((menu) => ({
            ...menu,
            children: menu.children ? deleteMenuRecursive(menu.children) : menu.children,
          }));
      };

      state.menus = deleteMenuRecursive(state.menus);
    },
  },
});

export const { setMenus, addMenu, updateMenu, deleteMenu } = menuSlice.actions;
export default menuSlice.reducer;

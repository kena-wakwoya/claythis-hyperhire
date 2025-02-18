
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../../types";

interface MenuState {
  menus: MenuItem[];
  selectedMenu: MenuItem | null;
  selectedSubmenu: MenuItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menus: [],
  selectedMenu: null,
  selectedSubmenu: null,
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenus(state, action: PayloadAction<MenuItem[]>) {
      state.menus = action.payload;
    },
    setSelectedMenu(state, action: PayloadAction<MenuItem>) {
      state.selectedMenu = action.payload;
    },
    setSubSelectedMenu(state, action: PayloadAction<MenuItem>) {
      state.selectedSubmenu = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    addMenu(state, action: PayloadAction<MenuItem>) {
      state.menus = [...state.menus, action.payload]; // ✅ Ensure a new array
    },
    updateMenu(state, action: PayloadAction<MenuItem>) {
      state.menus = state.menus.map((menu) =>
        menu.id === action.payload.id ? { ...menu, ...action.payload } : menu
      );
    },
    deleteMenu(state, action: PayloadAction<string>) {
      const deleteMenuRecursive = (menus: MenuItem[], id: string): MenuItem[] =>
        menus
          .filter((menu) => menu.id !== id) // ✅ Remove the menu
          .map((menu) => ({
            ...menu,
            children: menu.children ? deleteMenuRecursive(menu.children, id) : menu.children,
          }));

      state.menus = deleteMenuRecursive(state.menus, action.payload);
    },
  },
});

export const {
  setMenus,
  setSelectedMenu,
  setLoading,
  setError,
  addMenu,
  updateMenu,
  deleteMenu,
  setSubSelectedMenu
} = menuSlice.actions;

export default menuSlice.reducer;

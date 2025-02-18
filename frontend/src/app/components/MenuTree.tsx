// components/MenuTree.tsx
"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { MenuItem } from "../types";
import FileSystemMenu from "./FileSystemMenu";
import MenuDetail from "./MenuDetail";
import { success_toaster } from "../utils/toaster";
import {
  fetchMenus,
  addMenu,
  updateMenu,
  deleteMenu,
  fetchMenusByID,
} from "../lib/api";
import ConfirmationModal from "./Modal";
import Loader from "./Loader";
import { findMenuById } from "../utils/utils";
import {
  setMenus,
  setSelectedMenu,
  setLoading,
  setError,
  addMenu as addMenuAction,
  updateMenu as updateMenuAction,
  deleteMenu as deleteMenuAction,
} from "../store/slices/menuSlice";

const MenuTree = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { menus, selectedMenu, loading } = useSelector(
    (state: RootState) => state.menu
  );
  const [selectedSubmenu, setSelectedSubmenu] = useState<MenuItem | null>(null);
  const [parentMenuForNew, setParentMenuForNew] = useState<MenuItem | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(true); // Set to true to expand all by default

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<MenuItem | null>(null);
  const [isSubMenuClick, setIsSubMenuClicked] = useState<boolean>(false);
  const [buttonType, setButtonType] = useState("expand_all");

  useEffect(() => {
    fetchAllMenus();
  }, []);

  const fetchAllMenus = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetchMenus();
      if (response) {
        dispatch(setMenus(response));
      } else {
        dispatch(setError("No menus found."));
      }
    } catch (error) {
      dispatch(setError("Failed to fetch menus"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleMenuChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    dispatch(setLoading(true));

    try {
      const response = await fetchMenusByID(selectedId);
      if (response) {
        dispatch(setSelectedMenu(response));
      } else {
        dispatch(setError("Menu not found."));
      }
    } catch (error) {
      dispatch(setError("Failed to fetch menu by ID"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSelectSubMenu = (menu: MenuItem) => {
    setSelectedSubmenu(menu);
    setParentMenuForNew(null);
  };

  const handleAdd = (menuId: string) => {
    const parentMenu = findMenuById(menus, menuId);
    if (parentMenu) {
      setParentMenuForNew(parentMenu);
      setSelectedSubmenu(null);
    }
  };

  const handleDelete = (menu: MenuItem) => {
    setMenuToDelete(menu);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!menuToDelete) return;
    dispatch(setLoading(true));

    try {
      const response: any = await deleteMenu(menuToDelete.id);
      if (response?.success) {
        dispatch(deleteMenuAction(menuToDelete.id));
        success_toaster(response.message);
      } else {
        dispatch(setError(response?.message || "Failed to delete menu"));
      }
    } catch (error) {
      dispatch(setError("Failed to delete menu"));
    } finally {
      dispatch(setLoading(false));
      setIsModalOpen(false);
      setMenuToDelete(null);
    }
  };

  const handleSave = async (menu: MenuItem) => {
    console.log("menu: ", menu);
    dispatch(setLoading(true));

    try {
      let response: any;
      if (menu.id) {
        response = await updateMenu(menu, menu.id);

        if (response?.success) {
          dispatch(updateMenuAction(response.data));
          success_toaster(response.message);
        }
      } else {
        response = await addMenu(menu);

        if (response?.success) {
          dispatch(addMenuAction(response.data));
          success_toaster(response.message);
          fetchAllMenus(); // Only refetch menus when adding a new menu
        }
      }
    } catch (error) {
      dispatch(setError("Failed to save menu"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-4 w-full flex flex-col">
      {loading ? (
        <Loader width="20" height="20" color="red" />
      ) : (
        <div className="flex flex-col">
          <label>Menu</label>
          <select
            value={selectedMenu?.id ?? ""}
            onChange={handleMenuChange}
            className="p-3 bg-lightGray text-black rounded md:w-96 w-full overflow-hidden"
          >
            {Array.isArray(menus) &&
              menus.length > 0 &&
              menus.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.name}
                </option>
              ))}
          </select>

          <div className="flex flex-col lg:flex-row items-start justify-between md:p-3 my-3">
            <div className="flex flex-col items-start lg:w-1/2 w-full">
              <div className="w-full flex items-center md:gap-7 gap-1 md:p-5 p-2 my-2">
                <button
                  className={`rounded-3xl px-7 py-2 ${
                    buttonType === "expand_all"
                      ? "bg-main text-white"
                      : "border border-gray-700 text-black"
                  }`}
                  onClick={() => {
                    setMenuOpen(true);
                    setButtonType("expand_all");
                  }}
                >
                  Expand All
                </button>
                <button
                  className={`px-7 py-2 rounded-3xl ${
                    buttonType === "collapse_all"
                      ? "bg-main text-white"
                      : "text-black border border-gray-700"
                  }`}
                  onClick={() => {
                    setMenuOpen(false);
                    setButtonType("collapse_all");
                  }}
                >
                  Collapse All
                </button>
              </div>
              {selectedMenu && (
                <FileSystemMenu
                  menus={[selectedMenu]}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  onSubMenuSelect={handleSelectSubMenu}
                  setIsSubMenuClicked={setIsSubMenuClicked}
                  menuOpen={menuOpen}
                />
              )}
            </div>
            <MenuDetail
              menu={selectedSubmenu}
              parentMenu={parentMenuForNew}
              onSave={handleSave}
              isSubMenuClick={isSubMenuClick}
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this menu?"
          menuTobeDeleted={menuToDelete}
        />
      )}
    </div>
  );
};

export default MenuTree;

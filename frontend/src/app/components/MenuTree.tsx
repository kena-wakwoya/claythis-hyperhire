"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setMenus } from "../store/slices/menuSlice";
import { deleteMenu, fetchMenus } from "../lib/api";
import { MenuItem, MenuLabel } from "../types";
import FileSystemMenu from "./FileSystemMenu";
import MenuDetail from "./MenuDetail";
import { findMenuById } from "../utils/utils";
import { error_toaster, success_toaster } from "../utils/toaster";
import { deleteMenu as deleteMenuAction } from "../store/slices/menuSlice";
import ConfirmationModal from "./Modal";

const MenuTree = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menus = useSelector((state: RootState) => state.menu.menus);

  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(menus[0]);
  const [selectedSubmenu, setSelectedSubmenu] = useState<MenuItem | null>(null);
  const [parentMenuForNew, setParentMenuForNew] = useState<MenuItem | null>(
    null
  ); // Parent menu for new submenu

  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for confirmation modal
  const [menuToDelete, setMenuToDelete] = useState<MenuItem | null>(null); // ID of the menu to delete

  const toggle = () => setIsOpen(!isOpen);
  const handleCollapseAll = () => setIsOpen(false);
  const handleExpandAll = () => setIsOpen(true);


  useEffect(() => {
    const getMenus = async () => {
      const data = await fetchMenus();
      dispatch(setMenus(data));
      setSelectedMenu(data[0]);
    };
    getMenus();
  }, [dispatch]);

  const handleSelectSubMenu = (menu: MenuItem) => {
    setSelectedSubmenu(menu);
    setParentMenuForNew(null);
  };

  // Handle adding a new submenu
  const handleAdd = (menuId: string) => {
    const parentMenu = findMenuById(menus, menuId); // Find the parent menu
    if (parentMenu) {
      setParentMenuForNew(parentMenu);
      setSelectedSubmenu(null); // Reset selected submenu
    }
  };

  // Handle saving a menu (new or updated)
  const handleSave = (menu: MenuItem) => {
    console.log("Menu saved:", menu);
    // Update the state or refetch menus
  };

  // Handle delete menu
  const handleDelete = (menu: MenuItem) => {
    setMenuToDelete(menu); // Set the menu ID to delete
    setIsModalOpen(true); // Open the confirmation modal
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (menuToDelete) {
      try {
        const response: any = await deleteMenu(menuToDelete.id);
        if (response.success) {
          success_toaster(response.message);
          dispatch(deleteMenuAction(menuToDelete.id));
        } else {
          error_toaster(response.message);
        }
      } catch (error) {
        console.error("Failed to delete menu:", error);
        error_toaster("An error has occurred while deleting the menu");
      }
      setIsModalOpen(false); // Close the modal
      setMenuToDelete(null); // Reset the menu to delete
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal
    setMenuToDelete(null); // Reset the menu to delete
  };

  const handleMenuChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = menus.find((menu) => menu.id === selectedId);
    setSelectedMenu(selected || null);
  };

  return (
    <div className="p-4 w-full flex flex-col">
      <label>Menu</label>
      <select
        defaultValue={selectedMenu?.id}
        onChange={handleMenuChange}
        className="p-3 bg-lightGray text-black rounded md:w-96 w-full overflow-hidden"
      >
        {menus.map((menu) => (
          <option key={menu.id} value={menu.id}>
            {menu.name}
          </option>
        ))}
      </select>

      <div className="flex flex-col lg:flex-row items-start justify-between md:p-3 my-3">
        <div className="flex flex-col items-start lg:w-1/2 w-full">
          <div className="w-full flex items-center md:gap-7 gap-1 md:p-5 p-2 my-2">
            <button
              className="bg-main rounded-3xl px-7 py-2 text-white border-none outline-none"
              onClick={handleExpandAll}
            >
              Expand All
            </button>
            <button
              className="text-black bg-white border-[0.5px] border-gray-700 px-7 py-2 outline-none rounded-3xl"
              onClick={handleCollapseAll}
            >
              Collapse All
            </button>
          </div>
          {selectedMenu && (
            <FileSystemMenu
              menus={[selectedMenu]}
              toggle={toggle}
              isOpen={isOpen}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onSubMenuSelect={handleSelectSubMenu}
            />
          )}
        </div>
        {/* Call Menu detials here.. */}
        <MenuDetail
          menu={selectedSubmenu}
          parentMenu={parentMenuForNew}
          onSave={handleSave}
        />
      </div>
      {/* Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this menu"
          menuTobeDeleted={menuToDelete}
        />
      )}
    </div>
  );
};

export default MenuTree;

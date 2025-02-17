"use client";

import React, { useEffect, useState } from "react";
import { MenuItem } from "../types";
import { findParentMenuName } from "../utils/utils";
import { addMenu, updateMenu } from "../lib/api";
import { addMenu as addMenuAction } from "../store/slices/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import { success_toaster, error_toaster } from "../utils/toaster";
import { RootState } from "../store/store";

interface MenuDetailProps {
  menu: MenuItem | null;
  parentMenu?: MenuItem | null; // Parent menu for new submenu
  onSave: (menu: MenuItem) => void; // Callback for saving
}

const MenuDetail = ({ menu, parentMenu, onSave }: MenuDetailProps) => {
  // form state
  const [name, setName] = useState<string>(menu?.name ?? "");

  const [depth, setDepth] = useState<number>(menu?.depth ?? 0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [parentId, setParentId] = useState<string | null>(
    menu?.parentId ?? null
  );
  const [parentData, setParentData] = useState<string | null>(null);

  const menus = useSelector((state: RootState) => state.menu.menus);

  const dispatch = useDispatch();

  // Automatically fill fields when adding a new menu
  useEffect(() => {
    if (parentMenu) {
      setParentId(parentMenu.id);
      setDepth(parentMenu.depth + 1);
      setParentData(parentMenu.name);
    } else if (menu) {
      setParentId(menu.parentId ?? null);
      setDepth(menu.depth);
      setParentData(findParentMenuName(menus, menu.parentId ?? null));
      setName(menu.name ?? "");
    }
  }, [menu, parentMenu]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !depth) {
      setDisabled(true);
      return;
    }
    setSubmitting(true);
    const newMenu: MenuItem = {
      id: menu?.id || "", // Use existing ID for update, or leave empty for new menu
      name,
      parentId,
      depth,
      createdAt: menu?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      children: [],
    };

    try {
      let response: any;
      if (menu) {
        // Update existing menu
        response = await updateMenu(newMenu, menu.id);
      } else {
        // Add new menu
        response = await addMenu(newMenu);
      }
      if (response.success) {
        success_toaster(response.message);
        dispatch(addMenuAction(response.data)); // Update Redux store with new menu
        onSave(newMenu); // Notify parent component
      } else {
        error_toaster(response.message);
      }
      setSubmitting(false);
    } catch (error) {
      console.error("Failed to save menu:", error);
      error_toaster("An error occurred while saving the menu");
      setSubmitting(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="flex flex-col lg:w-1/2 w-full">
      <form className="flex flex-col p-3 w-full gap-2" onSubmit={handleSubmit}>
        {/* Menu ID */}
        <div className="flex flex-col gap-2 w-96">
          <label>Menu ID</label>
          <input
            name="id"
            value={menu?.id ?? ""}
            disabled
            className="bg-lightGray p-3 rounded-2xl cursor-not-allowed"
          />
        </div>

        {/* Depth */}
        <div className="flex flex-col gap-2 w-64">
          <label>Depth</label>
          <input
            name="depth"
            value={depth}
            disabled
            className="bg-lightGray p-3 rounded-2xl cursor-not-allowed"
          />
        </div>

        {/* Parent Data */}
        <div className="flex flex-col gap-2 w-64">
          <label>Parent Data</label>
          <input
            name="parentData"
            value={parentData ?? ""}
            disabled
            className="bg-lightGray p-3 rounded-2xl cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2 w-64">
          <label>Name</label>
          <input
            name="name"
            value={name}
            onChange={handleNameChange}
            className="bg-lightGray p-3 rounded-2xl"
            required
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={disabled}
          className={`bg-secondary rounded-3xl w-64 mt-5 px-7 py-3 text-white border-none outline-none ${
            disabled ? "cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default MenuDetail;

"use client";

import React, { useEffect, useState } from "react";
import { MenuItem } from "../types";
import { findParentMenuName } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { success_toaster, error_toaster } from "../utils/toaster";
import { AppDispatch, RootState } from "../store/store";
import { addMenu, updateMenu } from "../lib/api";
import { setMenus, setSelectedMenu } from "../store/slices/menuSlice";

interface MenuDetailProps {
  menu: MenuItem | null;
  parentMenu?: MenuItem | null;
  onSave: (menu: MenuItem) => void;
  isSubMenuClick: boolean;
}

const MenuDetail = ({
  menu,
  parentMenu,
  onSave,
  isSubMenuClick,
}: MenuDetailProps) => {
  const [name, setName] = useState<string>(menu?.name ?? "");
  const [depth, setDepth] = useState<number>(menu?.depth ?? 0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [parentId, setParentId] = useState<string | null>(
    menu?.parentId ?? null
  );
  const [parentData, setParentData] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const menus = useSelector((state: RootState) => state.menu.menus);
  const dispatch = useDispatch<AppDispatch>();

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
  }, [menu, parentMenu, menus]);

  useEffect(() => {
    setDisabled(name.trim().length < 4 && !isSubMenuClick);
  }, [name, isSubMenuClick]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 4) {
      setError("Name must be at least 4 characters long.");
      return;
    }

    setSubmitting(true);

    const newMenu: Partial<MenuItem> = {
      name,
      parentId,
      depth,
      updatedAt: new Date().toISOString(),
    };

    try {
      let response: any;
      if (menu?.id) {
        response = await updateMenu(newMenu as MenuItem, menu.id);
        if (response.success) {
          dispatch(setSelectedMenu(response.data));
          success_toaster(response.message);
          onSave(response.data);
        } else {
          error_toaster(response.message || "Failed to update menu");
        }
      } else {
        response = await addMenu(newMenu as MenuItem);
        console.log("============ save response ===========", response);

        if (response.success) {
          dispatch(setMenus([...menus, response.data])); // ✅ Correctly updates state
          success_toaster(response.message);
        } else {
          error_toaster(response.message || "Failed to add menu");
        }
      }
    } catch (error: any) {
      console.error("Failed to save menu:", error);
      error_toaster(error.message || "An error occurred while saving the menu");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.value.trim().length >= 4) {
      setError(""); // ✅ Clear error when valid
    }
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
          {error && (
            <span className="text-red-400 font-thin text-sm">{error}</span>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={disabled || submitting}
          className={`bg-secondary rounded-3xl w-64 mt-5 px-7 py-3 text-white border-none outline-none ${
            disabled || submitting ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default MenuDetail;

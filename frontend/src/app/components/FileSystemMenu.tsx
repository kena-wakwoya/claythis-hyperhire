import { useState } from "react";
import { MenuItem as MenuItemType } from "../types";
import Image from "next/image";
import { deleteMenu } from "../lib/api";
import { error_toaster, success_toaster } from "../utils/toaster";
import { useDispatch } from "react-redux";
import { deleteMenu as deleteMenuAction } from "../store/slices/menuSlice";

const MenuItem = ({
  menu,
  toggle,
  isOpen,
  onAdd,
  onDelete,
  onSubMenuSelect,
}: {
  menu: MenuItemType;
  toggle: () => void;
  isOpen: boolean;
  onAdd: (menuId: string) => void;
  onDelete: (menu: MenuItemType) => void;
  onSubMenuSelect: (menu: MenuItemType) => void;
}) => {
  const [showButtons, setShowButtons] = useState(false); // State for showing buttons
  const dispatch = useDispatch();

  // Show buttons when menu text is clicked
  const showMenuButtons = () => {
    setShowButtons(true);
  };

  const hideMenuButtons = () => {
    setShowButtons(false);
  };

  // Handle menu text click
  const handleMenuTextClick = () => {
    onSubMenuSelect(menu);
    // onAdd(menu.id);
  };

  // Handle add submenu
  const handleAdd = () => {
    onAdd(menu.id);
    setShowButtons(false);
  };

  return (
    <li>
      <div className="menu-item">
        {/* Arrow before the menu text */}
        {menu.children && menu.children.length > 0 && (
          <span className="arrow" onClick={toggle}>
            {isOpen ? (
              <Image
                src={"/icons/caret_up.svg"}
                width={26}
                height={26}
                alt="Caret up"
              />
            ) : (
              <Image
                src={"/icons/caret_down.svg"}
                width={26}
                height={26}
                alt="Caret down"
              />
            )}
          </span>
        )}

        <div
          className="flex gap-2 items-center"
          onMouseOver={showMenuButtons}
          onMouseOut={hideMenuButtons}
        >
          {/* Menu text */}
          <span className="menu-text" onClick={handleMenuTextClick}>
            {menu.name}
          </span>

          {/* Buttons for add and delete */}
          {showButtons && (
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center w-7 h-7 rounded-full shadow-lg bg-secondary p-2 text-white"
                onClick={handleAdd}
              >
                <Image
                  src={"/icons/plus.svg"}
                  width={16}
                  height={16}
                  alt="Plus icon"
                />
              </div>
              <div
                className="flex items-center justify-center w-7 h-7 rounded-full shadow-lg bg-red-600 text-white"
                onClick={() => onDelete(menu)}
              >
                <Image
                  src={"/icons/trash.svg"}
                  width={16}
                  height={16}
                  alt="Trash icon"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && menu.children && menu.children.length > 0 && (
        <ul>
          {menu.children.map((child) => (
            <MenuItem
              key={child.id}
              menu={child}
              toggle={toggle}
              isOpen={isOpen}
              onAdd={onAdd}
              onDelete={onDelete}
              onSubMenuSelect={onSubMenuSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const FileSystemMenu = ({
  menus,
  toggle,
  isOpen,
  onAdd,
  onDelete,
  onSubMenuSelect,
}: {
  menus: MenuItemType[];
  toggle: () => void;
  isOpen: boolean;
  onAdd: (menuId: string) => void;
  onDelete: (menu: MenuItemType) => void;
  onSubMenuSelect: (menu: MenuItemType) => void;
}) => {
  return (
    <div className="file-system transition-all duration-300 ease-in-out mb-5 md:mb-0">
      <ul>
        {menus.map((menu) => (
          <MenuItem
            key={menu.id}
            menu={menu}
            toggle={toggle}
            isOpen={isOpen}
            onAdd={onAdd}
            onDelete={onDelete}
            onSubMenuSelect={onSubMenuSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default FileSystemMenu;

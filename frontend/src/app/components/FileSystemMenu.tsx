import { useState } from "react";
import { MenuItem as MenuItemType } from "../types";
import Image from "next/image";

const MenuItem = ({
  menu,
  onAdd,
  onDelete,
  onSubMenuSelect,
  setIsSubMenuClicked,
  selectedMenuId,
  setSelectedMenuId,
  menuOpen,
  isAll,
}: {
  menu: MenuItemType;
  onAdd: (menuId: string) => void;
  onDelete: (menu: MenuItemType) => void;
  onSubMenuSelect: (menu: MenuItemType) => void;
  setIsSubMenuClicked: (isSubMenuClick: boolean) => void;
  selectedMenuId: string | null;
  setSelectedMenuId: (menuId: string | null) => void;
  menuOpen?: boolean;
  isAll?: boolean; // Flag to determine whether all menus should be toggled
}) => {
  const [isOpen, setIsOpen] = useState(true); // Each menu item tracks its own state
  const [showButtons, setShowButtons] = useState(false); // Show buttons on hover

  // Toggle submenu visibility
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle menu text click
  const handleMenuTextClick = () => {
    onSubMenuSelect(menu);
    setIsSubMenuClicked(true);
    setSelectedMenuId(menu.id); // Store the selected menu ID
  };

  // Handle submenu button hover
  const showMenuButtons = () => {
    setShowButtons(true);
  };

  const hideMenuButtons = () => {
    setShowButtons(false);
  };

  return (
    <li>
      <div className="menu-item">
        {/* Arrow before the menu text */}
        {menu.children && menu.children.length > 0 && (
          <span className="arrow" onClick={toggleMenu}>
            {isOpen ? (
              <Image
                src="/icons/caret_up.svg"
                width={26}
                height={26}
                alt="Caret up"
              />
            ) : (
              <Image
                src="/icons/caret_down.svg"
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
              {/* Add Button */}
              <div
                className="flex items-center justify-center w-7 h-7 rounded-full shadow-lg bg-secondary p-2 text-white"
                onClick={() => onAdd(menu.id)}
              >
                <Image
                  src={"/icons/plus.svg"}
                  width={16}
                  height={16}
                  alt="Plus icon"
                />
              </div>

              {/* Delete Button */}
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

      {/* Render children if expanded */}
      {isAll
        ? menuOpen &&
          menu.children &&
          menu.children.length > 0 && (
            <ul className="ml-4">
              {menu.children.map((child) => (
                <MenuItem
                  key={child.id}
                  menu={child}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  onSubMenuSelect={onSubMenuSelect}
                  setIsSubMenuClicked={setIsSubMenuClicked}
                  selectedMenuId={selectedMenuId}
                  setSelectedMenuId={setSelectedMenuId}
                />
              ))}
            </ul>
          )
        : isOpen &&
          menu.children &&
          menu.children.length > 0 && (
            <ul className="ml-4">
              {menu.children.map((child) => (
                <MenuItem
                  key={child.id}
                  menu={child}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  onSubMenuSelect={onSubMenuSelect}
                  setIsSubMenuClicked={setIsSubMenuClicked}
                  selectedMenuId={selectedMenuId}
                  setSelectedMenuId={setSelectedMenuId}
                />
              ))}
            </ul>
          )}
    </li>
  );
};

const FileSystemMenu = ({
  menus,
  onAdd,
  onDelete,
  onSubMenuSelect,
  setIsSubMenuClicked,
  menuOpen,
}: {
  menus: MenuItemType[];
  onAdd: (menuId: string) => void;
  onDelete: (menu: MenuItemType) => void;
  onSubMenuSelect: (menu: MenuItemType) => void;
  setIsSubMenuClicked: (isSubMenuClick: boolean) => void;
  menuOpen: boolean;
}) => {
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      <div className="file-system transition-all duration-300 ease-in-out mb-5 md:mb-0">
        <ul>
          {menus.map((menu) => (
            <MenuItem
              key={`${menu.name}-${menu.id}`}
              menu={menu}
              onAdd={onAdd}
              onDelete={onDelete}
              onSubMenuSelect={onSubMenuSelect}
              setIsSubMenuClicked={setIsSubMenuClicked}
              selectedMenuId={selectedMenuId}
              setSelectedMenuId={setSelectedMenuId}
              menuOpen={menuOpen}
              isAll={true}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileSystemMenu;

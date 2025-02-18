"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuLabel } from "../types";
import Image from "next/image";

interface MenuItemProps {
  menu: MenuLabel;
  isOpen: boolean;
  toggle?: () => void;
  level?: number; // Add level for indentation
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
}

export default function MenuItem({
  menu,
  isOpen,
  toggle,
  level,
  isExpanded,
  onToggleExpand,
}: MenuItemProps) {
  const pathname = usePathname();

  // Check if the current menu item is active
  const isActive = pathname === menu.path;
  const handleToggleExpand = () => {
    onToggleExpand(menu.id);
  };

  return (
    <li className={`${isExpanded && "p-1 bg-gray-700 rounded-lg"}`}>
      {menu.isParent ? (
        <button
          onClick={() => handleToggleExpand()}
          className={`cursor-pointer p-2 hover:bg-gray-700 flex gap-3 w-full items-center ${
            isActive ? "bg-[#5ADB5A] text-black rounded-2xl" : ""
          }`}
          style={{ paddingLeft: `${level ? level * 16 : 16}px` }}
        >
          {menu.icon && (
            <Image
              src={isExpanded ? menu.icon : "/icons/competition.svg"}
              width={24}
              height={24}
              alt={menu.label}
              onClick={toggle}
            />
          )}
          {isOpen && <span className="text-sm">{menu.label}</span>}
        </button>
      ) : (
        <Link
          href={`${menu.path.toLowerCase()}`}
          className={`cursor-pointer p-2 hover:bg-gray-700 flex gap-3 w-full items-center ${
            isActive ? "bg-[#5ADB5A] text-black rounded-2xl" : ""
          }`}
          style={{ paddingLeft: `${level ? level * 16 : 16}px` }}
        >
          {menu.icon && (
            <Image
              src={menu.icon}
              width={24}
              height={24}
              alt={menu.label}
              onClick={toggle}
            />
          )}
          {isOpen && <span className="text-sm">{menu.label}</span>}
        </Link>
      )}
      {menu.children && isExpanded && isOpen && (
        <ul className="space-y-1 pl-3">
          {menu.children.map((child) => (
            <MenuItem
              key={child.id}
              menu={child}
              isOpen={isOpen}
              toggle={toggle}
              level={level}
              isExpanded={isExpanded}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

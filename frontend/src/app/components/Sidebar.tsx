// components/Sidebar.tsx
"use client";
import { MenuLabel } from "../types";
import MenuItem from "./MenuItem";
import { useState } from 'react';
import Image from "next/image";

export default function Sidebar({
  menus,
  otherMenus,
}: {
  menus: MenuLabel[];
  otherMenus: MenuLabel[];
}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className={`hidden md:block h-screen bg-gray-800 text-white rounded-3xl py-3 px-5 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-28 flex flex-col items-center justify-center"
      }`}
    >
      <div className="flex items-center justify-between p-5 mb-3">
        {
          isOpen && 
          <span>
          <Image src="/icons/header.svg" width="70" height="22" alt="Header Image" />
        </span>
        }
        <span onClick={toggle} className="cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 18V16H16V18H3ZM19.6 17L14.6 12L19.6 7L21 8.4L17.4 12L21 15.6L19.6 17ZM3 13V11H13V13H3ZM3 8V6H16V8H3Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
      {/* <ul className="p-5 bg-primary rounded-2xl flex flex-col gap-3">
        {menus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} isOpen={isOpen} />
        ))}
      </ul>
      <ul className="p-5 bg-transparent rounded-2xl flex flex-col gap-3">
        {otherMenus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} isOpen={isOpen} />
        ))}
      </ul> */}
      <ul className="p-5 bg-primary rounded-2xl flex flex-col gap-3">
        {menus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} isOpen={isOpen} />
        ))}
      </ul>
      <ul className="p-5 bg-transparent rounded-2xl flex flex-col gap-3">
        {otherMenus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} isOpen={isOpen} />
        ))}
      </ul>
    </div>
  );
}
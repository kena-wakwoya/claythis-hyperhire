"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function MenuItem({
  menu,
  isOpen,
}: {
  menu: any;
  isOpen: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === `/${menu.path.toLowerCase()}`;

  return (
    <li>
      <Link
        href={`/${menu.path.toLowerCase()}`}
        className={`cursor-pointer p-2 hover:bg-gray-700 flex gap-3 w-full items-center ${
          isActive ? "bg-[#D4E157] text-black rounded-2xl" : ""
        }`}
      >
        {/* {menu.icon && <span className="mr-2">{menu.icon}</span>} */}
        <Image
          src={menu.icon}
          width={24}
          height={24}
          alt={`Test-${menu.name}`}
        />
        {isOpen && <span>{menu.label}</span>}
      </Link>
      {/* {isOpen && menu.children && (
        <ul className="pl-1">
          {menu.children.map((child: any) => (
            <MenuItem key={child.id} menu={child} />
          ))}
        </ul>
      )} */}
    </li>
  );
}

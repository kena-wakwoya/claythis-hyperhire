"use client";

import Image from "next/image";
import Breadcrumb from "../components/Breadcrumb";
import MenuTree from "../components/MenuTree";
import { useState } from "react";
import { menus, otherMenus } from "../utils/menuLabels";
import MobileSidebar from "../components/MobileSidebar";

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const showSidebar = () => setOpenSidebar(true);
  const hideSidebar = () => setOpenSidebar(false);

  return (
    <div className="flex flex-col">
      {/* button to toggle sidebar */}
      {!openSidebar && (
        <Image
          src={"/icons/ham.svg"}
          width={24}
          height={24}
          alt="Hamburgur Icon"
          className="text-black mb-3 block md:hidden cursor-pointer"
          onClick={showSidebar}
        />
      )}
      {openSidebar && (
        <MobileSidebar
          menus={menus}
          otherMenus={otherMenus}
          isMobile={true}
          hideSidebar={hideSidebar}
        />
      )}
      <Breadcrumb
        pageLabel="Menus"
        base={{ label: "Menus", route: "/" }}
        icon={`/icons/menu.svg`}
      />
      <MenuTree />
    </div>
  );
}

"use client";

import Breadcrumb from './Breadcrumb'

export default function CommonLayout() {
  return (
    <div>
      <Breadcrumb 
        pageLabel="Menus"
        base={{ label: "Menus", route: "/" }}
        icon={`/icons/menu.svg`}
      />
        {/* {children} */}
    </div>
  );
}

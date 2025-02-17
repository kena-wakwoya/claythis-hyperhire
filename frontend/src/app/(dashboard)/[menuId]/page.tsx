// app/(dashboard)/[menuId]/page.tsx

"use client";

import { useParams } from "next/navigation";

export default function MenuPage() {
  const params = useParams();
  const menuId = params.menuId;

  return (
    <div>
      <h1 className="text-2xl font-bold">Menu ID: {menuId}</h1>
      {/* Add your content here */}
    </div>
  );
}

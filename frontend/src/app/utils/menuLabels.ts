
import { MenuLabel } from "../types";

export const menus: MenuLabel[] = [
  {
    id: 1,
    label: "Systems",
    icon: "/icons/systems.svg",
    path: "systems", // Unique path
    isParent: true,
    children: [
      {
        id: 2,
        label: "System Code",
        icon: "/icons/system_code.svg",
        path: "/system-code", // Unique path
      },
      {
        id: 3,
        label: "Properties",
        icon: "/icons/properties.svg",
        path: "/properties", // Unique path
      },
      {
        id: 4,
        label: "Menus",
        icon: "/icons/menus.svg",
        path: "/"
      },
      {
        id: 5,
        label: "APIList",
        icon: "/icons/apilist.svg",
        path: "/apilists"
      },
      // Other children...
    ],
  },
];

export const otherMenus: MenuLabel[] = [
  {
    id: 6,
    label: "Users & Group",
    icon: "/icons/systems.svg",
    path: "#", // Unique path
    isParent: true,
    children: [
      {
        id: 7,
        label: "Users",
        icon: "",
        path: "/users", // Unique path
      },
      {
        id: 8,
        label: "Group",
        icon: "",
        path: "/group", // Unique path
      },
    ],
  },
  {
    id: 9,
    label: "Competition",
    icon: "/icons/systems.svg",
    path: "competition", // Unique path
    isParent: true,
    children: [
      {
        id: 10,
        label: "Competitors",
        icon: "",
        path: "/competitors", // Unique path
      },
      {
        id: 11,
        label: "Analysis",
        icon: "",
        path: "/analysis", // Unique path
      },
    ],
  },
];
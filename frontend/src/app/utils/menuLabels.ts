// import { MenuLabel } from "../types"

import { MenuLabel } from "../types";

// export const menus: MenuLabel[] = [
//     {
//       id: 1,
//       label: "Systems",
//       icon: "/icons/systems.svg",
//       path: "systems"
//     },
//     {
//       id: 2,
//       label: "System Code",
//       icon: "/icons/system_code.svg",
//       path: "system-code"
//     },
//     {
//       id: 3,
//       label: "Properties",
//       icon: "/icons/properties.svg",
//       path: "properties"
//     },
//     {
//       id: 4,
//       label: "Menus",
//       icon: "/icons/menus.svg",
//       path: ""
//     },
//     {
//       id: 5,
//       label: "APIList",
//       icon: "/icons/apilist.svg",
//       path: "apilists"
//     },
//   ];

//    export const otherMenus: MenuLabel[] = [
//     {
//       id: 6,
//       label: "Users & Group",
//       icon: "/icons/users_group.svg",
//       path: "users-groups"
//     },
//     {
//       id: 7,
//       label: "Competition",
//       icon: "/icons/competition.svg",
//       path: "compitition"
//     },
//   ];
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
    icon: "/icons/users_group.svg",
    path: "#", // Unique path
    isParent: true,
    children: [
      {
        id: 7,
        label: "Users",
        icon: "/icons/users_group.svg",
        path: "/users", // Unique path
      },
      {
        id: 8,
        label: "Group",
        icon: "/icons/competition.svg",
        path: "/group", // Unique path
      },
    ],
  },
  {
    id: 9,
    label: "Competition",
    icon: "/icons/competition.svg",
    path: "competition", // Unique path
    isParent: true,
    children: [
      {
        id: 10,
        label: "Competitors",
        icon: "/icons/competition.svg",
        path: "/competitors", // Unique path
      },
      {
        id: 11,
        label: "Analysis",
        icon: "/icons/competition.svg",
        path: "/analysis", // Unique path
      },
    ],
  },
];
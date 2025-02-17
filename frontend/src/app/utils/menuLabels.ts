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
    path: "systems",
  children: [
      {
        id: 2,
        label: "System Code",
        icon: "/icons/system_code.svg",
        path: "system-code"
},
      {
        id: 3,
        label: "Properties",
        icon: "/icons/properties.svg",
      path: "properties"
},
      {
        id: 4,
        label: "Menus",
        icon: "/icons/menus.svg",
        path: "",
      },
      {
        id: 5,
        label: "APIList",
        icon: "/icons/apilist.svg",
        path: "apilists",
      },
    ],
  },
];

export const otherMenus: MenuLabel[] = [
  {
    id: 6,
    label: "Users & Group",
    icon: "/icons/users_group.svg",
    path: "users-groups",
    children: [
      {
        id: 7,
        label: "Users",
        icon: "",
        path: "users",
      },
      {
        id: 8,
        label: "Group",
        icon: "",
        path: "group",
      },
    ],
  },
  {
    id: 9,
    label: "Competition",
    icon: "/icons/competition.svg",
    path: "competition",
    children: [
      {
        id: 10,
        label: "Competitors",
        icon: "",
        path: "competitors",
      },
      {
        id: 11,
        label: "Analysis",
        icon: "",
        path: "analysis",
      },
    ],
  },
];
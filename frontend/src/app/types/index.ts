export interface MenuItem {
    id: string;
    name: string;
    depth: number;
    parentId?: string | null;
    createdAt: string;
    updatedAt: string;
    children?: MenuItem[];
  }

// export interface MenuLabel {
//     id: number;
//     label: string;
//     icon: any;
//     path: string;
// }

// types.ts
export interface MenuLabel {
  id: number;
  label: string;
  icon: string;
  path: string;
  children?: MenuLabel[]; // Optional nested menu items
}

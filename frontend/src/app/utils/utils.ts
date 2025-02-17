import { MenuItem } from "../types";

/**
 * Finds the name of the parent menu by parentId.
 * @param {Array} menus - The array of menu items.
 * @param {string} parentId - The parentId to search for.
 * @returns {string|null} - The name of the parent menu or null if not found.
 */
export const findParentMenuName = (menus:MenuItem[] | null, parentId: string | null): string | null => {
    // Base case: If parentId is null, it means the menu is a root menu.
    if (!parentId) return null;
    if (!menus) return null;
  
    // Iterate through the menus array.
    for (const menu of menus) {
      // If the current menu's id matches the parentId, return its name.
      if (menu.id === parentId) {
        return menu.name;
      }
  
      // If the current menu has children, recursively search in the children.
      if (menu.children && menu.children.length > 0) {
        const parentName: string | null = findParentMenuName(menu.children, parentId);
        if (parentName) {
          return parentName;
        }
      }
    }
  
    // If no parent is found, return null.
    return null;
  };

  // Helper function to find a menu by ID
  export const findMenuById = (menus: MenuItem[], id: string): MenuItem | null => {
    for (const menu of menus) {
      if (menu.id === id) return menu;
      if (menu.children && menu.children.length > 0) {
        const found = findMenuById(menu.children, id);
        if (found) return found;
      }
    }
    return null;
  };
// lib/api.ts
import { MenuItem } from "../types";
import axiosInstance from "./axiosInstance";

export const fetchMenus = async (): Promise<MenuItem[]> => {
  const page: number = 1;
  const pageSize: number = 10; // Adjust as needed
  const response = await axiosInstance.get(`/menus/?page=${page}&itemsPerPage=${pageSize}`);
  const {payload} = response.data;
  console.log("payload: ", payload);
  return payload ?? []; // Ensure it returns an array
};

export const fetchMenusByID = async (menuId: string | null): Promise<MenuItem> => {
  const response = await axiosInstance.get(`/menus/${menuId}`);
  console.log("payload", response.data);
  return response.data ?? {} as MenuItem; 
};

export const addMenu = async (menu: MenuItem): Promise<MenuItem> => {
  const response = await axiosInstance.post("/menus", menu);
  console.log("payload addd: ", response.data);
  return response.data ?? {} as MenuItem; // Ensure proper return type
};

export const updateMenu = async (menu: MenuItem, menuId: string): Promise<MenuItem> => {
  const response = await axiosInstance.put(`/menus/${menuId}`, menu);
  console.log("payload", response.data);
  return response.data ?? {} as MenuItem;
};

export const deleteMenu = async (menuId: string): Promise<{ menuId: string }> => {
  const response = await axiosInstance.delete(`/menus/${menuId}`);
  console.log("payload", response.data);
  return response.data ?? { menuId };
};

// lib/api.ts
import { ApiResponse, MenuItem } from "../types";
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

export const addMenu = async (menu: MenuItem): Promise<ApiResponse> => {
  const response = await axiosInstance.post("/menus", menu);
  return response.data ?? {} as MenuItem; // Ensure proper return type
};

export const updateMenu = async (menu: MenuItem, menuId: string): Promise<ApiResponse> => {
  const response = await axiosInstance.put(`/menus/${menuId}`, menu);
  return response.data ?? {};
};

export const deleteMenu = async (menuId: string): Promise<ApiResponse> => {
  const response = await axiosInstance.delete(`/menus/${menuId}`);
  return response.data ?? { menuId };
};

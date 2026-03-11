
import axios from "axios";
import { API_BASE_URL } from "../constants";

const INVENTORY_API = axios.create({
  baseURL: `${API_BASE_URL}/api/inventory`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getInventory = (token?: string) => INVENTORY_API.get("", token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const getInventoryItem = (id: string | number, token?: string) => INVENTORY_API.get(`/${id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const createInventoryItem = (data: any, token?: string) => INVENTORY_API.post("", data, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const updateInventoryItem = (id: string | number, data: any, token?: string) => INVENTORY_API.put(`/${id}`, data, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const deleteInventoryItem = (id: string | number, token?: string) => INVENTORY_API.delete(`/${id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});


import axios from "axios";
import { API_BASE_URL } from "../constants";

const PRODUCT_API = axios.create({
  baseURL: `${API_BASE_URL}/api/products`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = () => PRODUCT_API.get("");
export const getProduct = (id: string | number) => PRODUCT_API.get(`/${id}`);
export const createProductWithImage = (data: any, token?: string) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("sku", data.sku);
  formData.append("description", data.description);
  formData.append("price", data.price);
  if (data.rating) formData.append("rating", data.rating);
  if (data.stock) formData.append("stock", data.stock);
  if (data.active !== undefined) formData.append("active", data.active);
  formData.append("file", data.imageFile);
  return PRODUCT_API.post("/create-with-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
export const updateProduct = (id: string | number, data: any, token?: string) => PRODUCT_API.put(`/${id}`, data, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const deleteProduct = (id: string | number, token?: string) => PRODUCT_API.delete(`/${id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});

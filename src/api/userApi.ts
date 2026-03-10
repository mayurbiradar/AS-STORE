import { API } from "./authApi";
export const getUsers = async (token?: string) => {
  try {
    const response = await API.get("/users", token ? { headers: { Authorization: `Bearer ${token}` } } : {});
    return response;
  } catch (error: any) {
    if (error.response) {
      console.error("/users error response:", error.response.status, error.response.data);
    } else {
      console.error("/users error:", error.message);
    }
    throw error;
  }
};
export const getUser = (id: string, token?: string) => API.get(`/users/${id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const createUser = (data: any, token?: string) => API.post("/register", data, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const updateUser = (id: string, data: any, token?: string) => API.put(`/users/${id}`, data, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const deleteUser = (id: string, token?: string) => API.delete(`/users/${id}`, token ? { headers: { Authorization: `Bearer ${token}` } } : {});
export const changeUserRole = (id: string, role: string, token?: string) => API.patch(`/users/${id}/role`, { role }, token ? { headers: { Authorization: `Bearer ${token}` } } : {});

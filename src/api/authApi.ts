import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8081/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios interceptor for handling expired JWT and refreshing token
let refreshAttempts = 0;
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      refreshAttempts < 3 &&
      localStorage.getItem('refreshToken')
    ) {
      refreshAttempts++;
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem('refreshToken');
        const res = await API.post('/refresh', { refreshToken: refresh });
        localStorage.setItem('accessToken', res.data.accessToken);
        API.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        refreshAttempts = 0;
        return Promise.reject(refreshError);
      }
    } else if (refreshAttempts >= 3) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      refreshAttempts = 0;
    }
    return Promise.reject(error);
  }
);

export const registerUser = (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}) => {
  return API.post("/register", data);
};

export const loginUser = (data: { email: string; password: string }) => {
  return API.post("/login", data);
};

export const refreshToken = (refreshToken: string) => {
  return API.post("/refresh", { refreshToken });
};

export const logoutUser = (refreshToken: string) => {
  return API.post("/logout", { refreshToken });
};
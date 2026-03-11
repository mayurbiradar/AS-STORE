import { refreshToken, logoutUser } from '../api/authApi';

export async function handleTokenRefresh() {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) return null;
  try {
    const res = await refreshToken(refresh);
    localStorage.setItem('accessToken', res.data.accessToken);
    return res.data.accessToken;
  } catch {
    return null;
  }
}


export async function handleLogout() {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) return;
  try {
    await logoutUser(refresh);
    // Clear all tokens and sensitive state
    localStorage.clear();
    sessionStorage.clear();
  } catch {
    // Do not clear tokens if logout fails
  }
}

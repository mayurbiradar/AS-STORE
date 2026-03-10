import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('accessToken');
  if (!token) return <Navigate to="/login" />;

  // Optionally: validate token expiry here
  // If token is expired, axios interceptor will handle refresh and redirect
  return children;
}

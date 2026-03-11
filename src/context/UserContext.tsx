import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const updateUser = () => {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Normalize role for UI
        if (parsed.role === 'ROLE_ADMIN') parsed.role = 'admin';
        else if (parsed.role === 'ROLE_USER') parsed.role = 'user';
        setUser(parsed);
      } else {
        setUser(null);
      }
    };
    updateUser();
    window.addEventListener('storage', updateUser);
    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const logout = async () => {
    // Call backend logout and clear tokens
    const { handleLogout } = await import('../utils/authUtils');
    await handleLogout();
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}

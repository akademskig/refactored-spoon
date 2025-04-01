import { useEffect, useState } from 'react';
import api from '../services/api';
import { User } from '../types/User';
import AuthContext from '../context/AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

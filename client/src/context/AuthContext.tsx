import { createContext } from 'react';
import { User } from '../types/User';

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

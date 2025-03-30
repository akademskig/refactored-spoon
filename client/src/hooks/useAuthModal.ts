import { useContext } from 'react';
import AuthModalContext from '../context/AuthModalContext';

export const useAuthModal = () => useContext(AuthModalContext);

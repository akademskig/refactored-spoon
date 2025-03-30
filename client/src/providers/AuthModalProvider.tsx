import { useState } from 'react';
import AuthModalContext, { ModalView } from '../context/AuthModalContext';
import AuthModal from '../components/AuthModal';

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalView>(null);
  const open = (view: ModalView) => setModal(view);
  const close = () => setModal(null);

  return (
    <AuthModalContext.Provider value={{ modal, open, close }}>
      {children}
      <AuthModal />
    </AuthModalContext.Provider>
  );
};

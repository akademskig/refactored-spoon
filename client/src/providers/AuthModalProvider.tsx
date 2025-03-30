import { useState } from 'react';
import AuthModalContext, { ModalView } from '../context/AuthModalContext';
import AuthModal from '../components/AuthModal';

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalView>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setModal(null);
    }, 300);
  };

  const handleOpen = (view: ModalView) => {
    setIsOpening(true);
    setModal(view);
    setTimeout(() => {
      setIsOpening(false);
    }, 0);
  };

  return (
    <AuthModalContext.Provider
      value={{ modal, open: handleOpen, close: handleClose, isClosing, isOpening }}
    >
      {children}
      {modal && <AuthModal />}
    </AuthModalContext.Provider>
  );
};

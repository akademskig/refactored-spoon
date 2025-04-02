import { useCallback, useState } from 'react';
import ModalContext, { ModalView } from '../context/ModalContext';
import Modal from '../components/Modal/Modal';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalView>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setModal(null);
    }, 300);
  }, []);

  const handleOpen = useCallback((view: ModalView) => {
    setIsOpening(true);
    setModal(view);
    setTimeout(() => {
      setIsOpening(false);
    }, 0);
  }, []);

  return (
    <ModalContext.Provider
      value={{ modal, open: handleOpen, close: handleClose, isClosing, isOpening }}
    >
      {children}
      {modal && <Modal />}
    </ModalContext.Provider>
  );
};

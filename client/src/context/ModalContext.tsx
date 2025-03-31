import { createContext } from 'react';
import { ModalViewEnum } from '../components/Modal/ModalViewEnum';

export type ModalView = ModalViewEnum | null;

const ModalContext = createContext<{
  modal: ModalView;
  open: (view: ModalView) => void;
  isClosing?: boolean;
  isOpening?: boolean;
  close: () => void;
}>({
  modal: null,
  open: () => {},
  close: () => {},
});

export default ModalContext;

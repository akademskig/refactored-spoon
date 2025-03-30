import { createContext } from 'react';
import { ModalViewEnum } from '../types/ModalViewEnum';

export type ModalView = ModalViewEnum | null;

const AuthModalContext = createContext<{
  modal: ModalView;
  open: (view: ModalView) => void;
  close: () => void;
}>({
  modal: null,
  open: () => {},
  close: () => {},
});

export default AuthModalContext;

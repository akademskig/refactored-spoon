import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import styles from './Modal.module.scss';
import { useModal } from '../../hooks/useModal';
import Logo from '../Logo/Logo';
import { ModalViewEnum } from './ModalViewEnum';

const Modal = () => {
  const { modal, close, isClosing, isOpening } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const [mouseDownInside, setMouseDownInside] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current?.contains(e.target as Node)) {
        setMouseDownInside(true);
      } else {
        setMouseDownInside(false);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      const clickOutside = modalRef.current && !modalRef.current?.contains(e.target as Node);
      if (!mouseDownInside && clickOutside) {
        close();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [close, mouseDownInside]);

  return (
    <div
      className={`${styles.modalOverlay} ${isOpening ? styles.opening : ''}${isClosing ? styles.closing : ''}`}
    >
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.logoWrapper}>
          <Logo center />
        </div>
        <button className={styles.closeBtn} onClick={close}>
          <X />
        </button>
        {modal === ModalViewEnum.SIGNIN ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default Modal;

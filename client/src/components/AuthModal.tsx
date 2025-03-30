import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import styles from '../styles/AuthModal.module.scss';
import { useAuthModal } from '../hooks/useAuthModal';
import Logo from './Logo';
import { useEffect, useRef, useState } from 'react';
import { ModalViewEnum } from '../types/ModalViewEnum';

const AuthModal = () => {
  const { modal, close, isClosing, isOpening } = useAuthModal();
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
      className={`${styles.authModalOverlay} ${isOpening ? styles.opening : ''}${isClosing ? styles.closing : ''}`}
    >
      <div className={styles.authModal} ref={modalRef}>
        <div className={styles.logoWrapper}>
          <Logo center />
        </div>
        <button className={styles.closeBtn} onClick={close}>
          ×
        </button>
        {modal === ModalViewEnum.SIGNIN ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default AuthModal;

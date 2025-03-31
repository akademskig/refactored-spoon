import { useEffect, useState } from 'react';
import styles from '../styles/Toast.module.scss';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastEvent = {
  message: string;
  type: ToastType;
};

const Toast = () => {
  const [toast, setToast] = useState<ToastEvent | null>(null);

  useEffect(() => {
    const handle = (e: CustomEvent<ToastEvent>) => {
      setToast(e.detail);
      setTimeout(() => setToast(null), 3000);
    };

    window.addEventListener('toast', handle as EventListener);

    return () => window.removeEventListener('toast', handle as EventListener);
  }, []);

  if (!toast) return null;

  return <div className={`${styles.toast} ${styles[toast.type]}`}>{toast.message}</div>;
};

export default Toast;

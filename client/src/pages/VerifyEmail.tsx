import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import styles from './VerifyEmail.module.scss';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/verify/${token}`);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    if (token) verify();
  }, [token]);

  return (
    <div className={styles.container}>
      {status === 'pending' && <p className={styles.message}>Verifying your email...</p>}

      {status === 'success' && (
        <div className={styles.success}>
          <h2>Email verified 🎉</h2>
          <p>You can now sign in to your account.</p>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.error}>
          <h2>Invalid or expired link ❌</h2>
          <p>Please sign up again or check your inbox for a new link.</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

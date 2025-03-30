import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useAuthModal } from '../hooks/useAuthModal';
import { AxiosError } from 'axios';
import styles from '../styles/AuthForm.module.scss';
import { ModalViewEnum } from '../types/ModalViewEnum';

const SignInForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { close, open } = useAuthModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/signin', form);
      login(res.data.user);
      close(); // close modal on success
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Sign In</h2>

      {error && <p className={styles.error}>{error}</p>}
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input
        name="password"
        type="password"
        placeholder="Password"
        minLength={6}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign In</button>
      <p className={styles.switch}>
        Don't have an account? <span onClick={() => open(ModalViewEnum.SIGNUP)}>Sign Up</span>
      </p>
    </form>
  );
};

export default SignInForm;

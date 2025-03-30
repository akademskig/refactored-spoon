import { useState } from 'react';
import api from '../services/api';
import { AxiosError } from 'axios';
import styles from '../styles/AuthForm.module.scss';
import { useAuthModal } from '../hooks/useAuthModal';
import { ModalViewEnum } from '../types/ModalViewEnum';

const SignUpForm = () => {
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [error, setError] = useState('');
  const { open } = useAuthModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/signup', form);
      setError('Check your email to verify your account');
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError('SignIn failed');
      }
    }
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        name="firstName"
        type="text"
        placeholder="First name"
        onChange={handleChange}
        required
      />
      <input name="lastName" type="text" placeholder="Last name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input
        name="password"
        type="password"
        placeholder="Enter password (at least 6 characters)"
        onChange={handleChange}
        minLength={6}
        required
      />
      <button type="submit">Sign Up</button>
      <p className={styles.switch}>
        Already have an account? <span onClick={() => open(ModalViewEnum.SIGNIN)}>Sign In</span>
      </p>
    </form>
  );
};

export default SignUpForm;

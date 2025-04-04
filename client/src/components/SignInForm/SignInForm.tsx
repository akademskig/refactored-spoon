import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import AuthForm from '../AuthForm/AuthForm';
import { FormTypeEnum } from '../AuthForm/FormTypeEnum';

const SignInForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await api.post('/signin', form);
    login(res.data.user);
  };

  return (
    <AuthForm formType={FormTypeEnum.SIGNIN} onSubmit={handleSubmit}>
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
    </AuthForm>
  );
};

export default SignInForm;

import { useState } from 'react';
import api from '../../services/api';
import AuthForm from '../AuthForm/AuthForm';
import { FormTypeEnum } from '../AuthForm/FormTypeEnum';

const SignUpForm = () => {
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/signup', form);
  };

  return (
    <AuthForm formType={FormTypeEnum.SIGNUP} onSubmit={handleSubmit}>
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
    </AuthForm>
  );
};

export default SignUpForm;

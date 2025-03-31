import React from 'react';
import styles from './AuthForm.module.scss';
import { useModal } from '../../hooks/useModal';
import { ModalViewEnum } from '../Modal/ModalViewEnum';
import { FormTypeEnum } from './FormTypeEnum';

type AuthFormProps = {
  formType: FormTypeEnum;
  children: React.ReactNode;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
};

const AuthForm = ({ formType, children, error, onSubmit }: AuthFormProps) => {
  const { close, open } = useModal();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
    if (formType === FormTypeEnum.SIGNIN) {
      close();
    }
  };
  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>
        {formType === FormTypeEnum.SIGNIN ? 'Sign In' : 'Sign up'}
      </h2>
      {error && <p className={styles.error}>{error}</p>}
      {children}
      <p className={styles.switch}>
        {formType === FormTypeEnum.SIGNIN ? (
          <>
            Don't have an account? <span onClick={() => open(ModalViewEnum.SIGNUP)}>Sign Up</span>
          </>
        ) : (
          <>
            Already have an account? <span onClick={() => open(ModalViewEnum.SIGNIN)}>Sign In</span>
          </>
        )}
      </p>
    </form>
  );
};

export default AuthForm;

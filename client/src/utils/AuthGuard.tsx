import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return <>{children}</>;
};

export default AuthGuard;

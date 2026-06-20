import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/authStorage';

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {

  const token = getToken();

  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return <>{children}</>;
};

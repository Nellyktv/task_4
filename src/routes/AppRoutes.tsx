import { Navigate } from 'react-router-dom';

import { PageAuth } from '../pages/PageAuth';
import { PageUsers } from '../pages/PageUsers';
import { PageVerify } from '../pages/PageVerify';

import { ProtectedRoute } from './ProtectedRoute';
import { CenteredLayout } from '../layouts/CenteredLayout';

import { authForms } from '../data/authForms';

export const routes = [
  {
    path: '/login',
    element: (
      <CenteredLayout>
        <PageAuth dataForm={authForms.login} />
      </CenteredLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <CenteredLayout>
        <PageAuth dataForm={authForms.register} />
      </CenteredLayout>
    ),
  },
  {
    path: '/verify/:token',
    element: (
      <CenteredLayout>
        <PageVerify />
      </CenteredLayout>
    ),
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <PageUsers />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to='/login' />,
  },
];

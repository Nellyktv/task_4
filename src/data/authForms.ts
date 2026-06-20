import type { AuthFormsData } from '../types/auth';

export const authForms: AuthFormsData = {
  login: {
    name: 'login',
    nameButton: 'Sign in',
    titleForm: 'Sign in to the app',
    links: [
      { text: "Don't have an account?", linkText: 'Sign up', to: '/register' },
    ],
  },
  register: {
    name: 'register',
    nameButton: 'Create account',
    titleForm: 'Registration',
    links: [{ text: 'Already have an account?', linkText: 'Sign in', to: '/login' }],
  },
};



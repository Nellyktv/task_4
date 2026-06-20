export type AuthFormName = 'login' | 'register';

export type RedirectState = {
  notice?: string;
  info?: string;
} | null;

export type AuthLink = {
  text?: string;
  linkText: string;
  to: string;
};

export type AuthFormData = {
  name: AuthFormName;
  nameButton: string;
  titleForm: string;
  links: AuthLink[];
};

export type AuthFormsData = {
  login: AuthFormData;
  register: AuthFormData;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

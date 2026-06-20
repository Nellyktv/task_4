

export type UserStatus = 'unverified' | 'active' | 'blocked';

export type User = {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  last_login: string | null;
};

export type ToastMsg = {
  id: string;
  variant: 'success' | 'danger';
  text: string;
};


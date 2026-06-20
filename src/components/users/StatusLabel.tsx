import type { UserStatus } from '../../types/user';

type Props = {
  status: UserStatus;
};

export const StatusLabel = ({ status }: Props) => {

  const cls: Record<UserStatus, string> = {
    active: 'text-success',
    blocked: 'text-danger',
    unverified: 'text-secondary',
  };
  const label = status[0].toUpperCase() + status.slice(1);

  return <span className={cls[status]}>{label}</span>;
};

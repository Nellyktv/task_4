import type { ButtonProps } from 'react-bootstrap';

export type ToolbarAction =
  | 'block'
  | 'unblock'
  | 'verify'
  | 'delete'
  | 'deleteUnverified';

export type ToolbarButtonData = {
  action: ToolbarAction;
  icon: string;
  label?: string;
  tooltip?: string;
  variant: ButtonProps['variant'];
};

export const toolbarButtons: ToolbarButtonData[] = [
  {
    action: 'block',
    icon: 'bi-lock',
    label: 'Block',
    variant: 'outline-primary',
  },
  {
    action: 'unblock',
    icon: 'bi-unlock',
    tooltip: 'Unblock',
    variant: 'outline-primary',
  },
  {
    action: 'verify',
    icon: 'bi-check2-circle',
    tooltip: 'Verify',
    variant: 'outline-success',
  },
  {
    action: 'delete',
    icon: 'bi-trash',
    tooltip: 'Delete',
    variant: 'outline-danger',
  },
  {
    action: 'deleteUnverified',
    icon: 'bi-person-x',
    tooltip: 'Delete unverified users',
    variant: 'outline-danger',
  },
];

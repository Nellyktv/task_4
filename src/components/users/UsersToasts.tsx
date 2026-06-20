import { Toast, ToastContainer } from 'react-bootstrap';
import type { ToastMsg } from '../../types/user';

type Props = {
  toasts: ToastMsg[];
  onClose: (id: string) => void;
};

export const UsersToasts = ({ toasts, onClose }: Props) => {

  return (
    <ToastContainer position='top-center' className='p-3'>
      {toasts.map((el, key) => (
        <Toast
          key={key}
          bg={el.variant}
          animation={false}
          onClose={() => onClose(el.id)}
          delay={2000}
          autohide
        >
          <Toast.Body className='text-white'>{el.text}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

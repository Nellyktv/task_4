import type { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

type Props = {
  children: ReactNode;
};

export const CenteredLayout = ({ children }: Props) => {
  return (
    <Container
      fluid
      className='min-vh-100 d-flex flex-column justify-content-center align-items-center'
    >
      {children}
    </Container>
  );
};

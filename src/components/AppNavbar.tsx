import { Button, Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearAuth, getStoredUser } from '../utils/authStorage';

export const AppNavbar = () => {
  const navigate = useNavigate();

  const user = getStoredUser();

  const logoutHandler = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <Navbar bg='white' className='border-bottom mb-4'>
      <Container>
        <Navbar.Brand className='fw-bold text-primary'>THE APP</Navbar.Brand>
        <div className='d-flex align-items-center gap-3 ms-auto'>
          <span className='text-muted small d-none d-sm-inline'>
            {user?.name}
          </span>
          <Button variant='outline-secondary' size='sm' onClick={logoutHandler}>
            <i className='bi bi-box-arrow-right me-1'></i>Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

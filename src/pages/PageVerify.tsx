import { useEffect, useState } from 'react';
import { Alert, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmail } from '../api/authApi';

export const PageVerify = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const data = await verifyEmail(token ?? '');
        setMessage(data.message);
        setStatus('ok');
      } catch (err) {
        setMessage(err instanceof Error ? err.message : 'Verification failed');
        setStatus('error');
      }
    };

    verify();
  }, [token]);

  return (
    <Card style={{ maxWidth: 420 }} className='mx-auto'>
      <Card.Body className='text-center'>
        <Card.Title className='mb-3'>Account verification</Card.Title>
        {status === 'loading' && <p className='text-muted'>Verifying…</p>}
        {status !== 'loading' && (
          <Alert variant={status === 'ok' ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}
        {status !== 'loading' && (
          <Button variant='primary' onClick={() => navigate('/login')}>
            Go to login
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

import { useState, type ChangeEvent, type FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useLocation, useNavigate } from 'react-router-dom';
import { type AuthFormData, type RedirectState } from '../types/auth';
import { login, register } from '../api/authApi';
import { saveAuth } from '../utils/authStorage';
import { IconInput } from './IconInput';

type Props = {
  dataForm: AuthFormData;
};

export const FormAuth = ({ dataForm }: Props) => {


  const navigate = useNavigate();
  const location = useLocation();

  const redirectState = location.state as RedirectState;
  const successNotice = redirectState?.notice ?? '';
  const warningNotice = redirectState?.info ?? '';

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const togglePasswordHandler = () => setIsPasswordVisible((prev) => !prev);

  const changeRememberHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setRememberMe(e.target.checked);

  const isRegisterForm = dataForm.name === 'register';
  const isLoginForm = dataForm.name === 'login';

  const alerts = [
    { variant: 'success', text: successNotice },
    { variant: 'warning', text: warningNotice },
    { variant: 'danger', text: errorMessage },
  ] as const;

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      if (isLoginForm) {
        const { token, user } = await login(form);
        saveAuth(token, user, rememberMe);
        navigate('/users');
      } else {
        const { message } = await register(form);
        navigate('/login', { state: { notice: message } });
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <h3 className='mb-4'>{dataForm.titleForm}</h3>

      {alerts.map((el, key) =>
        el.text ? (
          <Alert key={key} variant={el.variant}>
            {el.text}
          </Alert>
        ) : null
      )}

      {isRegisterForm && (
        <IconInput
          name='name'
          placeholder='Enter name'
          value={form.name}
          icon='bi-person'
          onChange={changeHandler}
        />
      )}

      <IconInput
        type='email'
        name='email'
        placeholder='Enter email'
        value={form.email}
        icon='bi-envelope'
        onChange={changeHandler}
      />

      <IconInput
        type={isPasswordVisible ? 'text' : 'password'}
        name='password'
        placeholder='Password'
        value={form.password}
        icon={isPasswordVisible ? 'bi-eye-slash' : 'bi-eye'}
        onChange={changeHandler}
        onIconClick={togglePasswordHandler}
      />
      {isLoginForm && (
        <Form.Check
          className='mb-3'
          type='checkbox'
          id='rememberMe'
          label='Remember me'
          checked={rememberMe}
          onChange={changeRememberHandler}
        />
      )}
      <Button
        variant='primary'
        type='submit'
        className='w-100'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Loading...' : dataForm.nameButton}
      </Button>
    </Form>
  );
};

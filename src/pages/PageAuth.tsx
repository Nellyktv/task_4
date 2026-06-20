import { Col, Container, Row } from 'react-bootstrap';
import { FormAuth } from '../components/FormAuth';
import { Link } from 'react-router-dom';
import type { AuthFormData } from '../types/auth';

type Props = {
  dataForm: AuthFormData;
};

export const PageAuth = ({ dataForm }: Props) => {
  

  return (
    <>
      <Row className='w-100 my-auto'>
        <Col xs={10} sm={8} md={5} lg={4} xl={3} className='mx-auto'>
          <h1 className='text-primary fw-bold text-center mb-4'>THE APP</h1>
          <FormAuth key={dataForm.name} dataForm={dataForm} />
        </Col>
      </Row>
      <Container className='d-flex justify-content-between mt-auto mb-5'>
        {dataForm.links.map((link) =>
          link.text ? (
            <p key={link.to}>
              {link.text} <Link to={link.to}>{link.linkText}</Link>
            </p>
          ) : (
            <Link key={link.to} to={link.to}>
              {link.linkText}
            </Link>
          )
        )}
      </Container>
    </>
  );
};

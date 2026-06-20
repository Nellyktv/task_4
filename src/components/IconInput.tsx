import { type ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

type Props = {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  icon: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
};

export const IconInput = ({
    type = 'text',
    name,
    placeholder,
    value,
    icon,
    onChange,
    onIconClick,
  }: Props) => {


  return (
    <InputGroup className='mb-3'>
      <Form.Control
        size='lg'
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <InputGroup.Text
        onClick={onIconClick}
        style={onIconClick ? { cursor: 'pointer' } : undefined}
      >
        <i className={`bi ${icon}`}></i>
      </InputGroup.Text>
    </InputGroup>
  );
};

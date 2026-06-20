import { type ChangeEvent } from 'react';
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { toolbarButtons, type ToolbarAction } from '../../data/dataButton';

type Props = {
  searchQuery: string;
  hasSelection: boolean;
  isProcessing: boolean;
  onSearchChange: (value: string) => void;
  onAction: (action: ToolbarAction) => void;
};

export const UsersToolbar = ({
  searchQuery,
  hasSelection,
  isProcessing,
  onSearchChange,
  onAction,
}: Props) => {
  const selectionDisabled = !hasSelection || isProcessing;

  const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    onSearchChange(e.target.value);

  return (
    <div className='d-flex flex-wrap gap-2 align-items-center mb-3'>
      {toolbarButtons.map((el) => {
        const button = (
          <Button
            key={el.action}
            variant={el.variant}
            disabled={
              el.action === 'deleteUnverified' ? isProcessing : selectionDisabled
            }
            onClick={() => onAction(el.action)}
          >
            <i className={`bi ${el.icon}${el.label ? ' me-1' : ''}`}></i>
            {el.label}
          </Button>
        );
        return el.tooltip ? (
          <OverlayTrigger key={el.action} overlay={<Tooltip>{el.tooltip}</Tooltip>}>
            {button}
          </OverlayTrigger>
        ) : (
          button
        );
      })}
      <InputGroup className='ms-auto' style={{ maxWidth: 280 }}>
        <InputGroup.Text>
          <i className='bi bi-search'></i>
        </InputGroup.Text>
        <Form.Control
          placeholder='Filter'
          value={searchQuery}
          onChange={searchChangeHandler}
        />
      </InputGroup>
    </div>
  );
};
import { Form, Table } from 'react-bootstrap';
import type { User } from '../../types/user';
import { StatusLabel } from './StatusLabel';
import { formatDate } from '../../utils/formatDate';
import { userColumns } from '../../data/dataTable';

type Props = {
  users: User[];
  selectedIds: number[];
  areAllSelected: boolean;
  areSomeSelected: boolean;
  onToggleSelectAll: () => void;
  onToggleSelectOne: (id: number) => void;
};

export const UsersTable = ({
    users,
    selectedIds,
    areAllSelected,
    areSomeSelected,
    onToggleSelectAll,
    onToggleSelectOne,
  }: Props) => {

  return (
    <Table hover responsive className='align-middle'>
      <thead>
        <tr>
          <th style={{ width: 40 }}>
            <input
              type='checkbox'
              className='form-check-input'
              checked={areAllSelected}
              ref={(el) => {
                if (el) el.indeterminate = areSomeSelected;
              }}
              onChange={onToggleSelectAll}
            />
          </th>
          {userColumns.map((el, key) => (
            <th key={key}>{el}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((el) => (
          <tr key={el.id}>
            <td>
              <Form.Check
                checked={selectedIds.includes(el.id)}
                onChange={() => onToggleSelectOne(el.id)}
              />
            </td>
            <td>{el.name}</td>
            <td className='text-break'>{el.email}</td>
            <td>
              <StatusLabel status={el.status} />
            </td>
            <td>{formatDate(el.last_login)}</td>
          </tr>
        ))}
        {users.length === 0 && (
          <tr>
            <td colSpan={5} className='text-center text-muted py-4'>
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

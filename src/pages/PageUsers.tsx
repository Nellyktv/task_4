import { useState } from 'react';
import { getStoredUser } from '../utils/authStorage';
import { Container } from 'react-bootstrap';
import { AppNavbar } from '../components/AppNavbar';
import { UsersToolbar } from '../components/users/UsersToolbar';
import { UsersTable } from '../components/users/UsersTable';
import { UsersToasts } from '../components/users/UsersToasts';
import { useUsers } from '../hooks/useUsers';
import { useToasts } from '../hooks/useToasts';
import type { ToolbarAction } from '../data/dataButton';
import {
  deleteUnverified,
  deleteUser,
  updateUserStatus,
  verifyUser,
} from '../api/usersApi';

export const PageUsers = () => {
  const { users, isLoading, loadUsers } = useUsers();
  const { toasts, showToast, removeToast } = useToasts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const query = searchQuery.trim().toLowerCase();

  const filteredUsers = !query
    ? users
    : users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );

  const areAllSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((user) => selectedIds.includes(user.id));

  const areSomeSelected =
    selectedIds.length > 0 && !areAllSelected;

  const hasSelection = selectedIds.length > 0;

  const toggleSelectAll = () => {
    if (areAllSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(filteredUsers.map((user) => user.id));
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const runAction = async (
    action: (id: number) => Promise<unknown>,
    successMessage: string
  ) => {
    if (!selectedIds.length) return;

    setIsProcessing(true);
    const currentUser = getStoredUser();
    const currentId = currentUser ? users.find((el) => el.email === currentUser.email)?.id : undefined;
    const orderedIds = currentId !== undefined
      ? [...selectedIds.filter((id) => id !== currentId), ...selectedIds.filter((id) => id === currentId)]
      : selectedIds;
    try {
      for (const id of orderedIds) {
        await action(id);
      }

      setSelectedIds([]);
      showToast('success', successMessage);
    } catch (error) {
      if (error instanceof Error && error.message !== 'User is blocked') {
        showToast('danger', 'Operation failed');
      }
    } finally {
      setIsProcessing(false);
      await loadUsers();
    }
  };

  const deleteUnverifiedUsers = async () => {
    setIsProcessing(true);
    try {
      const result = await deleteUnverified();
      showToast('success', result.message);
      await loadUsers();
    } catch {
      showToast('danger', 'Operation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAction = (action: ToolbarAction) => {
    const noun = selectedIds.length === 1 ? 'User' : 'Users';
    switch (action) {
      case 'block':
        return runAction((id) => updateUserStatus(id, 'blocked'), `${noun} blocked`);
      case 'unblock':
        return runAction((id) => updateUserStatus(id, 'active'), `${noun} unblocked`);
      case 'verify':
        return runAction((id) => verifyUser(id), `${noun} verified`);
      case 'delete':
        return runAction((id) => deleteUser(id), `${noun} deleted`);
      case 'deleteUnverified':
        return deleteUnverifiedUsers();
    }
  };

  return (
    <>
      <AppNavbar />

      <Container className='pb-5'>
        <UsersToolbar
          searchQuery={searchQuery}
          hasSelection={hasSelection}
          isProcessing={isProcessing}
          onSearchChange={setSearchQuery}
          onAction={handleAction}
        />

        {isLoading ? (
          <p className='text-muted'>Loading…</p>
        ) : (
          <UsersTable
            users={filteredUsers}
            selectedIds={selectedIds}
            areAllSelected={areAllSelected}
            areSomeSelected={areSomeSelected}
            onToggleSelectAll={toggleSelectAll}
            onToggleSelectOne={toggleSelectOne}
          />
        )}
      </Container>

      <UsersToasts toasts={toasts} onClose={removeToast} />
    </>
  );
};
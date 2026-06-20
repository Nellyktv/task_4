import { useState } from 'react';
import type { ToastMsg } from '../types/user';
import { getUniqIdValue } from '../utils/getUniqIdValue';

export function useToasts() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  const showToast = (variant: ToastMsg['variant'], text: string) => {
    setToasts((prev) => [
      ...prev,
      { id: getUniqIdValue('toast'), variant, text },
    ]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
}

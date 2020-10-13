import { useCallback } from 'react';
import { toast } from 'react-toastify';

import Toast from 'components/shared/Toast';

type ToastProps = {
  title: string;
  id: string | number;
  onCloseComplete?: () => void;
  undo?: (id?: string) => void;
};

export const useAppToast = () => {
  const customToast = useCallback(
    (props: ToastProps) => {
      toast(<Toast {...props} />, {
        onClose: props.onCloseComplete,
      });
    },
    [toast]
  );

  return customToast;
};

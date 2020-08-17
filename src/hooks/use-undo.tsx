import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import { ToastUndo } from 'components/shared';

interface Props {
  onAction: () => void;
  onClose: () => void;
  toastId: string;
  toastTitle: string;
}

export const useUndo = ({
  onAction,
  onClose,
  toastId,
  toastTitle,
}: Props): { action: () => void; isHidden: boolean } => {
  const [isHidden, setHidden] = useState(false);

  const _onClose = useCallback(() => {
    if (!isHidden) return;

    onClose();
  }, [onClose]);

  const undo = useCallback(() => {
    setHidden(false);
  }, []);

  const action = useCallback(() => {
    setHidden(true);
    onAction();

    toast(<ToastUndo title={toastTitle} id={toastId} undo={undo} />, {
      onClose: _onClose,
    });
  }, [onAction]);

  return { action, isHidden };
};

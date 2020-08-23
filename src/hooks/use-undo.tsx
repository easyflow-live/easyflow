import { useCallback, useRef, useState } from 'react';
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
  const isHiddenRef = useRef(false);
  const [, forceUpdate] = useState(false);

  const _onClose = useCallback(() => {
    if (!isHiddenRef.current) return;

    onClose();
  }, [onClose]);

  const undo = useCallback(() => {
    isHiddenRef.current = false;
    forceUpdate(s => !s);
  }, []);

  const action = useCallback(() => {
    isHiddenRef.current = true;
    onAction();

    toast(<ToastUndo title={toastTitle} id={toastId} undo={undo} />, {
      onClose: _onClose,
    });
  }, [onAction, _onClose, undo, toastId, toastTitle]);

  return { action, isHidden: isHiddenRef.current };
};

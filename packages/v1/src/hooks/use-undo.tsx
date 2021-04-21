import { useCallback, useRef, useState } from 'react';

import { useAppToast } from './use-app-toast';

interface Props {
  onAction?: () => void;
  onCloseComplete: () => void;
  toastId?: string;
  toastTitle: string;
}

export const useUndo = ({
  onAction,
  onCloseComplete,
  toastId,
  toastTitle,
}: Props): { action: () => void; isHidden: boolean } => {
  const toast = useAppToast();
  const isHiddenRef = useRef(false);
  const [, forceUpdate] = useState(false);

  const _onClose = useCallback(() => {
    if (!isHiddenRef.current) return;

    onCloseComplete();
  }, [onCloseComplete]);

  const undo = useCallback(() => {
    isHiddenRef.current = false;
    forceUpdate(s => !s);
  }, []);

  const action = useCallback(() => {
    isHiddenRef.current = true;
    onAction?.();

    toast({
      id: toastId,
      title: toastTitle,
      onCloseComplete: _onClose,
      undo,
    });
  }, [onAction, _onClose, undo, toast, toastTitle]);

  return { action, isHidden: isHiddenRef.current };
};

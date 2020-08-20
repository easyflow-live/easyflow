import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import ReactModal from 'react-modal';

import CardModalFull, {
  getStyle,
  CardModalProps,
} from 'components/CardModal/CardModalFull';
import { useThinDisplay } from 'hooks/use-thin-display';

interface CardModalContextProps {
  showModal: (props: CardModalProps) => void;
  hideModal: () => void;
  isOpen: boolean;
}

export const CardModalContext = createContext<CardModalContextProps>({
  showModal: () => {},
  hideModal: () => {},
  isOpen: false,
});

const useModal = () => {
  const [isOpen, setIsShow] = useState(false);
  const [modalProps, setModalProps] = useState<CardModalProps>(null);

  const hideModal = useCallback(() => setIsShow(false), []);

  const showModal = useCallback((props: CardModalProps) => {
    setIsShow(true);
    setModalProps(props);
  }, []);

  return { isOpen, showModal, hideModal, modalProps };
};

export const CardModalProvider = ({ children }: PropsWithChildren<{}>) => {
  const isThinDisplay = useThinDisplay();
  const customStyle = useMemo(() => getStyle(isThinDisplay), [isThinDisplay]);

  const { isOpen, showModal, hideModal, modalProps } = useModal();

  return (
    <CardModalContext.Provider value={{ isOpen, hideModal, showModal }}>
      <>
        {children}
        <ReactModal
          isOpen={isOpen}
          onRequestClose={hideModal}
          style={customStyle}
          includeDefaultStyles={false}
        >
          <CardModalFull {...modalProps} onClose={hideModal} />
        </ReactModal>
      </>
    </CardModalContext.Provider>
  );
};

export const useCardFullModal = () => {
  const context = useContext(CardModalContext);

  if (context === undefined) {
    throw new Error('useInterface must be used within a CardModalProvider');
  }
  return context;
};

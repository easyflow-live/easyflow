import { createContext, useContext, useState, PropsWithChildren } from 'react';

interface InterfaceContextProps {
  isMenuOpen: boolean;
  setMenu: (value: boolean) => void;
  previewMode: boolean;
  togglePreviewMode: () => void;
  setPreviewMode: (value: boolean) => void;
}

export const InterfaceContext = createContext<InterfaceContextProps>(null);

export const InterfaceProvider = (props: PropsWithChildren<{}>) => {
  const [isMenuOpen, setMenu] = useState();
  const [previewMode, setPreviewMode] = useState();

  const togglePreviewMode = () => setPreviewMode(s => !s);

  return (
    <InterfaceContext.Provider
      {...props}
      value={{
        isMenuOpen,
        setMenu,
        previewMode,
        togglePreviewMode,
        setPreviewMode,
      }}
    />
  );
};

export const useInterface = () => {
  const context = useContext(InterfaceContext);

  if (context === undefined) {
    throw new Error('useInterface must be used within a InterfaceProvider');
  }
  return context;
};

import { createContext, useContext, useState } from 'react';

interface InterfaceContextProps {
  isEditable: boolean; // if there is a logged user, this will be true
  isKioskMode: boolean;
  setIsEditable: (value: boolean) => void;
  setIsKioskMode: (value: boolean) => void;
}

export const InterfaceContext = createContext<InterfaceContextProps>(null);

export const InterfaceProvider = props => {
  const [isEditable, setIsEditable] = useState();
  const [isKioskMode, setIsKioskMode] = useState();

  return (
    <InterfaceContext.Provider
      {...props}
      value={{ isEditable, setIsEditable, isKioskMode, setIsKioskMode }}
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

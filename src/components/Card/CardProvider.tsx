import { createContext, useContext, ReactChild } from 'react';

import CardDocument from '../../documents/card.doc';
import { useCardAssignees } from '../../hooks/use-card-assignees';

interface CardContextProp {
  assignees: any[];
  isLoadingAssignees: boolean;
}

export const CardContext = createContext<CardContextProp>(null);

interface CardProviderProps {
  card: CardDocument;
  children: ReactChild;
}

export const CardProvider = ({ card, ...props }: CardProviderProps) => {
  const { assignees, isLoading } = useCardAssignees(card);
  return (
    <CardContext.Provider
      value={{ assignees, isLoadingAssignees: isLoading }}
      {...props}
    />
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);

  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
};

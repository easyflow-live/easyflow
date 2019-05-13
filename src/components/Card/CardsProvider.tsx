import React from 'react';

const CardsContext = React.createContext();

function useCards() {
  const context = React.useContext(CardsContext);
  if (!context) {
    throw new Error(`useCards must be used within a CardsProvider`);
  }

  const [state, dispatch] = context;

  const moveCard = () =>
    dispatch({
      type: 'MOVE_CARD',
      payload: {
        oldCardIndex,
        newCardIndex,
        sourceListId,
        destListId,
      },
    });

  const addCard = () =>
    dispatch({
      type: 'ADD_CARD',
      payload: {
        listId,
        cardId,
      },
    });

  return {
    state,
    dispatch,
    moveCard,
    addCard,
  };
}

function CardsProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, {});
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <CardsContext.Provider value={value} {...props} />;
}

function CardsConsumer(props) {
  const { state, dispatch, moveCard, addCArd } = useCards();
  return <CardsContext.Consumer {...props} />;
}

export { CardsProvider, CardsConsumer, useCards };

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD': {
      const { listId, cardId } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], cards: [...state[listId].cards, cardId] },
      };
    }
    case 'MOVE_CARD': {
      const {
        oldCardIndex,
        newCardIndex,
        sourceListId,
        destListId,
      } = action.payload;
      // Move within the same list
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        return {
          ...state,
          [sourceListId]: { ...state[sourceListId], cards: newCards },
        };
      }
      // Move card from one list to another
      const sourceCards = Array.from(state[sourceListId].cards);
      const [removedCard] = sourceCards.splice(oldCardIndex, 1);
      const destinationCards = Array.from(state[destListId].cards);
      destinationCards.splice(newCardIndex, 0, removedCard);
      return {
        ...state,
        [sourceListId]: { ...state[sourceListId], cards: sourceCards },
        [destListId]: { ...state[destListId], cards: destinationCards },
      };
    }
    case 'DELETE_CARD': {
      const { cardId: newCardId, listId } = action.payload;
      return {
        ...state,
        [listId]: {
          ...state[listId],
          cards: state[listId].cards.filter(cardId => cardId !== newCardId),
        },
      };
    }
    case 'ADD_LIST': {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { _id: listId, title: listTitle, cards: [] },
      };
    }
    case 'CHANGE_LIST_TITLE': {
      const { listId, listTitle } = action.payload;
      return {
        ...state,
        [listId]: { ...state[listId], title: listTitle },
      };
    }
    case 'DELETE_LIST': {
      const { listId } = action.payload;
      const { [listId]: deletedList, ...restOfLists } = state;
      return restOfLists;
    }
    default:
      return state;
  }
};

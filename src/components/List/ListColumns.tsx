import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Collection, Document } from 'firestorter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import ListDocument from '../../documents/list.doc';
import firebaseService from '../../services/firebase.service';
import List from './List';
import CardDocument from 'src/documents/card.doc';

interface ListsProps {
  lists: Collection<ListDocument>;
  onCardMove: (
    card: CardDocument['ref'],
    listBefore: ListDocument['ref'],
    listAfter: ListDocument['ref'],
    cardTitle: string
  ) => void;
}

interface UpdatedHash {
  [id: string]: number;
}

const ListColumns = ({ lists, onCardMove }: ListsProps) => {
  const [localLists, setLocalLists] = useState([]);

  useEffect(() => {
    setLocalLists(lists.docs);
  }, [lists.docs, lists.docs.length]);

  const updateDocs = (documents: Document[], updatedHashTable: UpdatedHash) => {
    const batch = firebaseService.db.batch();

    documents.forEach(doc => {
      if (
        updatedHashTable[doc.id] !== null &&
        updatedHashTable[doc.id] !== undefined
      ) {
        batch.update(doc.ref, {
          index: updatedHashTable[doc.id],
        });
      }
    });

    batch.commit().catch(() => toast(`An error occurred. Please, try again.`));
  };

  const updateLists = (updatedListHash: UpdatedHash) => {
    updateDocs(lists.docs, updatedListHash);
  };

  const updateCards = (
    listDocument: ListDocument,
    updatedCardHash: UpdatedHash
  ) => {
    updateDocs(listDocument.cards.docs, updatedCardHash);
  };

  const handleDragEnd = result => {
    const { source, destination, type } = result;
    const mutableLists = [...localLists];

    // dropped outside the list
    if (!destination) return;

    // did not move anywhere
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const isMovingAList = type === 'COLUMN';

    if (isMovingAList) {
      const [removed] = mutableLists.splice(source.index, 1);
      mutableLists.splice(destination.index, 0, removed);

      const destId = mutableLists[destination.index].id;
      const sourceId = mutableLists[source.index].id;

      // Create a hash table to update only the list that changed(swapped)
      const listHashRef: UpdatedHash = {
        [destId]: destination.index,
        [sourceId]: source.index,
      };

      // Update the ui
      setLocalLists(mutableLists);

      // Update the databsase
      updateLists(listHashRef);
      return;
    }

    // otherwise, is moving a card
    const batch = firebaseService.db.batch();

    const sourceListDocument = mutableLists.find(
      l => l.id === source.droppableId
    );
    const mutableSourceCards = sourceListDocument.cards.docs;

    const isMovingToAnotherList =
      source.droppableId !== destination.droppableId;

    if (isMovingToAnotherList) {
      const destListDocument = mutableLists.find(
        l => l.id === destination.droppableId
      );

      const [removedCard] = sourceListDocument.cards.docs.splice(
        source.index,
        1
      );

      batch.delete(removedCard.ref);

      // Add the removed item to the destination list
      destListDocument.cards.docs.splice(destination.index, 0, removedCard);

      setLocalLists(mutableLists);

      destListDocument.cards.docs.forEach((doc, index) => {
        doc.id === removedCard.id
          ? destListDocument.cards.add({
              ...doc.data,
              index,
              listBefore: sourceListDocument.ref,
              listAfter: destListDocument.ref,
            })
          : batch.update(doc.ref, { index });
      });
      batch
        .commit()
        .then(() =>
          onCardMove(
            removedCard.ref,
            sourceListDocument.ref,
            destListDocument.ref,
            removedCard.data.title
          )
        )
        .catch(e => {
          toast(`An error occurred. Please, try again.`);
          console.log(e);
        });
    } else {
      // Handle change cards in the same list

      const [removedCard] = sourceListDocument.cards.docs.splice(
        source.index,
        1
      );
      sourceListDocument.cards.docs.splice(destination.index, 0, removedCard);

      const destId = mutableSourceCards[destination.index].id;
      const sourceId = mutableSourceCards[source.index].id;

      // Create a hash table to update only the cards that changed(swapped)
      const cardHashRef: UpdatedHash = {
        [destId]: destination.index,
        [sourceId]: source.index,
      };

      // Change state to update the ui
      setLocalLists(mutableLists);

      // Update the databsase
      updateCards(sourceListDocument, cardHashRef);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={'board'} type='COLUMN' direction='horizontal'>
        {provided => (
          <div
            className='inline-flex items-start h-full'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {localLists.map((list: ListDocument, index: number) => (
              <List key={list.id} list={list} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default observer(ListColumns);

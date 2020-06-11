import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { observer } from 'mobx-react-lite';
import React, { useMemo, useState, CSSProperties, useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import ReactModal from 'react-modal';

import CardDocument, { Card } from '../../documents/card.doc';
import { useThinDisplay } from '../../hooks/use-thin-display';
import { Heading, Button } from '../shared';
import {
  Editable as EditableComplex,
  EditableInput,
  EditablePreview,
  EditableTrigger,
} from '../shared/EditableComplex';
import MarkdownText from '../shared/MarkdownText';
import BadgeTaskProgress from '../CardBadges/BadgeTaskProgress';
import { findCheckboxes } from '../../helpers/find-check-boxes';
import { Assignees } from './Assignees';
import { DueCalendar } from './DueCalendar';
import { useBoardsStore } from '../../store';
import { Tags } from './Tags';
import CardMenu from './CardMenu';
import { useInterface } from '../providers/InterfaceProvider';
import Color from './Color';

const LeftColumn = styled.div`
  margin: 0px 16px;
  overflow-wrap: break-word;
  width: calc(100% - 32px);

  @media (min-width: 640px) {
    flex: 1 0 calc(75% - 32px);
    max-width: calc(75% - 32px);
    min-width: calc(8.33333% - 32px);
  }
`;

const RightColumn = styled.div`
  margin: 0px 16px;
  min-width: calc(8.33333% - 32px);
  overflow-wrap: break-word;
  width: calc(100% - 32px);
  max-width: 100%;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #718096;

  @media (min-width: 640px) {
    flex: 1 0 calc(25% - 32px);
    max-width: calc(25% - 32px);
    border-top: 0;
    margin-top: 0;
    padding-top: 0;
  }
`;

const HoverableContainer: React.FC<{ style?: CSSProperties }> = props => (
  <div
    className='-ml-2 relative hover:bg-gray-600 transition duration-300 rounded w-full'
    {...props}
  >
    <div className='flex px-2'>{props.children}</div>
  </div>
);

interface CardModalProps {
  card: CardDocument;
  listId: string;
  onClose: () => void;
  onRemove?: () => Promise<void>;
  onUpdate: (data: Partial<Card>) => Promise<void>;
}

const CardModalFull: React.FC<CardModalProps> = props => {
  const { card, listId, onClose, onUpdate, onRemove } = props;

  const { title } = card.data;

  const [newText] = useState(card.data.text);
  const checkboxes = useMemo(() => findCheckboxes(newText), [newText]);

  const { currentBoard } = useBoardsStore();

  const handleTagClick = (tags: string[]) => onUpdate({ tags });
  const removeTag = (tag: string) => card.removeTag(tag);
  const changeColor = (color: string) => onUpdate({ color });

  return (
    <div
      className='w-full h-full bg-gray-900 bg-opacity-75'
      role='dialog'
      aria-labelledby='modal-label'
      aria-modal='true'
    >
      <div className='w-full h-full'>
        <div className='bg-gray-750 rounded-lg w-full h-full'>
          <div className='flex flex-col flex-auto max-h-full'>
            <div>
              <div className='flex items-center justify-between py-8 px-8 sm:px-12 rounded-t-lg'>
                <EditableComplex
                  value={title || 'No title'}
                  onSubmit={title => onUpdate({ title })}
                >
                  {({ isEditing, onSubmit, onCancel }) => (
                    <div className='w-full'>
                      <EditableInput style={{ maxWidth: '670px' }} />
                      <HoverableContainer style={{ maxWidth: '670px' }}>
                        <EditableTrigger>
                          <div className='cursor-text w-full'>
                            <EditablePreview>
                              {({ value }) => <Heading text={value} />}
                            </EditablePreview>
                          </div>
                        </EditableTrigger>
                        {isEditing && (
                          <div className='absolute right-0 z-10'>
                            <div className='mt-4'>
                              <Button
                                onClick={onSubmit}
                                className='mr-4'
                                size='small'
                              >
                                Save
                              </Button>
                              <Button
                                variant='secondary'
                                onClick={onCancel}
                                size='small'
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </HoverableContainer>
                    </div>
                  )}
                </EditableComplex>

                <CardMenu title='Card removed' onRemove={onRemove} />
                <button
                  aria-label='Close'
                  className='text-gray-500 hover:text-gray-100 rounded p-2 hover:bg-gray-900 hover:bg-opacity-25 transition duration-300'
                  onClick={onClose}
                >
                  <MdClose size='25' />
                </button>
              </div>
            </div>

            <div className='flex-auto px-4 sm:px-8 overflow-x-hidden overflow-y-auto'>
              <div className='mb-8'>
                <div className='flex items-start flex-col sm:flex-row relative max-w-full'>
                  <LeftColumn>
                    <div>
                      <h3 className='text-gray-400 mb-1'>Description</h3>

                      <EditableComplex
                        submitOnEnter={false}
                        value={card.data.text}
                        onSubmit={text => onUpdate({ text })}
                      >
                        {({ onCancel, onSubmit }) => (
                          <>
                            <EditableInput>
                              {props => (
                                <div className='column'>
                                  <Textarea
                                    {...props}
                                    className='text-white w-full bg-gray-600 rounded shadow py-2 px-3'
                                  />

                                  <div className='mt-4'>
                                    <Button
                                      onClick={onSubmit}
                                      className='mr-4'
                                      size='small'
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      variant='secondary'
                                      onClick={onCancel}
                                      size='small'
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </EditableInput>

                            <EditablePreview>
                              {({ value }) => (
                                <HoverableContainer>
                                  <EditableTrigger>
                                    <div className='w-full cursor-text'>
                                      <MarkdownText
                                        className='text-white text-left'
                                        source={value}
                                      />
                                    </div>
                                  </EditableTrigger>
                                </HoverableContainer>
                              )}
                            </EditablePreview>
                          </>
                        )}
                      </EditableComplex>
                    </div>
                  </LeftColumn>

                  <RightColumn>
                    <div>
                      <h3 className='text-gray-400 mb-1'>Tags</h3>
                      <div>
                        <Tags
                          allTags={currentBoard.data.tags}
                          tags={card.data.tags}
                          onChange={handleTagClick}
                          onRemove={removeTag}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className='text-gray-400 mt-3 mb-1'>Due date</h3>
                      <div>
                        <DueCalendar
                          date={card.data.date}
                          completed={card.data.completed}
                          onUpdate={onUpdate}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className='text-gray-400 my-3'>Assignments</h3>
                      <div>
                        <Assignees card={card} listId={listId} />
                      </div>
                    </div>

                    <div>
                      <h3 className='text-gray-400 my-3'>Tasks</h3>
                      <div>
                        <BadgeTaskProgress
                          total={checkboxes.total}
                          checked={checkboxes.checked}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className='text-gray-400 mt-3 mb-1'>Card color</h3>
                      <div>
                        <Color color={card.data.color} onChange={changeColor} />
                      </div>
                    </div>
                  </RightColumn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStyle = (isThinDisplay: boolean) => ({
  overlay: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    position: 'absolute',
    display: 'flex',
    background: 'transparent',
    border: 0,
    width: '1040px',
    maxWidth: '100%',
    height: isThinDisplay ? '100%' : 'calc(100% - 119px)',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    padding: isThinDisplay ? 0 : '20px',
  },
});

export const useCardFullModal = () => {
  const [isShow, setIsShow] = useState(false);
  const { setOpenedModal } = useInterface();

  const isThinDisplay = useThinDisplay();

  const customStyle = useMemo(() => getStyle(isThinDisplay), [isThinDisplay]);

  const show = useCallback(() => {
    setIsShow(true);
    setOpenedModal(true);
  }, [setOpenedModal]);

  const hide = useCallback(() => {
    setIsShow(false);
    setOpenedModal(false);
  }, [setOpenedModal]);

  const Modal = useCallback(
    (props: Omit<CardModalProps, 'onClose'>) => (
      <ReactModal
        isOpen={isShow}
        onRequestClose={hide}
        style={customStyle}
        includeDefaultStyles={false}
      >
        <CardModalFull {...props} onClose={hide} />
      </ReactModal>
    ),
    [isShow, hide, customStyle]
  );
  return { Modal, isShow, show, hide };
};

export default observer(CardModalFull);

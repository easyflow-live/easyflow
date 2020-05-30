import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { observer } from 'mobx-react-lite';
import {
  useMemo,
  useState,
  PropsWithChildren,
  CSSProperties,
  useCallback,
} from 'react';
import CardDocument, { Card } from '../../documents/card.doc';
import { MdClose } from 'react-icons/md';
import ReactModal from 'react-modal';

import { Editable, Heading, Button } from '../shared';
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

const LeftColumn = styled.div`
  flex: 1 0 calc(75% - 32px);
  margin: 0px 16px;
  max-width: calc(75% - 32px);
  min-width: calc(8.33333% - 32px);
  overflow-wrap: break-word;
`;

const RightColumn = styled.div`
  flex: 1 0 calc(25% - 32px);
  margin: 0px 16px;
  max-width: calc(25% - 32px);
  min-width: calc(8.33333% - 32px);
  overflow-wrap: break-word;
`;

const HiddenButton = styled.button`
  background: transparent none repeat scroll 0% 0%;
  border: 0px none;
  display: inline-block;
  line-height: 1;
  margin: 0px;
  padding: 0px;
  opacity: 0;
  outline: currentcolor none 0px;
`;

const HoverableContainer = ({
  children,
  ...props
}: PropsWithChildren<{ style?: CSSProperties }>) => (
  <div
    className='-ml-2 hover:bg-gray-600 transition duration-300 rounded'
    {...props}
  >
    <div className='flex px-2'>{children}</div>
  </div>
);

interface CardModalProps {
  card: CardDocument;
  listId: string;
  onClose: () => void;
  onRemove?: () => Promise<void>;
  onUpdate: (data: Partial<Card>) => Promise<void>;
}

const CardModalFull = ({
  card,
  listId,
  onClose,
  onUpdate,
}: //onRemove,
CardModalProps) => {
  const { title } = card.data;

  const [newText] = useState(card.data.text);
  const checkboxes = useMemo(() => findCheckboxes(newText), [newText]);

  const { currentBoard } = useBoardsStore();
  const handleTagClick = (tags: string[]) => onUpdate({ tags });

  const removeTag = (tag: string) => card.removeTag(tag);

  return (
    <div
      className='w-full h-full bg-gray-900 bg-opacity-75'
      role='dialog'
      aria-labelledby='modal-label'
      aria-modal='true'
    >
      <div className='w-full h-full'>
        <div className='bg-gray-700 rounded-lg w-full h-full'>
          <div className='flex flex-col flex-auto max-h-full'>
            <div>
              <div className='flex items-center justify-between p-8 px-12 rounded-t-lg'>
                <Editable
                  value={title || 'No title'}
                  onSubmit={title => onUpdate({ title })}
                  inputProps={{ style: { maxWidth: '780px' } }}
                >
                  {({ value, onClick }) => (
                    <HoverableContainer style={{ maxWidth: '780px' }}>
                      <div className='cursor-text w-full' onClick={onClick}>
                        <Heading text={value} />
                      </div>
                      <HiddenButton aria-label='Edit title' onClick={onClick} />
                    </HoverableContainer>
                  )}
                </Editable>
                <button
                  aria-label='Close'
                  className='text-gray-500 hover:text-gray-100'
                  onClick={onClose}
                >
                  <MdClose size='25' />
                </button>
              </div>
            </div>

            <div className='flex-auto px-8 overflow-x-hidden overflow-y-auto'>
              <div className='mb-8'>
                <div className='flex items-start flex-wrap relative max-w-full'>
                  <LeftColumn>
                    <div>
                      <h3 className='text-gray-400 mb-1'>Description</h3>

                      <EditableComplex
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
                      <h3 className='text-gray-400 mt-3 mb-1'>Assignments</h3>
                      <div>
                        <Assignees card={card} listId={listId} />
                      </div>
                    </div>

                    <div>
                      <h3 className='text-gray-400 mt-3 mb-1'>Tasks</h3>
                      <div>
                        <BadgeTaskProgress
                          total={checkboxes.total}
                          checked={checkboxes.checked}
                        />
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

const customStyle = {
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
    maxWidth: 'calc(100% - 120px)',
    height: 'calc(100% - 119px)',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
};

export const useCardFullModal = () => {
  const [isShow, setIsShow] = useState(false);

  const show = useCallback(() => setIsShow(true), []);
  const hide = useCallback(() => setIsShow(false), []);

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
    [isShow]
  );

  return { Modal, isShow, show, hide };
};

export default observer(CardModalFull);

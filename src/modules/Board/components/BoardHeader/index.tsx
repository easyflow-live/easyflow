import React from 'react';
import { MdTimeline, MdViewColumn } from 'react-icons/md';
import { observer } from 'mobx-react-lite';

import BoardDocument from 'modules/Board/data/board.doc';
import { useInterface } from 'components/providers/InterfaceProvider';
import { SafariButtonWarning } from 'components/shared';
import AddNewListModal from './AddNewListModal';
import TeamListModal from './TeamListModal';
import BoardButton from './BoardButton';
import BoardMenu from './BoardMenu';
import BoardTitle from './BoardTitle';
import Team from './Team';
import { useSession } from 'hooks/use-session';

interface BoardHeaderProps {
  board: BoardDocument;
  onRemove: () => Promise<void>;
  previewMode?: boolean;
}

const BoardHeader = ({ board, onRemove, previewMode }: BoardHeaderProps) => {
  const { setMenu } = useInterface();
  const { user } = useSession();
  const toggleMenu = () => setMenu(true);
  const isOwner = board.isOwner(user.email);

  return (
    <div className='flex justify-between items-center'>
      <BoardTitle
        boardTitle={board.data.title}
        boardId={board.id}
        editable={!previewMode}
      />
      <div className='flex items-center'>
        <BoardButton
          disabled={previewMode}
          style={{ paddingLeft: '18px' }}
          icon={<Team board={board} />}
          renderModal={props => <TeamListModal board={board} {...props} />}
        />
        {!previewMode && (
          <>
            <BoardButton
              icon={<MdViewColumn size='16px' />}
              text='Add column'
              renderModal={props => (
                <AddNewListModal board={board} {...props} />
              )}
            />
            <BoardButton
              icon={<MdTimeline size='16px' />}
              text='Activity'
              onClick={toggleMenu}
            />

            <BoardMenu
              className='ml-2'
              isOwner={isOwner}
              board={board}
              onRemove={onRemove}
            />
          </>
        )}

        {previewMode && !user && (
          <div className='px-3'>
            <SafariButtonWarning />
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(BoardHeader);

import { FaList } from 'react-icons/fa';
import firebase from 'firebase';
import shortid from 'shortid';

import InputModal from './InputModal';
import BoardButton from './BoardButton';
import { toast } from 'react-toastify';

const BoardAddListButton = ({ boardId }) => {
  const handleSubmit = async value => {
    if (!value) return;

    const lists = firebase
      .firestore()
      .collection('boards')
      .doc(boardId)
      .collection('lists');

    const index = (await lists.get()).size;

    return lists
      .add({
        uid: shortid.generate(),
        title: value,
        index,
      })
      .then(() => {
        toast(`A new list was created!`);
      });
  };

  return (
    <BoardButton
      icon={<FaList />}
      text='Add list'
      renderModal={props => <InputModal {...props} onSubmit={handleSubmit} />}
    />
  );
};

export default BoardAddListButton;

import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react';

import { cards as cardsActions } from '../../core/actions';
import boardsStore from '../../store/boards';
import userStore from '../../store/users';
import ClickOutside from '../ClickOutside/ClickOutside';
import './CardAdder.css';

class CardAdder extends Component {
  constructor() {
    super();
    this.state = {
      newText: '',
      isOpen: false
    };
  }

  toggleCardComposer = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleChange = event => {
    this.setState({ newText: event.target.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      this.handleSubmit(event);
    } else if (event.keyCode === 27) {
      this.toggleCardComposer();
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { newText } = this.state;
    const { cards, limit, list } = this.props;
    if (newText === '') return;

    //current size plus 1
    const amount = cards.docs.length + 1;
    const hasLimit = parseInt(limit) !== 0;
    const greaterThanLimit = amount > parseInt(limit);

    if (hasLimit && greaterThanLimit) {
      toast('Cards limit reached!');
    }

    const index = (await cards.ref.get()).size;
    const createdCard = await cards.add({
      text: newText,
      color: '#a0aec0',
      date: '',
      index,
      createdAt: Date.now(),
      listBefore: this.props.list.ref,
      title: newText
    });

    this.toggleCardComposer();
    this.setState({ newText: '' });

    cardsActions.newCardAction({
      memberCreator: userStore.currentUser.ref,
      data: {
        card: createdCard.ref,
        list: list.ref,
        board: boardsStore.currentBoard.ref,
        title: newText
      }
    });
  };

  render() {
    const { newText, isOpen } = this.state;
    return isOpen ? (
      <ClickOutside handleClickOutside={this.toggleCardComposer}>
        <form onSubmit={this.handleSubmit} className='m-2'>
          <input
            autoFocus
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={newText}
            className='shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 bg-gray-500 leading-tight'
            placeholder='Add a new card...'
            spellCheck={false}
            onBlur={this.toggleCardComposer}
          />
        </form>
      </ClickOutside>
    ) : (
      <button
        onClick={this.toggleCardComposer}
        className='add-card-button flex justify-center bg-pink-500 hover:bg-pink-600 text-2xl shadow-lg rounded-lg cursor-pointer text-white opacity-0'
      >
        +
      </button>
    );
  }
}

export default observer(CardAdder);

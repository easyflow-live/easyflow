import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import './BoardTitle.scss';
import PageTitle from '../PageTitle/PageTitle';

interface BoardTitleProps {
  boardTitle: string;
  boardId: string;
  editable?: boolean;
}

interface State {
  isOpen: boolean;
  newTitle: string;
}

class BoardTitle extends Component<BoardTitleProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.boardTitle,
    };
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  submitTitle = () => {
    const { boardId, boardTitle } = this.props;
    const { newTitle } = this.state;
    if (newTitle === '') return;
    if (boardTitle !== newTitle) {
      firebase
        .firestore()
        .collection('boards')
        .doc(boardId)
        .update({
          title: newTitle,
        });
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    const { boardTitle } = this.props;
    this.setState({ newTitle: boardTitle, isOpen: false });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.submitTitle();
    } else if (event.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleFocus = event => {
    event.target.select();
  };

  render() {
    const { isOpen, newTitle } = this.state;
    const { boardTitle, editable } = this.props;

    return isOpen && editable ? (
      <input
        autoFocus
        value={newTitle}
        type='text'
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        onBlur={this.revertTitle}
        onFocus={this.handleFocus}
        className='text-xl shadow appearance-none rounded py-1 px-2 text-white bg-transparent leading-tight'
        spellCheck={false}
      />
    ) : (
      <button className='board-title-button' onClick={this.handleClick}>
        <PageTitle text={boardTitle} />
      </button>
    );
  }
}

export default BoardTitle;

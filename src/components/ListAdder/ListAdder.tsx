import React, { Component } from 'react';
import firebase from 'firebase';
import shortid from 'shortid';

import './ListAdder.css';

interface ListAdderProps {
  boardId: string;
}

interface State {
  isOpen: boolean;
  listTitle: string;
}

class ListAdder extends Component<ListAdderProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      listTitle: '',
    };
  }
  handleBlur = () => {
    this.setState({ isOpen: false });
  };
  handleChange = event => {
    this.setState({ listTitle: event.target.value });
  };
  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmit();
    } else if (event.keyCode === 27) {
      this.setState({ isOpen: false, listTitle: '' });
    }
  };
  handleSubmit = async () => {
    const { boardId } = this.props;
    const { listTitle } = this.state;

    if (listTitle === '') return;

    const lists = firebase
      .firestore()
      .collection('boards')
      .doc(boardId)
      .collection('lists');

    const index = (await lists.get()).size;

    await lists.add({
      uid: shortid.generate(),
      title: listTitle,
      index,
    });

    this.setState({ isOpen: false, listTitle: '' });
  };
  render() {
    const { isOpen, listTitle } = this.state;
    if (!isOpen) {
      return (
        <button
          onClick={() => this.setState({ isOpen: true })}
          className='m-2 p-2 bg-gray-700 hover:bg-gray-600 shadow-lg text-white rounded-lg cursor-pointer invisible select-none flex inline-flex add-list-button'
        >
          Add a new list...
        </button>
      );
    }
    return (
      <div className='list'>
        <input
          autoFocus
          value={listTitle}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className='shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onBlur={this.handleBlur}
          spellCheck={false}
        />
      </div>
    );
  }
}

export default ListAdder;

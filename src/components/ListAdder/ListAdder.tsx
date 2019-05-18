import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import firebase from 'firebase';
import shortid from 'shortid';

import './ListAdder.scss';

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
          className='add-list-button'
        >
          Add a new list...
        </button>
      );
    }
    return (
      <div className='list'>
        <Textarea
          autoFocus
          useCacheForDOMMeasurements
          value={listTitle}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className='list-adder-textarea'
          onBlur={this.handleBlur}
          spellCheck={false}
        />
      </div>
    );
  }
}

export default ListAdder;

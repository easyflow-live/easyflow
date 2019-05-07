import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import firebase from 'firebase';
import shortid from 'shortid';

import './ListAdder.scss';

class ListAdder extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
  };

  constructor() {
    super();
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

    await firebase
      .firestore()
      .collection('boards')
      .doc(boardId)
      
      .update({
        lists: firebase.firestore.FieldValue.arrayUnion({
          title: listTitle,
          uid: shortid.generate(),
        }),
      });

    this.setState({ isOpen: false, listTitle: '' });
  };
  render = () => {
    const { isOpen, listTitle } = this.state;
    if (!isOpen) {
      return (
        <button
          onClick={() => this.setState({ isOpen: true })}
          className="add-list-button"
        >
          Add a new list...
        </button>
      );
    }
    return (
      <div className="list">
        <Textarea
          autoFocus
          useCacheForDOMMeasurements
          value={listTitle}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className="list-adder-textarea"
          onBlur={this.handleBlur}
          spellCheck={false}
        />
      </div>
    );
  };
}

export default ListAdder;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import firebase from 'firebase';
import ClickOutside from '../ClickOutside/ClickOutside';
import './CardAdder.scss';

class CardAdder extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      newText: '',
      isOpen: false,
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
    const { listId, boardId } = this.props;
    if (newText === '') return;

    await firebase
      .database()
      .ref(`boards`)
      .child(boardId)
      .child('lists')
      .child(listId)
      .child('cards')
      .push({ text: newText });

    this.toggleCardComposer();
    this.setState({ newText: '' });
  };

  render() {
    const { newText, isOpen } = this.state;
    return isOpen ? (
      <ClickOutside handleClickOutside={this.toggleCardComposer}>
        <form
          onSubmit={this.handleSubmit}
          className="card-adder-textarea-wrapper"
        >
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            minRows={1}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={newText}
            className="card-adder-textarea"
            placeholder="Add a new card..."
            spellCheck={false}
            onBlur={this.toggleCardComposer}
          />
        </form>
      </ClickOutside>
    ) : (
      <button onClick={this.toggleCardComposer} className="add-card-button">
        +
      </button>
    );
  }
}

export default CardAdder;

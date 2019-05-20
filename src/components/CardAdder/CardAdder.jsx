import React, { Component } from 'react';

import ClickOutside from '../ClickOutside/ClickOutside';
import './CardAdder.css';

class CardAdder extends Component {
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
    const { cards } = this.props;
    if (newText === '') return;

    const index = (await cards.ref.get()).size;
    cards.add({ text: newText, color: 'white', date: '', index });

    this.toggleCardComposer();
    this.setState({ newText: '' });
  };

  render() {
    const { newText, isOpen } = this.state;
    return isOpen ? (
      <ClickOutside handleClickOutside={this.toggleCardComposer}>
        <form onSubmit={this.handleSubmit} className="m-2">
          <input
            autoFocus
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={newText}
            className="shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Add a new card..."
            spellCheck={false}
            onBlur={this.toggleCardComposer}
          />
        </form>
      </ClickOutside>
    ) : (
        <button
          onClick={this.toggleCardComposer}
          className="add-card-button flex justify-center bg-pink-500 hover:bg-pink-600 text-2xl shadow-lg rounded-lg cursor-pointer text-white opacity-0">
        +
      </button>
    );
  }
}

export default CardAdder;

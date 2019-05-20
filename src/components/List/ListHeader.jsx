import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';
import { FaTrash } from 'react-icons/fa';
import firebase from 'firebase';
import './ListHeader.scss';

class ListTitle extends Component {
  static propTypes = {
    listTitle: PropTypes.string.isRequired,
    dragHandleProps: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.listTitle,
    };
  }

  handleChange = event => {
    this.setState({ newTitle: event.target.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmit();
    } else if (event.keyCode === 27) {
      this.revertTitle();
    }
  };

  handleSubmit = () => {
    const { newTitle } = this.state;
    const { listTitle, list } = this.props;
    if (newTitle === '') return;
    if (newTitle !== listTitle) {
      list.ref.update({ title: newTitle });
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    this.setState({ newTitle: this.props.listTitle, isOpen: false });
  };

  deleteList = () => {
    const { list } = this.props;
    list.ref.delete();
  };

  openTitleEditor = () => {
    this.setState({ isOpen: true });
  };

  handleButtonKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.openTitleEditor();
    }
  };

  render() {
    const { isOpen, newTitle } = this.state;
    const { dragHandleProps, listTitle } = this.props;
    return (
      <div className="flex inline-flex text-lg mx-1">
        {isOpen ? (
          <div className="p-1">
            <input
              autoFocus
              value={newTitle}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onBlur={this.handleSubmit}
              spellCheck={false}
            />
          </div>
        ) : (
          <div
            {...dragHandleProps}
            role="button"
            tabIndex={0}
            onClick={this.openTitleEditor}
            onKeyDown={event => {
              this.handleButtonKeyDown(event);
              dragHandleProps.onKeyDown(event);
            }}
              className="text-white font-semibold p-2 w-full cursor-pointer break-words flex-grow"
          >
            {listTitle}
          </div>
        )}
        <Wrapper className="delete-list-wrapper" onSelection={this.deleteList}>
          <Button className="delete-list-button">
            <FaTrash />
          </Button>
          <Menu className="delete-list-menu">
            <div className="delete-list-header">Are you sure?</div>
            <MenuItem className="delete-list-confirm">Delete</MenuItem>
          </Menu>
        </Wrapper>
      </div>
    );
  }
}

export default ListTitle;

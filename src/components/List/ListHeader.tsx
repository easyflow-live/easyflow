import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';
import { FaTrash } from 'react-icons/fa';

import ListDocument from '../../documents/list.doc';
import CardCounter from './CardCounter';
import './ListHeader.scss';

interface ListTitleProps {
  listTitle: string;
  dragHandleProps: any;
  list: ListDocument;
}

interface State {
  isOpen: boolean;
  newTitle: string;
}

class ListTitle extends Component<ListTitleProps, State> {
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

  openTitleEditor = () => {
    this.setState({ isOpen: true });
  };

  handleButtonKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.openTitleEditor();
    }
  };

  handleCounterSubmit = (value: number) => {
    const { list } = this.props;
    list.ref.update({ cardsLimit: value });
  };

  deleteList = () => this.props.list.ref.delete();

  render() {
    const { isOpen, newTitle } = this.state;
    const { dragHandleProps, listTitle } = this.props;
    return (
      <div className='flex inline-flex items-center flex-shrink-0 text-lg p-1'>
        {isOpen ? (
          <div className='p-1'>
            <input
              autoFocus
              value={newTitle}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              className='shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight'
              onBlur={this.handleSubmit}
              spellCheck={false}
            />
          </div>
        ) : (
          <div
            {...dragHandleProps}
            role='button'
            tabIndex={0}
            onClick={this.openTitleEditor}
            onKeyDown={event => {
              this.handleButtonKeyDown(event);
              dragHandleProps.onKeyDown(event);
            }}
            className='text-white font-semibold p-2 w-full cursor-pointer break-words flex-grow'
          >
            {listTitle}
          </div>
        )}

        <CardCounter
          counter={this.props.list.cards.docs.length}
          max={this.props.list.data.cardsLimit}
          onChange={this.handleCounterSubmit}
        />

        <Wrapper
          className='delete-list-wrapper ml-2'
          onSelection={this.deleteList}
        >
          <Button className='delete-list-button'>
            <FaTrash />
          </Button>
          <Menu className='delete-list-menu relative'>
            <div className='delete-list-header'>Are you sure?</div>
            <MenuItem className='delete-list-confirm bg-red-500 hover:bg-red-600'>
              Delete
            </MenuItem>
          </Menu>
          <div className='popover-arrow' />
        </Wrapper>
      </div>
    );
  }
}

export default observer(ListTitle);

import React, { Component } from 'react';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';
import { FaTrash } from 'react-icons/fa';
import './BoardDeleter.scss';

class BoardDeleter extends Component {
  handleSelection = () => {
    const { boardId } = this.props;

    firebase
      .firestore()
      .collection('boards')
      .doc(boardId)
      .delete();
  };

  render = () => (
    <Wrapper
      className="board-deleter-wrapper"
      onSelection={this.handleSelection}
    >
      <Button className="board-deleter-button">
        <div className="modal-icon">
          <FaTrash />
        </div>
        <div className="board-header-right-text">&nbsp;Delete board</div>
      </Button>
      <Menu className="board-deleter-menu">
        <div className="board-deleter-header">Are you sure?</div>
        <MenuItem className="board-deleter-confirm">Delete</MenuItem>
      </Menu>
    </Wrapper>
  );
}

export default BoardDeleter;

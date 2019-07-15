import React, { Component } from 'react';
import Router from 'next/router';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';
import { FaTrash } from 'react-icons/fa';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import './BoardButton.scss';

class BoardDeleter extends Component {
  handleSelection = async () => {
    const { boardId } = this.props;

    await firebase
      .firestore()
      .collection('boards')
      .doc(boardId)
      .delete();

    Router.push('/');
    return;
  };

  render() {
    return (
      <Wrapper className='board-wrapper' onSelection={this.handleSelection}>
        <Button className='board-button'>
          <div className='modal-icon'>
            <FaTrash />
          </div>
          <div className='board-header-right-text'>&nbsp;Delete board</div>
        </Button>
        <Menu className='board-deleter-menu'>
          <div className='board-deleter-header'>Are you sure?</div>
          <MenuItem className='board-deleter-confirm'>Delete</MenuItem>
        </Menu>
      </Wrapper>
    );
  }
}

export default BoardDeleter;

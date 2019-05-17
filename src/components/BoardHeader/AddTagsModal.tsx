import React, { Component } from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';

import BoardDocument from '../../documents/board.doc';
import Tag from '../Tag/Tag';
import { observer } from 'mobx-react';
import AddTags from '../Tag/AddTags';
import './AddTagsModal.scss';
import ColorPicker from '../ColorPicker/ColorPicker';

interface AddMemberModalProps {
  boardId: string;
  buttonElement: HTMLButtonElement;
  isOpen: boolean;
  toggleCardEditor(): void;
}

interface State {
  isColorPickerOpen: boolean;
}

class AddMemberModal extends Component<AddMemberModalProps, State> {
  board: BoardDocument;
  colorPickerButton: HTMLButtonElement;

  constructor(props) {
    super(props);

    this.state = {
      isColorPickerOpen: false,
    };
    if (typeof document !== 'undefined') {
      Modal.setAppElement('#__next');
    }

    this.board = new BoardDocument(`boards/${this.props.boardId}`);
  }

  handleRequestClose = () => {
    const { isColorPickerOpen } = this.state;
    const { toggleCardEditor } = this.props;
    if (!isColorPickerOpen) {
      toggleCardEditor();
    }
  };

  handleRemoveClick = tag => {
    this.board.update({ tags: firebase.firestore.FieldValue.arrayRemove(tag) });
  };

  pickColor = (color, tag) => {
    this.board.set(
      {
        tags: [
          ...this.board.data.tags,
          {
            title: tag.title,
            bgcolor: color,
          },
        ],
      },
      { merge: true }
    );
  };

  render() {
    const { buttonElement, isOpen } = this.props;
    if (!buttonElement) {
      return null;
    }

    /*
    Create style of modal in order to not clip outside the edges no matter what device.
    */

    // Get dimensions of the card to calculate dimensions of cardModal.
    const boundingRect = buttonElement.getBoundingClientRect();

    // Returns true if card is closer to right border than to the left
    const isCardNearRightBorder =
      window.innerWidth - boundingRect.right < boundingRect.left;

    // Check if the display is so thin that we need to trigger a centered, vertical layout
    // DO NOT CHANGE the number 550 without also changing related media-query in CardOptions.scss
    const isThinDisplay = window.innerWidth < 550;

    // Position textarea at the same place as the card and position everything else away from closest edge
    const style = {
      content: {
        top: Math.min(
          boundingRect.top,
          window.innerHeight - boundingRect.height - 18
        ),
        left: isCardNearRightBorder ? null : boundingRect.left,
        right: isCardNearRightBorder
          ? window.innerWidth - boundingRect.right
          : null,
        flexDirection: isCardNearRightBorder ? 'row-reverse' : 'row',
      },
    };

    // For layouts that are less wide than 550px, let the modal take up the entire width at the top of the screen
    const mobileStyle = {
      content: {
        flexDirection: 'column',
        top: 3,
        left: 3,
        right: 3,
      },
    };

    return (
      <Modal
        closeTimeoutMS={150}
        isOpen={isOpen}
        onRequestClose={this.handleRequestClose}
        contentLabel='Add new member to board'
        overlayClassName='modal-underlay'
        className='modal'
        style={isThinDisplay ? mobileStyle : style}
        includeDefaultStyles={false}
        onClick={this.handleRequestClose}
      >
        <div
          className='tags-modal'
          style={{
            minHeight: isThinDisplay ? 'none' : boundingRect.height,
            width: isThinDisplay ? '100%' : '350px',
          }}
        >
          <AddTags document={this.board} />

          {this.board.data.tags && this.board.data.tags.length && (
            <ul className='tags'>
              {this.board.data.tags.map((t, index) => (
                <div key={index} className='tags__container'>
                  <Tag {...t} />
                  <ColorPicker onChange={color => this.pickColor(color, t)} />
                  <button onClick={() => this.handleRemoveClick(t)}>
                    Remove
                  </button>
                </div>
              ))}
            </ul>
          )}
        </div>
      </Modal>
    );
  }
}

export default observer(AddMemberModal);

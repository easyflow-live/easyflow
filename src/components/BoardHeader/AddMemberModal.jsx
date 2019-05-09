import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import firebase from '../../firebase.service';

import './AddMemberModal.scss';

class AddMemberModal extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    buttonElement: PropTypes.shape({
      getBoundingClientRect: PropTypes.func.isRequired,
    }),
    isOpen: PropTypes.bool.isRequired,
    toggleCardEditor: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isColorPickerOpen: false,
      isTextareaFocused: true,
    };
    if (typeof document !== 'undefined') {
      Modal.setAppElement('#__next');
    }
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      console.log('enter')
      this.submitAddMember();
    }
  };

  submitAddMember = () => {
    const { email } = this.state;
    const { boardId, toggleCardEditor } = this.props;
    if (email === '') {
      return;
    }
    firebase
      .getBoard(boardId)
      .update({
        users: firebase.app.firestore.FieldValue.arrayUnion(firebase.getUser(email)),
      });
    toggleCardEditor();
  };

  handleRequestClose = () => {
    const { isColorPickerOpen } = this.state;
    const { toggleCardEditor } = this.props;
    if (!isColorPickerOpen) {
      toggleCardEditor();
    }
  };

  render() {
    const { isTextareaFocused, email } = this.state;
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
        contentLabel="Add new member to board"
        overlayClassName="modal-underlay"
        className="modal"
        style={isThinDisplay ? mobileStyle : style}
        includeDefaultStyles={false}
        onClick={this.handleRequestClose}
      >
        <div
          className="modal-wrapper"
          style={{
            minHeight: isThinDisplay ? 'none' : boundingRect.height,
            width: isThinDisplay ? '100%' : '350px',
            boxShadow: isTextareaFocused
              ? '0px 0px 3px 2px rgb(0, 180, 255)'
              : null,
          }}
        >
          <input
            autoFocus
            value={email}
            type="email"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            className="add-member-input"
            spellCheck={false}
          />
        </div>
      </Modal>
    );
  }
}

export default AddMemberModal;

import React, { Component } from 'react';
import format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { MdAlarm, MdDoneAll } from 'react-icons/md';
import { FaUserSecret } from 'react-icons/fa';
import firebase from 'firebase';

import CardDocument from '../../documents/card.doc';
import { Avatar } from '../Avatar/Avatar';
import BadgeTags from './BadgeTags';
import './CardBadges.scss';

interface CardBadges {
  card: CardDocument;
  user: any;
  date: Date | string;
  checkboxes: { total: number; checked: number };
}

class CardBadges extends Component<CardBadges, {}> {
  renderDueDate = () => {
    const { date } = this.props;
    if (!date) {
      return null;
    }
    const dueDateFromToday = differenceInCalendarDays(date, new Date());

    let dueDateString;
    if (dueDateFromToday < -1) {
      dueDateString = `${Math.abs(dueDateFromToday)} days ago`;
    } else if (dueDateFromToday === -1) {
      dueDateString = 'Yesterday';
    } else if (dueDateFromToday === 0) {
      dueDateString = 'Today';
    } else if (dueDateFromToday === 1) {
      dueDateString = 'Tomorrow';
    } else {
      dueDateString = format(date, 'D MMM');
    }

    let dueDateColor;
    if (dueDateFromToday < 0) {
      dueDateColor = 'red';
    } else if (dueDateFromToday === 0) {
      dueDateColor = '#d60';
    } else {
      dueDateColor = 'green';
    }

    return (
      <div className='badge' style={{ background: dueDateColor }}>
        <MdAlarm className='badge-icon' />
        &nbsp;
        {dueDateString}
      </div>
    );
  };

  // Render badge showing amoung of checkboxes that are checked
  renderTaskProgress = () => {
    const { total, checked } = this.props.checkboxes;
    if (total === 0) {
      return null;
    }
    return (
      <div
        className='badge'
        style={{ background: checked === total ? 'green' : '#444' }}
      >
        <MdDoneAll className='badge-icon' />
        &nbsp;
        {checked}/{total}
      </div>
    );
  };

  handleTagClick = tag => {
    const { card } = this.props;
    card.update({ tags: firebase.firestore.FieldValue.arrayRemove(tag) });
  };

  render() {
    const { user, card } = this.props;

    return (
      <div className='card-badges'>
        {this.renderDueDate()}
        {this.renderTaskProgress()}
        {user ? (
          <Avatar imgUrl={user.photo} username={user.username} />
        ) : (
          <FaUserSecret className='guest-icon' />
        )}
        <BadgeTags tags={card.data.tags} onTagClick={this.handleTagClick} />
      </div>
    );
  }
}

export default CardBadges;

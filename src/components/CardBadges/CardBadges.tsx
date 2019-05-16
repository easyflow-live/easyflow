import React, { Component } from 'react';
import format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { MdAlarm } from 'react-icons/md';
import { MdDoneAll } from 'react-icons/md';
import { FaUserSecret } from 'react-icons/fa';

import { Avatar } from '../Avatar/Avatar';
import './CardBadges.scss';
import CardDocument from 'src/documents/card.doc';
import Tag from '../Tag/Tag';

interface CardBadges {
  card: CardDocument;
  user: any;
  date: Date | string;
  checkboxes: { total: number; checked: number };
}

class CardBadges extends Component<CardBadges, {}> {
  componentDidMount() {
    console.log(this.props.user);
  }
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
        {card.data.tags && (
          <div
            style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}
          >
            {card.data.tags.map((t, index) => (
              <Tag key={index} title={t} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CardBadges;

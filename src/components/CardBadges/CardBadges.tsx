import React, { Component } from 'react';
import format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { MdAlarm, MdDoneAll } from 'react-icons/md';
import firebase from 'firebase';
import { observer } from 'mobx-react';

import CardDocument from '../../documents/card.doc';
import BadgeTags from './BadgeTags';
import Assignee from '../Card/Assignee';
import './CardBadges.scss';

interface CardBadges {
  card: CardDocument;
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
      dueDateColor = 'bg-red-500';
    } else if (dueDateFromToday === 0) {
      dueDateColor = 'bg-orange-500';
    } else {
      dueDateColor = 'bg-green-500';
    }

    return (
      <div className={`badge ${dueDateColor}`}>
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
        className={`badge ${
          checked === total ? 'bg-green-600' : 'bg-gray-600'
        }`}
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
    const { card } = this.props;

    return (
      <div className='card-badges'>
        <Assignee card={card} className='mr-2' />
        <BadgeTags tags={card.data.tags} onTagClick={this.handleTagClick} />
        {this.renderDueDate()}
        {this.renderTaskProgress()}
      </div>
    );
  }
}

export default observer(CardBadges);

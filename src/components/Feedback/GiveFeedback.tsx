import { useRef, useEffect } from 'react';

import UserDocument from '../../../src/documents/user.doc';
import { Collection } from 'firestorter';

import FeedbackInput from './FeedbackInput';

export const GiveFeedback = ({ user }: { user: UserDocument }) => {
  const feedbackRef = useRef<Collection>(null);

  useEffect(() => {
    if (user) {
      feedbackRef.current = new Collection(`feedbacks`);
    }
  }, [user]);

  const createFeedback = async (props, done) => {
    try {
      await feedbackRef.current.add({
        ...props,
        user: user.ref,
        createdAt: Date.now(),
      });
      done(null);
    } catch (error) {
      done(error);
    }
  };

  return <FeedbackInput onFeedback={createFeedback} />;
};

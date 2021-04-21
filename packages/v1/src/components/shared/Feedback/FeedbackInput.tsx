import { useRef, useState, useEffect } from 'react';

import { usePrevious } from 'hooks/use-previous';
import { useClickOutside } from 'hooks/use-click-outside';
import Button from 'components/shared/Button';

import { EmojiSelector, getEmoji } from './EmojiSelector';

import styles from './style.module.css';

interface FeedbackInputProps {
  placeholder?: string;
  onFeedback?: (
    props: { url: string; note: string; emotion: string },
    done: (error: string) => void
  ) => void;
}

const FeedbackInput = ({ placeholder, onFeedback }: FeedbackInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const clearSuccessTimer = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const [, setEmojiShown] = useState(false);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setError] = useState(null);
  const [focused, setFocused] = useState(false);

  const previousFocused = usePrevious(focused);
  const previousSuccess = usePrevious(success);

  const onEmojiShown = () => setEmojiShown(true);
  const onEmojiHidden = () => setEmojiShown(false);
  const onEmojiSelect = (emo: string) => {
    setEmoji(emo);

    if (emo) {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }
  };

  const onFocus = () => setFocused(true);

  const handleClickOutside = () => setFocused(false);

  const done = error => {
    if (!error) {
      setLoading(false);
      setSuccess(true);
    } else {
      setLoading(false);
      setError(error);
    }
  };

  const onSubmit = () => {
    if (textAreaRef.current && textAreaRef.current.value.trim() === '') {
      setError("Your feedback can't be empty");
      return;
    }

    if (onFeedback) {
      setLoading(true);
      onFeedback(
        {
          url:
            window.location.hostname === 'localhost'
              ? null
              : window.location.toString(),
          note: textAreaRef.current ? textAreaRef.current.value : '',
          emotion: getEmoji(emoji),
        },
        done
      );
    }
  };

  useClickOutside({
    element: mainRef,
    active: focused,
    onClick: handleClickOutside,
  });

  useEffect(() => {
    const onKeyPress = e => {
      if (e.key === 'Escape') {
        handleClickOutside();
      }
    };

    if (focused) {
      window.document.addEventListener('keyup', onKeyPress, false);
    }

    return () => {
      window.document.removeEventListener('keyup', onKeyPress, false);
    };
  }, [focused]);

  useEffect(() => {
    {
      if (success) {
        // forget about input state
        textAreaRef.current.value = '';

        // collapse in 4s
        clearSuccessTimer.current = setTimeout(() => {
          if (!document.hidden) {
            setSuccess(false);
          }
        }, 4000);
      } else {
        if (previousSuccess) {
          clearTimeout(clearSuccessTimer.current);
          clearSuccessTimer.current = null;
        }

        if (previousFocused && focused) {
          handleClickOutside();
        }
      }
    }

    return () => {
      if (clearSuccessTimer.current !== null) {
        clearTimeout(clearSuccessTimer.current);
        clearSuccessTimer.current = null;
      }
    };
  }, [success, focused, previousFocused, previousSuccess]);

  return (
    <main
      ref={mainRef}
      title='Share any feedback about EasyFlow with us.'
      className={`
          ${errorMessage != null ? styles.error : ''}
          ${loading ? styles.loading : ''}
          ${success ? styles.success : ''}
          ${focused ? styles.focused : ''}
          ${styles.main}
        `}
    >
      <div>
        <textarea
          className={styles.textarea}
          ref={textAreaRef}
          disabled={loading === true || errorMessage != null}
          placeholder={placeholder || 'Feedback...'}
          aria-label='Submit Feedback'
          onFocus={onFocus}
        />
        <div className={styles.controls}>
          {errorMessage == null && !success && (
            <>
              <span className={styles.emojis}>
                <EmojiSelector
                  onShow={onEmojiShown}
                  onHide={onEmojiHidden}
                  onSelect={onEmojiSelect}
                  loading={false}
                />
              </span>

              <span className={styles.buttons}>
                <Button size='small' onClick={onSubmit}>
                  Send
                </Button>
              </span>
            </>
          )}
        </div>
      </div>

      {errorMessage != null && (
        <div className={styles.errorMessage}>
          <span>{errorMessage}</span>

          <a
            href='#'
            onClick={e => {
              e.preventDefault();
              setError(null);
            }}
          >
            GO BACK
          </a>
        </div>
      )}

      {success && (
        <div className={styles.successMessage}>
          <p>Your feedback has been received!</p>
          <p>Thank you for your help.</p>
        </div>
      )}
    </main>
  );
};

export default FeedbackInput;

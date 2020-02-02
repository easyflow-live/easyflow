import { useRef, useState, useEffect } from 'react';

import { usePrevious } from '../../hooks/use-previous';
import { useClickOutside } from '../../hooks/use-click-outside';

import { EmojiSelector, getEmoji } from './EmojiSelector';

import './style.css';

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
          ${errorMessage != null ? 'error' : ''}
          ${loading ? 'loading' : ''}
          ${success ? 'success' : ''}
          ${focused ? 'focused' : ''}
          main
        `}
    >
      <div>
        <textarea
          className='textarea'
          ref={textAreaRef}
          disabled={loading === true || errorMessage != null}
          placeholder={placeholder || 'Feedback...'}
          aria-label='Submit Feedback'
          onFocus={onFocus}
        />
        <div className='controls'>
          {errorMessage == null && !success && (
            <>
              <span className='emojis'>
                <EmojiSelector
                  onShow={onEmojiShown}
                  onHide={onEmojiHidden}
                  onSelect={onEmojiSelect}
                  loading={false}
                />
              </span>

              <span className='buttons'>
                <button
                  className='bg-pink-500 hover:bg-pink-600 text-white py-1 px-2 rounded-lg'
                  onClick={onSubmit}
                >
                  Send
                </button>
              </span>
            </>
          )}
        </div>
      </div>

      {errorMessage != null && (
        <div className='error-message'>
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
        <div className='success-message'>
          <p>Your feedback has been received!</p>
          <p>Thank you for your help.</p>
        </div>
      )}
    </main>
  );
};

export default FeedbackInput;

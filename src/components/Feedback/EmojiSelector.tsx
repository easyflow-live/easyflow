import { memo, useState, useEffect } from 'react';
import { usePrevious } from '../../../src/hooks/use-previous';

import './emoji.css';

const EMOJIS = new Map([
  ['🤩', 'f929'],
  ['🙂', 'f600'],
  ['😕', 'f615'],
  ['😭', 'f62d'],
]);

// gets the emoji from the code
let EMOJI_CODES = null;

export function getEmoji(code) {
  if (code === null) return code;

  if (EMOJI_CODES === null) {
    EMOJI_CODES = new Map([...EMOJIS].map(([k, v]) => [v, k]));
  }
  return EMOJI_CODES.get(code);
}

interface EmojiSelectorProps {
  onShow: () => void;
  onHide: () => void;
  onSelect: (current) => void;
  loading: boolean;
}

export const EmojiSelector = (props: EmojiSelectorProps) => {
  const [shown, setShown] = useState<boolean>();
  const [current, setCurrent] = useState(null);
  const [currentSetAt, setCurrentSetAt] = useState(null);

  const previousShown = usePrevious(shown);

  useEffect(() => {
    if (!previousShown && shown) {
      props.onShow();
    }
  }, [previousShown, shown]);

  useEffect(() => {
    if (previousShown && !shown) {
      props.onHide();
    }
  }, [previousShown, shown]);

  useEffect(() => {
    props.onSelect(current);
  }, [current]);

  const onMouseEnter = () => {
    if (!shown && Date.now() - (currentSetAt || 0) > 100) {
      setShown(true);
      return;
    }
    setShown(shown);
  };

  const onMouseLeave = () => {
    if (shown) {
      setShown(false);
    } else {
      setShown(shown);
    }
  };

  const onSelect = item => {
    setCurrent(item);
    setCurrentSetAt(Date.now());
    setShown(false);
  };

  return (
    <main
      className={`geist-emoji-selector ${shown ? 'shown' : ''} ${
        props.loading ? 'loading' : ''
      }`}
    >
      <button
        className={current !== null ? 'active' : ''}
        onMouseEnter={onMouseEnter}
        onTouchStart={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type='button'
        onClick={
          current !== null && shown
            ? () => onSelect(null)
            : shown
            ? onMouseLeave
            : onMouseEnter
        }
      >
        <span className='inner icon'>
          {current === null ? (
            <EmojiIcon width='16px' height='16px' />
          ) : shown ? (
            <X />
          ) : (
            <Emoji code={current} />
          )}
        </span>
      </button>

      {Array.from(EMOJIS.values()).map(emoji => (
        <button
          type='button'
          className='option'
          key={emoji}
          onMouseEnter={onMouseEnter}
          onTouchStart={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => onSelect(emoji)}
        >
          <span className='inner'>
            <Emoji code={emoji} />
          </span>
        </button>
      ))}
    </main>
  );
};

interface EmojiProps {
  code: string;
}

const Emoji = memo(({ code }: EmojiProps) => (
  <img
    decoding='async'
    width={code === 'f600' || code === 'f62d' || code === 'f615' ? 18.5 : 16}
    height={code === 'f600' || code === 'f62d' || code === 'f615' ? 18.5 : 16}
    src={`https://assets.zeit.co/twemoji/1${code}.svg`}
    alt='emoji'
    style={{
      transform:
        code === 'f600' || code === 'f615' ? 'translateY(0.5px)' : 'none',
    }}
  />
));

const X = () => (
  <svg
    width='8px'
    height='8px'
    viewBox='0 0 8 8'
    version='1.1'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <g
      transform='translate(-704.000000, -190.000000) translate(704.000000, 190.000000)'
      stroke='#979797'
      strokeWidth={1}
      fill='none'
      fillRule='evenodd'
      strokeLinecap='square'
    >
      <path d='M.5.5l7 7' />
      <path d='M7.5.5l-7 7' />
    </g>
  </svg>
);

interface EmojiIconProps {
  height: string;
  width: string;
  label?: string;
}

const EmojiIcon = memo(({ height, width, label }: EmojiIconProps) => {
  return (
    <svg width={width} height={height} viewBox='0 0 14 14' aria-label={label}>
      <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
        <path
          d='M3.3 8.1c0-.4.4-.3.7-.4h1l.3-.1h4.3l.7.2c.2 0 .4 0 .5.3v.4c0 1.2-1 2.3-2.4 2.7h-.6l-.2.1a2 2 0 0 1-1 0h-.3c-1.6-.3-2.7-1.3-3-2.6V8m6.4-3.7c.4.1.7.3.8.8v.5c-.1.5-.6.8-1 .8-.6 0-1-.5-1.1-1 0-.5.3-1 .8-1.1h.5m-4.2.9c.1.4-.2 1-.6 1.1-.6.2-1.1 0-1.4-.5V5c0-.5.3-.7.7-.8h.5c.4 0 .7.3.8.8v.1'
          fill='#fff'
          fill-rule='nonzero'
          stroke-width='0'
        />
        <circle stroke='#fff' cx='7' cy='7' r='6.5' />
      </g>
    </svg>
  );
});

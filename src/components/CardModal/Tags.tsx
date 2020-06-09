import BadgeTags from '../CardBadges/BadgeTags';
import { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { MdClose } from 'react-icons/md';

import { useClickOutside } from '../../hooks/use-click-outside';
import AddTagsWithAutocomplete from '../TagList/AddTagsWithAutocomplete';

const CloseButton: React.FC<{
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = props => (
  <button
    className='text-gray-500 hover:text-gray-100 text-sm pt-2'
    onClick={props.onClose}
    title='Close'
  >
    <MdClose />
  </button>
);

const NoTagsButton: React.FC<{
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = props => (
  <button className='text-white text-sm p-2' onClick={props.onClick}>
    No tags
  </button>
);

interface TagsProps {
  tags: string[];
  allTags: string[];
  onChange: (tags: string[]) => void;
  onRemove: (tag: string) => Promise<void>;
}

export const Tags: React.FC<TagsProps> = observer(props => {
  const { tags = [], allTags = [], onChange, onRemove } = props;

  const [showInput, setShowInput] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelection = (newTag: string) => onChange([...tags, newTag]);
  const toggleInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();

    setShowInput(v => !v);
  };

  const selectableTags = allTags.filter(tag => !tags.includes(tag));

  useClickOutside({
    element: containerRef,
    active: showInput,
    onClick: toggleInput,
  });

  const isEmpty = tags.length === 0;

  return (
    <div
      ref={containerRef}
      className={cn('-ml-2 -my-2 p-2 rounded transition-all duration-300', {
        'mt-2 bg-gray-800': showInput,
      })}
    >
      <div className='flex'>
        <div
          className={cn(
            'flex justify-between items-start hover:bg-gray-800 rounded transition-all duration-300 -ml-2',
            { 'w-full': showInput }
          )}
        >
          {!isEmpty ? (
            <button
              className={cn('p-2', { 'cursor-default': showInput })}
              onClick={!showInput ? toggleInput : null}
            >
              <BadgeTags
                tags={tags}
                onTagClick={onRemove}
                removable={showInput}
              />
            </button>
          ) : !showInput ? (
            <NoTagsButton onClick={toggleInput} />
          ) : (
            <span className='text-white text-sm p-2'>Type a tag</span>
          )}

          {showInput && <CloseButton onClose={toggleInput} />}
        </div>
      </div>

      <div
        className={cn('mt-2 transition duration-300 opacity-0', {
          'opacity-100': showInput,
        })}
      >
        {showInput && (
          <AddTagsWithAutocomplete
            options={selectableTags}
            onSelect={handleSelection}
          />
        )}
      </div>
    </div>
  );
});

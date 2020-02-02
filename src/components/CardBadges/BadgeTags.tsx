import { observer } from 'mobx-react-lite';

import Tag from '../Tag/Tag';

interface BadgeTags {
  tags: string[];
  onTagClick?(tag: string): void;
}

const BadgeTags = observer(
  ({ tags, onTagClick }: BadgeTags) =>
    tags && (
      <div className='badge-tags flex items-center'>
        {tags.map((t, index) => (
          <Tag
            key={index}
            title={t}
            onClick={onTagClick}
            className='mr-1 mb-1'
          />
        ))}
      </div>
    )
);

export default BadgeTags;

import { observer } from 'mobx-react-lite';

import Tag from '../shared/Tag';

interface BadgeTags {
  tags: string[];
  removable: boolean;
  onTagClick?(tag: string): void;
}

const BadgeTags = observer(
  ({ tags, removable, onTagClick }: BadgeTags) =>
    tags && (
      <div className='flex items-center flex-wrap'>
        {tags.map((t, index) => (
          <Tag
            removable={removable}
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

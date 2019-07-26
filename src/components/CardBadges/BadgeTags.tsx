import { observer } from 'mobx-react-lite';

import Tag from '../Tag/Tag';
import './BadgeTags.css';

interface BadgeTags {
  tags: string[];
  onTagClick?(tag: string): void;
}

const style = {
  display: 'flex',
  alignItems: 'center',
};

const BadgeTags = observer(
  ({ tags, onTagClick }: BadgeTags) =>
    tags && (
      <div className='badge-tags' style={style}>
        {tags.map((t, index) => (
          <Tag key={index} title={t} onClick={onTagClick} />
        ))}
      </div>
    )
);

export default BadgeTags;

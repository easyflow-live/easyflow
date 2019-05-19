import { observer } from 'mobx-react-lite';

import Tag from '../Tag/Tag';

interface BadgeTags {
  tags: string[];
  onTagClick?(tag: string): void;
}

const style = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '6px',
};

const BadgeTags = observer(
  ({ tags, onTagClick }: BadgeTags) =>
    tags && (
      <div style={style}>
        {tags.map((t, index) => (
          <Tag key={index} title={t} onClick={onTagClick} />
        ))}
      </div>
    )
);

export default BadgeTags;

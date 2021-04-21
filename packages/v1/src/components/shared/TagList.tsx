import Tag from 'components/shared/Tag';
import { observer } from 'mobx-react-lite';

interface TagListProps {
  tags: string[];
  onRemoveTag(tag: string): void;
  className?: string;
  removable?: boolean;
}

const TagList = ({ tags, onRemoveTag, className, removable }: TagListProps) => (
  <ul className={`text-white flex flex-wrap ${className}`}>
    {tags &&
      tags.map((tag: string, index: number) => (
        <li key={index} className='mr-3 mb-3'>
          <Tag title={tag} removable={removable} onClick={onRemoveTag} />
        </li>
      ))}
  </ul>
);

export default observer(TagList);

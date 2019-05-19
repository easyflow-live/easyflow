import Tag from './Tag';
import './TagList.scss';

interface TagListProps {
  tags: string[];
  onRemoveTag(tag: string): void;
}

const TagList = ({ tags, onRemoveTag }: TagListProps) =>
  tags && (
    <ul className='tags'>
      {tags.map((tag: string, index: number) => (
        <div key={index} className='tags__container'>
          <Tag title={tag} />
          <button onClick={() => onRemoveTag(tag)}>Remove</button>
        </div>
      ))}
    </ul>
  );

export default TagList;

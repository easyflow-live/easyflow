import Tag from './Tag';

interface TagListProps {
  tags: string[];
  onRemoveTag(tag: string): void;
}

const TagList = ({ tags, onRemoveTag }: TagListProps) =>
  tags && (
    <ul className='mt-2 text-white bg-gray-800 p-6 shadow-lg rounded-sm min-w-full'>
      {tags.map((tag: string, index: number) => (
        <div
          key={index}
          className='flex justify-between items-center mb-3 px-25 py-7'
        >
          <Tag title={tag} />
          <button
            className='text-red-500 hover:text-red-600'
            onClick={() => onRemoveTag(tag)}
          >
            Remove
          </button>
        </div>
      ))}
    </ul>
  );

export default TagList;

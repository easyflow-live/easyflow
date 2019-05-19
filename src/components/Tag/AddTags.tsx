import { useState } from 'react';
import { Document } from 'firestorter';
import firebase from 'firebase';

import TagsInput from 'react-tagsinput';
import './AddTags.scss';

interface AddTagsProps {
  document: Document;
}

const AddTags = ({ document }: AddTagsProps) => {
  const [tags, setTags] = useState<string[]>([]);

  const splitTags = tagsSet => tagsSet.join(',').split(',');

  const handleChange = newTags => {
    setTags(newTags);

    document.update({
      tags: firebase.firestore.FieldValue.arrayUnion(...splitTags(newTags)),
    });
  };

  return (
    <TagsInput value={tags} onChange={handleChange} renderTag={() => null} />
  );
};

export default AddTags;

import { useState } from 'react';
import { Document } from 'firestorter';
import * as firebase from 'firebase/app';
import { observer } from 'mobx-react-lite';
import 'firebase/firestore';

import TagsInput from 'react-tagsinput';

interface AddTagsProps {
  document: Document;
}

const AddTags = ({ document }: AddTagsProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const splitTags = tagsSet => tagsSet.join(',').split(',');

  const handleChange = async newTags => {
    setTags(newTags);
    setIsSubmit(true);
    await document.update({
      tags: firebase.firestore.FieldValue.arrayUnion(...splitTags(newTags)),
    });
    setIsSubmit(false);
  };

  return (
    <TagsInput
      value={tags}
      onChange={handleChange}
      renderTag={() => null}
      disabled={isSubmit}
    />
  );
};

export default observer(AddTags);

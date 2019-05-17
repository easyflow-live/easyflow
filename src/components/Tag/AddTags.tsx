import { Component } from 'react';
import { Document } from 'firestorter';
import firebase from 'firebase';

import TagsInput from 'react-tagsinput';
import './AddTags.scss';

interface AddTagsProps {
  document: Document;
}

interface State {
  tags: string[];
}

export default class AddTags extends Component<AddTagsProps, State> {
  constructor(props) {
    super(props);
    this.state = { tags: [] };
  }

  splitTags = tags => {
    return tags.join(',').split(',');
  };

  handleChange = tags => {
    this.setState({ tags });

    const tagsSet = this.splitTags(tags).map(tag => ({ title: tag }));

    this.props.document.update({
      tags: firebase.firestore.FieldValue.arrayUnion(...tagsSet),
    });
  };

  render() {
    return (
      <TagsInput
        value={this.state.tags}
        onChange={this.handleChange}
        renderTag={() => null}
      />
    );
  }
}

import { Component } from 'react';
import { Document } from 'firestorter';
import firebase from 'firebase';

import TagsInput from 'react-tagsinput';
import './AddTags.scss';

interface AddTagsProps {
  attach: Document;
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

    this.props.attach.update({
      tags: firebase.firestore.FieldValue.arrayUnion(...this.splitTags(tags)),
    });

    firebase
      .firestore()
      .collection('tags')
      .doc('NjB6qhspzusxn0hCWxCF')
      .update({
        suggestions: firebase.firestore.FieldValue.arrayUnion(
          ...this.splitTags(tags)
        ),
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

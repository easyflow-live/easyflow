import React from 'react';
import firebase from 'firebase';
import Autosuggest from 'react-autosuggest';
import { observer } from 'mobx-react';
import { Document } from 'firestorter';

import './AddTagsWithAutocomplete.scss';

interface AddTagsWithAutocompleteProps {
  attach: Document;
}

interface State {
  suggestions: string[];
  cachedSuggestions: string[];
  tags: [];
  value: string;
}

const getSuggestions = (tags, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : tags.filter(
        tag => tag.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => suggestion;

class AddTagsWithAutocomplete extends React.Component<
  AddTagsWithAutocompleteProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      cachedSuggestions: [],
      suggestions: [],
      tags: [],
      value: '',
    };
  }

  async componentDidMount() {
    const tags = (await firebase
      .firestore()
      .collection('tags')
      .doc('NjB6qhspzusxn0hCWxCF')
      .get()).data();

    this.setState({
      cachedSuggestions: tags.suggestions,
      tags: this.props.attach.data.tags || [],
    });
  }

  onChange = (event, { newValue, method }) => {
    if (method === 'enter') {
      event.preventDefault();
      this.handleSelection(newValue);
    }
    this.setState({ value: newValue });
    console.log(method);
  };

  handleSelection = value => {
    this.props.attach.update({
      tags: firebase.firestore.FieldValue.arrayUnion(value),
    });

    this.setState({ value: '' });
  };

  onSuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this.state.cachedSuggestions, value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { suggestions } = this.state;
    const inputProps = {
      placeholder: 'Select a tag',
      value: this.state.value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={(e, { suggestion }) => {
          this.handleSelection(suggestion);
        }}
      />
    );
  }
}

export default observer(AddTagsWithAutocomplete);

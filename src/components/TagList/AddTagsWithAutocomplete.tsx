import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Autosuggest from 'react-autosuggest';
import { observer } from 'mobx-react';

import CardDocument from '../../documents/card.doc';
import './AddTagsWithAutocomplete.scss';

interface AddTagsWithAutocompleteProps {
  card: CardDocument;
}

interface State {
  suggestions: string[];
  cachedSuggestions: string[];
  tags: string[];
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
    const boardRef = this.props.card.ref.parent.parent.parent.parent;
    const board = (await boardRef.get()).data();

    this.setState({
      cachedSuggestions: board.tags || [],
      tags: this.props.card.data.tags || [],
    });
  }

  onChange = (event, { newValue, method }) => {
    if (method === 'enter') {
      event.preventDefault();
      this.handleSelection(newValue);
    }
    this.setState({ value: newValue });
  };

  handleSelection = value => {
    this.props.card.update({
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
        onSuggestionSelected={(_e, { suggestion }) => {
          this.handleSelection(suggestion);
        }}
      />
    );
  }
}

export default observer(AddTagsWithAutocomplete);

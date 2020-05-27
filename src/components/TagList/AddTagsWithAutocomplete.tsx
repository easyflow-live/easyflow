import { observer } from 'mobx-react-lite';
import Autosuggest from 'react-autosuggest';
import { useState, useCallback } from 'react';

import './AddTagsWithAutocomplete.scss';

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

interface AddTagsWithAutocompleteProps {
  options: string[];
  onSelect: (tag: string) => void;
}

const AddTagsWithAutocomplete = ({
  options = [],
  onSelect,
}: AddTagsWithAutocompleteProps) => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onChange = (_, { newValue }) => setValue(newValue);

  const getSuggestions = useCallback(
    (value: string) => {
      const escapedValue = escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return [];
      }

      const regex = new RegExp(`.*${escapedValue}.*`, 'i');
      const suggestions = options.filter(tag => regex.test(tag));

      return suggestions;
    },
    [options]
  );

  const getSuggestionValue = useCallback(suggestion => suggestion, []);
  const renderSuggestion = useCallback(suggestion => suggestion, []);

  const onSuggestionsFetchRequested = ({ value }) =>
    setSuggestions(getSuggestions(value));

  const onSuggestionsClearRequested = () => setSuggestions([]);
  const onSuggestionSelected = (_, { suggestion }) => onSelect(suggestion);

  const inputProps = {
    placeholder: 'Type',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={onSuggestionSelected}
      inputProps={inputProps}
    />
  );
};
export default observer(AddTagsWithAutocomplete);

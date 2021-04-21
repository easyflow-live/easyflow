import React from 'react';
import { observer } from 'mobx-react-lite';
import Autosuggest from 'react-autosuggest';
import { useState, useCallback } from 'react';
import { StyledAutosuggestInput } from './styles';

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export interface AutosuggestInputProps {
  suggestions: string[];
  onSelect: (tag: string) => void;
}

const AutosuggestInput = (props: AutosuggestInputProps) => {
  const { suggestions = [], onSelect } = props;

  const [value, setValue] = useState<string>('');
  const [_suggestions, setSuggestions] = useState<string[]>([]);

  const onChange = (_, { newValue }) => setValue(newValue);

  const getSuggestions = useCallback(
    (value: string) => {
      const escapedValue = escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return [];
      }

      const regex = new RegExp(`.*${escapedValue}.*`, 'i');

      return suggestions.filter(tag => regex.test(tag));
    },
    [suggestions]
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
    <StyledAutosuggestInput>
      <Autosuggest
        suggestions={_suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
    </StyledAutosuggestInput>
  );
};
export default observer(AutosuggestInput);

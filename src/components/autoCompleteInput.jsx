import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const AutocompleteInput = ({ suggestions }) => {
  const [value, setValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    return suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setFilteredSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setFilteredSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    setValue(suggestionValue);
  };

  const renderSuggestion = suggestion => (
    <div>{suggestion}</div>
  );

  const inputProps = {
    placeholder: 'Entrez une valeur..',
    value,
    onChange: (_, { newValue }) => setValue(newValue)
  };

  return (
    <Autosuggest
      suggestions={filteredSuggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={value => value}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutocompleteInput;

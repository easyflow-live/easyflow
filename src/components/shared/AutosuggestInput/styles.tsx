import styled from 'styled-components';

export const StyledAutosuggestInput = styled.div`
  .react-autosuggest__container {
    position: relative;
    margin: 0 3px;
  }

  .react-autosuggest__input {
    width: 100%;
    padding: 10px;
    font-family: inherit;
    font-size: 16px;
    border: 0;
    border-radius: 3px;
    background-color: #718096;
    color: #fff;
  }
  .react-autosuggest__input::placeholder {
    color: #1a202c;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    color: #fff;
    position: absolute;
    top: 100%;
    width: 100%;
    margin-left: 0px;
    border: 0;
    background-color: #718096;
    font-family: inherit;
    font-size: 16px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    max-height: 148px;
    overflow-y: auto;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0px 0px 8px 0px;
    list-style-type: none;
    margin-top: 8px;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px;
  }

  .react-autosuggest__suggestion--highlighted {
    color: #fff;
    background-color: #2d3748;
  }
`;

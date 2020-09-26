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
    font-size: 1rem;
    line-height: 1.25;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.25rem;
    transition: all 0.2s;
    outline: none;
    align-items: center;
    position: relative;
    display: flex;

    height: 2.5rem;
    background-color: #718096;
    color: #fff;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .react-autosuggest__input::placeholder {
    color: #1a202c;
  }
  .react-autosuggest__input:focus {
    z-index: 1;
    border-color: #ed64a6;
    box-shadow: 0 0px 1px 0px #ed64a6;
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

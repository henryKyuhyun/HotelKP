// client/src/components/hotel/search/Searchbar.jsx
import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { InputBox, SearchBoxDiv } from './SearchbarStyle';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const debouncedSave = useCallback(
    _.debounce(nextValue => onSearch(nextValue), 1000),
    [onSearch]
  );


  return (
    <SearchBoxDiv>
      <InputBox type="text" placeholder='Search...' onChange={(event) => {
        setInputValue(event.target.value);
        debouncedSave(event.target.value);
      }} />
    </SearchBoxDiv>  
  )
}
import React, { useCallback, useState } from 'react';
import { GrSearch } from "react-icons/gr";
import _ from 'lodash';
import { SearchBarContainer, SearchIcon, SearchInput } from './SearchBarStyle';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  
  const debouncedSave = useCallback(
    _.debounce(nextValue => onSearch(nextValue), 1000),
    [onSearch]
  );
  
  return (
    <SearchBarContainer>
      <SearchInput  type="text" placeholder='Search...' onChange={(event) => {
        setInputValue(event.target.value);
        debouncedSave(event.target.value);
      }} />
          <SearchIcon/>
    </SearchBarContainer>  
  )
}
import React, { useState } from 'react';
import '../style/SearchBar.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(e.target.value);
    onSearch(newQuery);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
          <span className="search-icon">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="search-input"
        />
      </div>
      <button onClick={handleSearchClick} className="search-button">
        GO
      </button>
    </div>
  );
};

export default SearchBar;

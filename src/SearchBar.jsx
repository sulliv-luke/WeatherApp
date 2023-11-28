import React, { useState } from 'react'
import { TextInput } from 'carbon-components-react'
import './App.css'
import './mode.css'
import './search.css'

const SearchBar = ({ onSearch, isDarkMode  }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const cities = ['Dublin', 'Milan', 'London', 'Krakow', 'Zurich', 'Rome', 'Vienna', 'Paris']; // Your list of items
    
    // Filter logic
    const filteredItems = cities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
    );  

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
          onSearch(searchTerm);
      }
    };

    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
  };

  
    return (
      <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'} Search-component-wrapper`}>
        <div className="dropdown">
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          {searchTerm && (
            filteredItems.length > 0 ? (
            <ul className="list">
              {filteredItems.slice(0,5).map((item, index) => (
                <li className="list-item" key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <div></div>
          ))}
        </div>
      </div>
  );
}

export default SearchBar
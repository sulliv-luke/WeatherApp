import React, { useState } from 'react';
import './search.css'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const items = ['Dublin', 'Milan', 'London', 'Krakow', 'Zurich', 'Rome', 'Vienna', 'Paris']; // Your list of items

  // Filter logic
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Search-component-wrapper">
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        filteredItems.length > 0 ? (
        <ul className="list">
          {filteredItems.map((item, index) => (
            <li className="list-item" key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <div>Nothing found</div>
      )
    )}
    </div>
  );
}

export default SearchComponent;

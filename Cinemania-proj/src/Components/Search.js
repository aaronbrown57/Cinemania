import React, { useState } from 'react';

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Perform search based on the entered search term
    // For demo purposes, I'll just filter an array of sample data
    const filteredResults = sampleData.filter(item =>
      item.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div>
      <h1>Search Results</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

// Sample data for demonstration
const sampleData = [
  'Apple',
  'Banana',
  'Orange',
  'Pineapple',
  'Grapes',
  'Strawberry',
  'Blueberry',
  'Watermelon',
];

export default SearchResultsPage;

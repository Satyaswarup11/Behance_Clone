import React, { useState, useEffect, useRef } from 'react';
import { IoSearch } from "react-icons/io5";
import '../styles/Searchbar.css';
import { AllImagedata } from '../Data/Data'; 

function Searchbar({ screenWidth, searchTerm, setSearchTerm }) {
  const [activeButton, setActiveButton] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // For suggestions
    const filteredSuggestions = AllImagedata.filter((item) =>
      item.feSearch.toLowerCase().includes(newSearchTerm.toLowerCase())
    ).map((item) => item.feSearch);
    setSuggestions([...new Set(filteredSuggestions)]); 
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    setShowSuggestions(false); 
  };

  // Added event listener to clos suggestions when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="search-container">
      <div className="search-bar"> 
        <div className='icon'><IoSearch /></div>   
        <input
          type="text"
          placeholder="Search the creative world at work"
          value={searchTerm}
          onChange={handleChange}
          ref={inputRef}
        />

        {showSuggestions && suggestions.length > 0 && suggestions.length< 5 && (
          <ul className="suggestions" > 
            {suggestions.map((suggestion) => (
              <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {screenWidth > 1080 ? ( 
      <div className="button-group">
        <button className={`button ${activeButton === 'projects' ? 'active' : ''}`} onClick={() => handleButtonClick('projects')}>Projects</button>
        <button className={`button ${activeButton === 'images' ? 'active' : ''}`} onClick={() => handleButtonClick('images')}>Images</button>
        <button className={`button ${activeButton === 'prototypes' ? 'active' : ''}`} onClick={() => handleButtonClick('prototypes')}>Prototypes</button>
        <button className={`button ${activeButton === 'people' ? 'active' : ''}`} onClick={() => handleButtonClick('people')}>People</button>
        <button className={`button ${activeButton === 'moodboards' ? 'active' : ''}`} onClick={() => handleButtonClick('moodboards')}>Moodboards</button>
      </div>
      ) : ( 
        <select className="mobile-search-dropdown"> 
          <option value="projects">Projects</option>
          <option value="images">Images</option>
          <option value="prototypes">Prototypes</option>
          <option value="people">People</option>
          <option value="moodboards">Moodboards</option> 
        </select>
      )}
    </div>
  )
}

export default Searchbar;

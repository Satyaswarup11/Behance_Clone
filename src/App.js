import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import BehanceItem from './components/BehanceItem';
import Searchbar from './components/Searchbar';
import Filter from './components/Filter';
import { AllImagedata } from './Data/Data';

const App = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(AllImagedata);

  // Adding even listener for window width
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // The grid is made responsive with different screenwidths
  const columns =
    screenWidth < 600 ? 1 : screenWidth < 880 ? 2 : screenWidth < 1080 ? 3 : screenWidth < 1400 ? 4 : 5;

  // For sorting according searchterm or category  
  useEffect(() => {
    let filtered = AllImagedata;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.feSearch.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((item) => item.feCategory === selectedCategory);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="App">
      <div className="sticky-container">
      <Header screenWidth={screenWidth} />
      <Searchbar
        screenWidth={screenWidth}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {screenWidth >= 600 && (
        <Filter
          screenWidth={screenWidth}
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
      )}
      </div>
      <div className="items-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {filteredItems.map((item, index) => (
          <BehanceItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default App;
import React, { useRef, useEffect } from 'react'; 
import { MdArrowDropDown, MdAddAPhoto, MdExposure } from 'react-icons/md';
import { FaTools } from 'react-icons/fa';
import { IoIosColorPalette } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { SiLens } from "react-icons/si";
import { FaRegImage } from "react-icons/fa";
import { GiFocusedLightning, GiCube } from "react-icons/gi";
import '../styles/Filter.css';

function Filter({ screenWidth, selectedCategory, setSelectedCategory  }) {
  const filterContainerRef = useRef(null);

  useEffect(() => {
    const filterContainer = filterContainerRef.current;
    if (screenWidth >= 1080) {
      filterContainer.classList.add('horizontal-scroll');
    } else {
      filterContainer.classList.remove('horizontal-scroll');
    }
  }, [screenWidth]);

  const creativeFields = [ 
    { icon: <MdAddAPhoto />, name: 'Photography' },
    { icon: <FaTools />, name: 'Tools' },
    { icon: <IoIosColorPalette />, name: 'Colors' },
    { icon: <IoCamera />, name: 'Camera' },
    // { icon: <SiLens />, name: 'Lens' },
    // { icon: <MdExposure />, name: 'Exposure' },
    { icon: <FaRegImage />, name: 'Types' },
    // { icon: <GiCube />, name: 'NFTs' },
    { icon: <GiFocusedLightning />, name: 'Lengths' },
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); 
  };

  return (
    <div className="filter-container" ref={filterContainerRef}>
       
      <div className="filter-wrapper">
        {screenWidth >= 1080 && ( // Only show creativeFields if screenWidth is greater than or equal to 1080
          creativeFields.map(({ icon, name }, index) => (
            <div key={index} className="filter-item">
              <div className="icon">{icon}</div>
              <div className="name">{name}</div>
              <div className="arrow"><MdArrowDropDown /></div>
            </div>
          ))
        )}
    

      <div className="sort-container">
        <div className="sort-label">Sort</div>
        <select
          className="sort-select"
          value={selectedCategory} 
          onChange={handleCategoryChange} 
        >
          <option value="All">All</option> 
          {[
            'Recommended',
            'Curated',
            'Most Appreciated',
            'Most Viewed',
            'Most Discussed',
            'Most Recent',
          ].map((option, index) => (
            <option key={index} value={option}> 
              {option}
            </option>
          ))}
        </select>
      </div>
      </div>
    </div>
  );
}

export default Filter;
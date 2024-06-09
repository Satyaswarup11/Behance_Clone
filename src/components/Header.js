import React, { useState } from 'react';
import '../styles//Header.css';
import { CgMenuLeft } from 'react-icons/cg';
import { AiOutlineClose } from "react-icons/ai";

const Header = ({ screenWidth }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <div className="left-content">
      {screenWidth <= 1080 && ( 
          <div className="menu-icon" onClick={toggleMenu}>
            {showMenu ? <AiOutlineClose /> : <CgMenuLeft />} 
          </div>
        )}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsR-OsxScVFxpl0JRp8z2XraQ11-4saV78-tehs1ItbQ&s" alt="Behance" className="logo" />
        {screenWidth > 1080 && ( 
          <nav>
            <a href="/">Discover</a>
            <a href="/">Livestreams</a>
            <a href="/">Jobs</a>
          </nav>
        )}
        
      </div>
      {screenWidth > 1080 && ( 
        <div className="right-content">
          <button className="login">Log In</button>
          <button className="signup">Sign Up</button>
          <img src="https://pic.onlinewebfonts.com/thumbnails/icons_521761.svg" alt="Adobe" className="adobe-logo" />
          <span className="adobe-text">Adobe</span> 
        </div>
      )}

      {screenWidth <= 1080 && showMenu && (
        <div className="mobile-menu">
          <a href="/">Discover</a>
          <a href="/">Livestreams</a>
          <a href="/">Jobs</a>
          <button className="login">Log In</button>
          <button className="signup">Sign Up</button>
        </div>
      )}
    </header>
  );
};

export default Header;
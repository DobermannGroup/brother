import React, { useState, useEffect } from 'react';

function Nav({ onNavClick }) {

  const [isActive, setIsActive] = useState(false);

  const handleToggle = (e) => {
    setIsActive(!isActive);
    e.stopPropagation(); // Prevent click event from reaching the document
  };

  const handleClickOutside = () => {
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isActive]);

  const handleNavItemClick = (label) => {
    if (onNavClick) {
      onNavClick(label);
    }
    setIsActive(false); // Close the nav after selection
  };

  return (
    <>
      <div
        className={`toggleDirection ${isActive ? 'tdActive' : ''}`}
        onClick={handleToggle}
      >
        <div className="compassModel">
          <i className="fa-duotone fa-compass"></i>
          <div className={`navBox ${isActive ? 'open' : 'hidden'}`}>
            <ul>
              {['Today', 'Weekly', 'Monthly', 'Annually', 'Bucket List', 'Mission logs'].map(label => (
                <li key={label} onClick={() => handleNavItemClick(label)}>{label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isActive && <div className="overlay" onClick={handleClickOutside}></div>}
    </>
  );
}

export default Nav;

import React, { useState, useEffect } from 'react';

function Nav() {
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

  return (
    <>
      <div
        className={`toggleDirection ${isActive ? 'tdActive' : ''}`}
        onClick={handleToggle}
      >
        <div className="compassModel">
          <i className="fa-duotone fa-compass"></i>
          <div className={`navBox ${isActive ? 'open' : 'hidden'}`}>
            <h1>Today</h1>
            <h1>Weekly</h1>
            <h1>Monthly</h1>
            <h1>Anually</h1>
            <h1>Bucket List</h1>
            <h1>Notepad</h1>
            <h1>Mission Logs</h1>
          </div>
        </div>
      </div>
      {isActive && <div className="overlay" onClick={handleClickOutside}></div>}
    </>
  );
}

export default Nav;
import React, { useState, useEffect } from 'react';

const Options = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [dayStart, setDayStart] = useState(localStorage.getItem('dayStart') || '09:00');
  const [dayFinish, setDayFinish] = useState(localStorage.getItem('dayFinish') || '17:00');

  const handleToggleOverlay = () => {
    setOverlayOpen(!overlayOpen);
  };

  useEffect(() => {
    localStorage.setItem('dayStart', dayStart);
    localStorage.setItem('dayFinish', dayFinish);
  }, [dayStart, dayFinish]);

  return (
    <div>
      <button className="settingsToggle" onClick={handleToggleOverlay} style={{ cursor: 'pointer' }}>
        <i className="fa-regular fa-head-side-gear"></i>
      </button>

      {overlayOpen && (
        <div className="configHub">
          <h1>Configure your hub</h1>
          <div className="time-input">
            <label>
                Day Start
                <input 
                type="time" 
                value={dayStart}
                onChange={(e) => setDayStart(e.target.value)} 
                />
            </label>
            </div>
            <div className="time-input">
            <label>
                Day Finish
                <input 
                type="time" 
                value={dayFinish}
                onChange={(e) => setDayFinish(e.target.value)} 
                />
            </label>
            </div>

          <button onClick={handleToggleOverlay} style={{ marginTop: '20px' }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Options;

import React from 'react';

const StarTracker = ({ stars }) => {
  return (
    <div className="star-tracker">
      <span>Stars Earned: </span>{Array(stars).fill().map((_, i) => <i key={i} className="fa fa-star"></i>)}
    </div>
  );
};

export default StarTracker;

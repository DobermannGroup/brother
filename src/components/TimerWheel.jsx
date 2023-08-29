import React, { useState, useEffect } from 'react';
import moment from 'moment';

const TimerWheel = ({ timeEstimate, startTime }) => {
  const [percent, setPercent] = useState(0);
  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedTime = moment().diff(moment(startTime), 'seconds');
      setPercent(Math.min((elapsedTime / (timeEstimate * 60)) * 100, 100));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeEstimate, startTime]);

  const getColor = percent => percent < 50 ? 'green' : percent < 75 ? 'amber' : 'red';
  
  return (
    <svg className="timerWheel" height={radius * 2} width={radius * 2}>
      <circle
        stroke={getColor(percent)}
        fill="transparent"
        strokeWidth={2}
        strokeDasharray={circumference}
        style={{ strokeDashoffset: circumference - (percent / 100) * circumference }}
        r={radius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default TimerWheel;

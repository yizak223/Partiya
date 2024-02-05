import React, { useState, useEffect } from 'react';
import "./Timer.css";

function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      const totalSeconds = Math.floor(difference / 1000);

      timeLeft = {
        days: Math.floor(totalSeconds / (3600 * 24)),
        hours: Math.floor((totalSeconds % (3600 * 24)) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: Math.floor(totalSeconds % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const timeValues = Object.values(timeLeft);
  const timeLabels = ['D', 'H', 'M', 'S'];

  return (
    <div className='timeCont'>
      <div className='timeDisp'>
        {timeValues.map((value, index) => (
          <React.Fragment key={index}>
            <div>{addLeadingZero(value)}</div>
            {index !== timeValues.length - 1 && <div>:</div>}
          </React.Fragment>
        ))}
      </div>
      <div className='timeDisp symbols'>
        {timeLabels.map((label, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <CountdownTimer targetDate="2024-03-01" />
    </div>
  );
}

export default App;

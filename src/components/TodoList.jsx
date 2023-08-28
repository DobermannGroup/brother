import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Nav from './Nav';
import LevelTracker from './LevelTracker';
import HeaderHero from './HeaderHero';
import Confetti from 'react-confetti';

const TimerWheel = ({ timeEstimate, startTime }) => {
  const [percent, setPercent] = useState(0);
  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedTime = moment().diff(moment(startTime), 'seconds');
      const totalSeconds = timeEstimate * 60;
      const newPercent = (elapsedTime / totalSeconds) * 100;
      setPercent(newPercent >= 100 ? 100 : newPercent);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeEstimate, startTime]);

  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const color = percent < 50 ? 'green' : percent < 75 ? 'amber' : 'red';

  return (
    <svg className="timerWheel" height={radius * 2} width={radius * 2}>
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={2}
        strokeDasharray={circumference}
        style={{ strokeDashoffset }}
        r={radius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const TodoList = () => {
  const [task, setTask] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [urgency, setUrgency] = useState('');
  const [expireToggle, setExpireToggle] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    const allTasks = savedTasks ? JSON.parse(savedTasks) : [];
    return allTasks.filter(task => !task.completed);
  });
  const [stars, setStars] = useState(() => {
    const savedStars = localStorage.getItem('stars');
    return savedStars ? parseInt(savedStars, 10) : 0;
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const calculateStars = (task) => {
    const elapsedTime = moment().diff(moment(task.timestamp), 'seconds');
    const totalSeconds = task.timeEstimate * 60;
    const completionRatio = elapsedTime / totalSeconds;

    let urgencyBonus = 0;
    if (task.urgency === 'red') {
      urgencyBonus = 100;
    } else if (task.urgency === 'amber') {
      urgencyBonus = 60;
    } else if (task.urgency === 'green') {
      urgencyBonus = 30;
    }

    let multiplier = 1;
    if (completionRatio <= 0.5) {
      multiplier = 300;
    } else if (completionRatio < 1) {
      multiplier = 300 - (completionRatio * 300);
    }

    return multiplier + urgencyBonus;
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('stars', stars);
  }, [tasks, stars]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.expire || new Date(task.expire) > new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (task === 'reset_stars') {
      setStars(0);
      setTask('');
      return;
    }

    if (task) {
      const newTask = {
        text: task,
        completed: false,
        timestamp: new Date(),
        timeEstimate,
        urgency,
        expire: expireToggle ? new Date(moment().add(timeEstimate, 'minutes')) : null,
      };
      setTasks([newTask, ...tasks]);
      setTask('');
      setTimeEstimate('');
      setUrgency('');
      setExpireToggle(false);
    }
  };

  const toggleTask = (index) => {
    setShowConfetti(true);
  
    const newTasks = [...tasks];
    newTasks[index].completed = true;
  
    const starsIncrement = calculateStars(newTasks[index]);
    setStars(prevStars => prevStars + starsIncrement);
  
    // Remove completed task from the newTasks array
    newTasks.splice(index, 1);
  
    // Update state
    setTasks(newTasks);
  
    // Save to localStorage excluding completed task
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
  };
  

  return (
    <div className="container todoApp" style={{ maxWidth: '580px', margin: '0 auto !important', width: '100%' }}>
      {showConfetti && <Confetti />}
      <LevelTracker experience={stars} />
      <HeaderHero />>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="What's the mission?" value={task} onChange={(e) => setTask(e.target.value)} style={{ width: '100%' }} />
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className="form-control"
          placeholder="How long will it take?"
          value={timeEstimate}
          onChange={(e) => setTimeEstimate(e.target.value)}
          style={{ width: '100%' }}
        />
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className="urgency-dropdown"
        >
          <option value="" disabled hidden>Choose urgency</option>
          <option value="green">Green</option>
          <option value="amber">Amber</option>
          <option value="red">Red</option>
        </select>
        <div className="form-check form-check-inline">
  <input
    type="checkbox"
    className="form-check-input"
    id="expireToggle"
    checked={expireToggle}
    onChange={(e) => setExpireToggle(e.target.checked)}
  />
  <div className="form-check-label" htmlFor="expireToggle">Race?</div>
</div>

        <div className="input-group-append w-100 mainCta">
          <button className="btn btn-primary w-100" onClick={addTask}><i className="fa-solid fa-plus"></i> Add mission</button>
        </div>
        </div>
      <ul className="list-group task-list">
        {tasks.map((task, index) => (
          <li key={index} onClick={() => toggleTask(index)} className={`task-${task.urgency}`}>
            <i className="fa-duotone fa-o"></i> {task.text}
            <div className="timeTaken">Time Estimate: {task.timeEstimate} mins</div>
            <div className="timeAdded">Added {moment(task.timestamp).fromNow()}</div>
            {task.expire && <TimerWheel timeEstimate={task.timeEstimate} startTime={task.timestamp} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
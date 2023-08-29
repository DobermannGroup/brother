import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Confetti from 'react-confetti';
import TimerWheel from './TimerWheel';
import TaskInputForm from './TaskInputForm';
import TaskItem from './TaskItem';
import LevelTracker from './LevelTracker';
import HeaderHero from './HeaderHero';
import Nav from './Nav'; 
import soundFile from './sound.wav';
import completeSoundFile from './complete.wav';
import { calculateStars } from './TaskUtilities';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [urgency, setUrgency] = useState('');
  const [expireToggle, setExpireToggle] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('Today');
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  });
  
  const [stars, setStars] = useState(() => {
    const savedStars = localStorage.getItem('stars');
    return savedStars ? parseInt(savedStars, 10) : 0;
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const audioRef = useRef(null);
  const completeAudioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    localStorage.setItem('stars', stars);
  }, [tasks, completedTasks, stars]);

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
        label: currentLabel,
        expire: expireToggle ? new Date(moment().add(timeEstimate, 'minutes')) : null,
      };
      setTasks([newTask, ...tasks]);
      setTask('');
      setTimeEstimate('');
      setUrgency('');
      setExpireToggle(false);

      setShowNotification(true);
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Error trying to play the audio:", error);
        });
      }
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const toggleTask = (index) => {
    setShowConfetti(true);

    setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        const completedTask = newTasks.splice(index, 1)[0];

        setCompletedTasks(prevCompleted => [...prevCompleted, completedTask]);
        const starsIncrement = calculateStars(completedTask);
        setStars(prevStars => prevStars + starsIncrement);
        
        return newTasks;
    });

    setTimeout(() => {
        setShowConfetti(false);
    }, 2000);

    if (completeAudioRef.current) {
        completeAudioRef.current.play().catch(error => {
            console.error("Error trying to play the completion audio:", error);
        });
    }
};





  let displayedTasks = currentLabel === 'Mission logs' ? completedTasks : tasks.filter(t => t.label === currentLabel);

  return (
    <div className="container todoApp" style={{ maxWidth: '580px', margin: '0 auto !important', width: '100%' }}>
      {showConfetti && <Confetti />}
      {showNotification && (
        <div className="notification">
          Roger that, new mission has been added to the {currentLabel} roadmap.
        </div>
      )}
      <audio ref={audioRef} src={soundFile} preload="auto"></audio>
      <audio ref={completeAudioRef} src={completeSoundFile} preload="auto"></audio>
      
      <LevelTracker experience={stars} />
      <HeaderHero />
      <Nav onNavClick={setCurrentLabel} />
      <TaskInputForm 
          task={task}
          timeEstimate={timeEstimate}
          urgency={urgency}
          expireToggle={expireToggle}
          onTaskChange={(e) => setTask(e.target.value)}
          onTimeEstimateChange={(e) => setTimeEstimate(e.target.value)}
          onUrgencyChange={(e) => setUrgency(e.target.value)}
          onExpireToggleChange={(e) => setExpireToggle(e.target.checked)}
          onAddTask={addTask}
      />
      <h1 className="labelPortal">{currentLabel}</h1>
      <ul className="list-group task-list">
    {displayedTasks.map((task, index) => (
        <TaskItem 
            key={task.timestamp}
            task={task}
            toggleTask={currentLabel !== 'Mission logs' ? () => toggleTask(tasks.indexOf(task)) : null}
        />
    ))}
    {displayedTasks.length === 0 && <div>You have no missions in this roadmap.</div>}
</ul>


    </div>
  );
};

export default TodoList;

import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    const tasksToSave = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  }, [tasks]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="container todoApp" style={{ maxWidth: '580px', margin: '0 auto !important', width: '100%' }}>
      <div className="input-group mb-3">
        <h1>Mission Objectives</h1>
        <input type="text" className="form-control" placeholder="Write new objective..." value={task} onChange={(e) => setTask(e.target.value)} style={{ width: '100%' }} />
        <div className="input-group-append w-100 mainCta">
          <button className="btn btn-primary w-100" onClick={addTask}>Add Objective</button>
        </div>
      </div>
      <ul className="list-group task-list">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item" onClick={() => toggleTask(index)} style={{ textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? '0.5' : '1' }}>
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

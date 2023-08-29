import React from 'react';

const TaskInputForm = ({ task, timeEstimate, urgency, expireToggle, onTaskChange, onTimeEstimateChange, onUrgencyChange, onExpireToggleChange, onAddTask }) => (
  <div className="input-group mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="What's the mission?"
      value={task}
      onChange={onTaskChange}
      style={{ width: '100%' }}
    />
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      className="form-control"
      placeholder="How long will it take? (Number of minutes)"
      value={timeEstimate}
      onChange={onTimeEstimateChange}
      style={{ width: '100%' }}
    />
    <select
      value={urgency}
      onChange={onUrgencyChange}
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
        onChange={onExpireToggleChange}
      />
      <div className="form-check-label" htmlFor="expireToggle">Race?</div>
    </div>
    <div className="input-group-append w-100 mainCta">
      <button className="btn btn-primary w-100" onClick={onAddTask}><i className="fa-solid fa-plus"></i> Add mission</button>
    </div>
  </div>
);

export default TaskInputForm;

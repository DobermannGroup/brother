import React from 'react';
import moment from 'moment';
import TimerWheel from './TimerWheel';

const TaskItem = ({ task, toggleTask }) => (
    <li onClick={toggleTask} className={`task-${task.urgency}`}>
    <i className="fa-duotone fa-o"></i> {task.text}
    <div className="timeTaken">Time Estimate: {task.timeEstimate} mins</div>
    <div className="timeAdded">Added {moment(task.timestamp).fromNow()}</div>
    {task.expire && <TimerWheel timeEstimate={task.timeEstimate} startTime={task.timestamp} />}
  </li>
);

export default TaskItem;

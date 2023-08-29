import React from 'react';
import moment from 'moment';
import TimerWheel from './TimerWheel';

const TaskItem = ({ task, className, toggleTask }) => {
    return (
        <li onClick={toggleTask} 
            className={`task-${task.urgency} ${task.completed ? 'CompletedTask' : ''}`}>
            <i className="fa-duotone fa-o"></i> {task.text}
            
            <div className="timeTaken">Time Estimate: {task.timeEstimate} mins</div>
            
            <div className="timeAdded">Added {moment(task.timestamp).fromNow()}</div>

            {task.expire && <TimerWheel timeEstimate={task.timeEstimate} startTime={task.timestamp} />}

            {/* This is where we display the new data for completed tasks */}
            {task.completed && (
                <div className="missionStat">
                    <div>
                        <strong>Time taken to complete</strong>: {moment(task.completedAt).diff(moment(task.timestamp), 'minutes')} minutes
                    </div>
                    <div>
                    You earned <strong>{task.starsEarned ? task.starsEarned.toLocaleString() : '0'}</strong> for completing this mission.

                    </div>
                </div>
            )}
        </li>
    );
};

export default TaskItem;

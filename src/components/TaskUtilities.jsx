import moment from 'moment';

export const calculateStars = (task) => {
    const elapsedTime = moment().diff(moment(task.timestamp), 'seconds');
    const totalSeconds = task.timeEstimate * 60;
    const completionRatio = elapsedTime / totalSeconds;

    let urgencyBonus = 0;
    if (task.urgency === 'red') {
        urgencyBonus = 1000;
    } else if (task.urgency === 'amber') {
        urgencyBonus = 600;
    } else if (task.urgency === 'green') {
        urgencyBonus = 300;
    }

    let multiplier = 1;
    if (completionRatio <= 0.5) {
        multiplier = 3000;
    } else if (completionRatio < 1) {
        multiplier = 3000 - (completionRatio * 3000);
    }

    return multiplier + urgencyBonus;
};

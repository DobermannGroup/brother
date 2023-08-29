import React from 'react';

const UKMilitaryRanks = [
  'Private', 'Lance Corporal', 'Corporal',
  'Sergeant', 'Staff Sergeant', 'Warrant Officer Class 2 (WO2)',
  'Warrant Officer Class 1 (WO1)', 'Second Lieutenant', 'Lieutenant',
  'Captain', 'Major', 'Lieutenant Colonel', 'Colonel',
  'Brigadier', 'Major General', 'Lieutenant General',
  'General', 'Field Marshal'
];

const LevelTracker = ({ experience }) => {
  const numRanks = UKMilitaryRanks.length;
  const LEVELS = Array.from({ length: numRanks }, (_, i) => (500000 / (numRanks - 1)) * i);
  
  const currentLevel = Math.max(LEVELS.findIndex(level => experience < level) - 1, 0); // Ensure non-negative

  const prevLevelExp = LEVELS[currentLevel] || 0;  // If undefined or null, default to 0
  const nextLevelExp = LEVELS[currentLevel + 1] || LEVELS[LEVELS.length - 1]; // Default to last level if undefined

  const experienceAtCurrentLevel = experience - prevLevelExp;
  const requiredExpForNextLevel = nextLevelExp - prevLevelExp;
  
  const percentageProgress = Math.round((experienceAtCurrentLevel / requiredExpForNextLevel) * 100);
  const starsRemaining = Math.round(nextLevelExp - experience);
  const nextRank = UKMilitaryRanks[currentLevel + 1] || 'Max Rank'; // Ensure we don't go out of bounds

  return (
    <div className="level-tracker">
      <h3>{UKMilitaryRanks[currentLevel]} <i className="fa-sharp fa-solid fa-star"></i> {Math.round(experience)}</h3>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${percentageProgress}%` }} />
      </div>
      <p className="nextStep">{starsRemaining} <i className="fa-sharp fa-solid fa-star"></i> remaining until you reach <strong>{nextRank}</strong></p>
    </div>
  );
};

export default LevelTracker;

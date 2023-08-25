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
  const LEVELS = Array.from({ length: numRanks }, (_, i) => (350000 / (numRanks - 1)) * i);
  const currentLevel = LEVELS.findIndex(level => experience < level) - 1;
  const nextLevelExp = LEVELS[currentLevel + 1];
  const nextRank = UKMilitaryRanks[currentLevel + 1] || 'Max Rank';
  const starsRemaining = Math.round(nextLevelExp - experience); // Round to the nearest whole number
  const percentageProgress = Math.round((experience / nextLevelExp) * 100);
  
  return (
    <div className="level-tracker">
      <h3>{UKMilitaryRanks[currentLevel]} <i className="fa-sharp fa-solid fa-star"></i> {Math.round(experience)}</h3> {/* Round to the nearest whole number */}
      <div className="progress">
        <div className="progress-bar" style={{ width: `${percentageProgress}%` }} />
      </div>
      <p className="nextStep">{starsRemaining} <i className="fa-sharp fa-solid fa-star"></i> remaining until you reach <strong>{nextRank}</strong></p>
    </div>
  );
};

export default LevelTracker;

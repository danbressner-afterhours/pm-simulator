import { useState } from 'react';
import { scenario, calculateTotalEffort } from '../data/scenario';
import AboutModal from './AboutModal';
import './GameInfo.css';

const GameInfo = ({ columns, currentSprint = 1, capacityModifiers = {} }) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  // Calculate total effort across all sprints
  const totalEffort = Object.values(columns).flat().reduce((total, id) => {
    return total + (scenario.features.find(f => f.id === id)?.effortMonths || 0);
  }, 0);

  // Calculate current sprint info
  const currentSprintKey = `sprint${currentSprint}`;
  const currentSprintEffort = calculateTotalEffort(columns[currentSprintKey] || []);
  const baseCapacity = 3;
  const currentSprintCapacity = baseCapacity + (capacityModifiers[currentSprintKey] || 0);
  const currentSprintRemaining = currentSprintCapacity - currentSprintEffort;
  const isCurrentSprintOver = currentSprintEffort > currentSprintCapacity;

  const remainingCapacity = scenario.context.totalDevMonths - totalEffort;
  const isOverCapacity = totalEffort > scenario.context.totalDevMonths;

  return (
    <div className="game-info">
      <div className="info-header">
        <h1 className="game-title">PM SIMULATOR</h1>
        <div className="company-name">{scenario.context.company}</div>
      </div>

      {/* Current Sprint Capacity */}
      <div className="capacity-section">
        <h2>Sprint {currentSprint} Capacity</h2>
        <div className={`capacity-meter ${isCurrentSprintOver ? 'over' : ''}`}>
          <div className="capacity-numbers">
            <span className="capacity-used-large">{currentSprintEffort}</span>
            <span className="capacity-divider">/</span>
            <span className="capacity-total-large">{currentSprintCapacity}</span>
            <span className="capacity-unit-large">months</span>
          </div>
          {capacityModifiers[currentSprintKey] !== 0 && capacityModifiers[currentSprintKey] !== undefined && (
            <div className={`capacity-modifier ${capacityModifiers[currentSprintKey] > 0 ? 'bonus' : 'penalty'}`}>
              {capacityModifiers[currentSprintKey] > 0 ? '📈' : '📉'}
              {capacityModifiers[currentSprintKey] > 0 ? '+' : ''}{capacityModifiers[currentSprintKey]} from incident handling
            </div>
          )}
          <div className="capacity-bar">
            <div
              className="capacity-fill"
              style={{ width: `${Math.min((currentSprintEffort / currentSprintCapacity) * 100, 100)}%` }}
            />
          </div>
          <div className="capacity-remaining">
            {isCurrentSprintOver ? (
              <span className="over-warning">⚠️ {Math.abs(currentSprintRemaining)} months over!</span>
            ) : (
              <span>{currentSprintRemaining} months remaining</span>
            )}
          </div>
        </div>
      </div>

      {/* Total Capacity (All Sprints) */}
      <div className="capacity-section secondary">
        <h2>Total Capacity</h2>
        <div className={`capacity-meter ${isOverCapacity ? 'over' : ''}`}>
          <div className="capacity-numbers">
            <span className="capacity-used-large">{totalEffort}</span>
            <span className="capacity-divider">/</span>
            <span className="capacity-total-large">{scenario.context.totalDevMonths}</span>
            <span className="capacity-unit-large">months</span>
          </div>
        </div>
      </div>

      {/* Context */}
      <div className="context-section">
        <h2>Context</h2>
        <div className="context-grid">
          <div className="context-item">
            <span className="context-label">Team:</span>
            <span className="context-value">{scenario.context.developers} devs</span>
          </div>
          <div className="context-item">
            <span className="context-label">Timeline:</span>
            <span className="context-value">{scenario.context.totalSprints} months</span>
          </div>
          <div className="context-item">
            <span className="context-label">Runway:</span>
            <span className="context-value">{scenario.context.runway}</span>
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div className="objectives-section">
        <h2>Strategic Objectives</h2>
        <div className="objectives-list">
          {scenario.objectives.map((objective, index) => (
            <div key={objective.id} className="objective-item">
              <span className="objective-number">{index + 1}.</span>
              <span className="objective-text">{objective.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vision */}
      <div className="vision-section">
        <h3>Company Vision</h3>
        <p className="vision-text">{scenario.vision}</p>
      </div>

      {/* Instructions */}
      <div className="instructions-section">
        <h3>Instructions</h3>
        <ul className="instructions-list">
          <li>Drag tickets into current sprint column</li>
          <li>Complete sprints sequentially (1 → 2 → 3)</li>
          <li>Each sprint = 3 dev-months capacity</li>
          <li>Handle SEV-1 incidents between sprints</li>
          <li>Incident performance affects next sprint!</li>
          <li>Watch for critical deadlines!</li>
        </ul>
      </div>

      {/* About Button */}
      <div className="about-section">
        <button className="about-button" onClick={() => setIsAboutOpen(true)}>
          About
        </button>
      </div>

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default GameInfo;

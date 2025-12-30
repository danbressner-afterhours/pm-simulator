import { scenario, calculateTotalEffort } from '../data/scenario';
import './GameInfo.css';

const GameInfo = ({ columns }) => {
  // Calculate total effort across all sprints
  const totalEffort = Object.values(columns).flat().reduce((total, id) => {
    return total + (scenario.features.find(f => f.id === id)?.effortMonths || 0);
  }, 0);

  const remainingCapacity = scenario.context.totalDevMonths - totalEffort;
  const isOverCapacity = totalEffort > scenario.context.totalDevMonths;

  return (
    <div className="game-info">
      <div className="info-header">
        <h1 className="game-title">PM SIMULATOR</h1>
        <div className="company-name">{scenario.context.company}</div>
      </div>

      {/* Capacity Meter */}
      <div className="capacity-section">
        <h2>Dev Capacity</h2>
        <div className={`capacity-meter ${isOverCapacity ? 'over' : ''}`}>
          <div className="capacity-numbers">
            <span className="capacity-used-large">{totalEffort}</span>
            <span className="capacity-divider">/</span>
            <span className="capacity-total-large">{scenario.context.totalDevMonths}</span>
            <span className="capacity-unit-large">months</span>
          </div>
          <div className="capacity-bar">
            <div
              className="capacity-fill"
              style={{ width: `${Math.min((totalEffort / scenario.context.totalDevMonths) * 100, 100)}%` }}
            />
          </div>
          <div className="capacity-remaining">
            {isOverCapacity ? (
              <span className="over-warning">⚠️ {Math.abs(remainingCapacity)} months over!</span>
            ) : (
              <span>{remainingCapacity} months remaining</span>
            )}
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
          <li>Drag tickets into sprint columns</li>
          <li>Stay within 9 dev-months total</li>
          <li>Each sprint = 3 dev-months capacity</li>
          <li>Align with strategic objectives</li>
          <li>Watch for critical deadlines!</li>
        </ul>
      </div>
    </div>
  );
};

export default GameInfo;

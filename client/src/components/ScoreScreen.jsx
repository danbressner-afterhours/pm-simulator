import { getFeatureById } from '../data/scenario';
import './ScoreScreen.css';

const ScoreScreen = ({ scoreData, onPlayAgain }) => {
  const { score, grade, gradeMessage, details, selectedFeatureIds, totalEffort, capacity, warRoomResults = [], warRoomScore = 0, warRoomBonus = 0 } = scoreData;

  return (
    <div className="score-screen">
      <div className="score-container">
        {/* Header */}
        <div className="score-header">
          <h1 className="score-title">Roadmap Results</h1>
          <div className="score-subtitle">Your First 3 Months as PM</div>
        </div>

        {/* Score Display */}
        <div className="score-display">
          <div className="score-grade">{grade}</div>
          <div className="score-number">{score}/100</div>
          <div className="score-message">{gradeMessage}</div>
        </div>

        {/* Capacity Summary */}
        <div className="capacity-summary">
          <div className="summary-label">Roadmap Capacity:</div>
          <div className="summary-value">
            {totalEffort} / {capacity} months
            {totalEffort > capacity && <span className="over-badge">OVER!</span>}
          </div>
        </div>

        {/* War Room Performance */}
        {warRoomResults.length > 0 && (
          <div className="war-room-summary">
            <h2 className="section-title">🚨 Incident Management</h2>
            <div className="war-room-stats">
              <div className="war-room-stat">
                <span className="stat-label">Incidents Handled:</span>
                <span className="stat-value">{warRoomResults.length}</span>
              </div>
              <div className="war-room-stat">
                <span className="stat-label">Total Score:</span>
                <span className="stat-value">{warRoomScore} pts</span>
              </div>
              <div className="war-room-stat">
                <span className="stat-label">Score Bonus:</span>
                <span className={`stat-value ${warRoomBonus > 0 ? 'positive' : warRoomBonus < 0 ? 'negative' : ''}`}>
                  {warRoomBonus > 0 ? '+' : ''}{warRoomBonus}
                </span>
              </div>
            </div>
            <div className="war-room-results">
              {warRoomResults.map((result, index) => (
                <div key={index} className="war-room-result">
                  <div className="result-header">
                    <span className="result-label">Incident {index + 1}</span>
                    <span className={`result-grade grade-${result.grade?.toLowerCase()}`}>{result.grade}</span>
                  </div>
                  <div className="result-details">
                    <span className="result-points">{result.points} points</span>
                    <span className="result-time">{90 - (result.timeRemaining || 0)}s</span>
                    <span className={`result-capacity ${result.capacityModifier > 0 ? 'bonus' : result.capacityModifier < 0 ? 'penalty' : 'neutral'}`}>
                      {result.capacityModifier > 0 ? '+' : result.capacityModifier < 0 ? '' : ''}{result.capacityModifier} capacity
                    </span>
                  </div>
                  <div className="result-feedback">{result.performanceFeedback}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Sections */}
        <div className="feedback-sections">
          {/* Positives */}
          {details.positives.length > 0 && (
            <div className="feedback-section positives">
              <h2 className="section-title">✅ Good Decisions</h2>
              <div className="feedback-list">
                {details.positives.map((item, index) => (
                  <div key={index} className="feedback-item positive">
                    <div className="feedback-header">
                      <span className="feedback-title">{item.title}</span>
                      <span className="feedback-impact positive-impact">+{item.impact}</span>
                    </div>
                    <p className="feedback-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Negatives */}
          {details.negatives.length > 0 && (
            <div className="feedback-section negatives">
              <h2 className="section-title">❌ Missed Opportunities</h2>
              <div className="feedback-list">
                {details.negatives.map((item, index) => (
                  <div key={index} className="feedback-item negative">
                    <div className="feedback-header">
                      <span className="feedback-title">{item.title}</span>
                      <span className="feedback-impact negative-impact">{item.impact}</span>
                    </div>
                    <p className="feedback-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {details.warnings.length > 0 && (
            <div className="feedback-section warnings">
              <h2 className="section-title">⚠️ Things to Consider</h2>
              <div className="feedback-list">
                {details.warnings.map((item, index) => (
                  <div key={index} className="feedback-item warning">
                    <div className="feedback-header">
                      <span className="feedback-title">{item.title}</span>
                    </div>
                    <p className="feedback-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Features Summary */}
        <div className="selected-features">
          <h3 className="features-title">Your Roadmap ({selectedFeatureIds.length} features)</h3>
          <div className="features-grid">
            {selectedFeatureIds.map(id => {
              const feature = getFeatureById(id);
              return (
                <div key={id} className="feature-chip">
                  <span className="chip-id">#{id}</span>
                  <span className="chip-title">{feature.title}</span>
                  <span className="chip-effort">{feature.effortMonths}mo</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="score-actions">
          <button className="retro-button play-again-button" onClick={onPlayAgain}>
            Play Again
          </button>
        </div>

        {/* Footer Message */}
        <div className="score-footer">
          <p className="footer-text">
            Being a PM is all about tough tradeoffs. Every decision has consequences!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreScreen;

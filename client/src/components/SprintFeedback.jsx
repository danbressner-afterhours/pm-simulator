import './SprintFeedback.css';

const SprintFeedback = ({ sprintNum, sprintData, onContinue }) => {
  if (!sprintData) return null;

  const { features = [], effort = 0, criticalFeatures = [], isOverCapacity = false } = sprintData;

  return (
    <div className="sprint-feedback-overlay">
      <div className="feedback-card">
        <div className="feedback-header">
          <h1 className="feedback-title">Sprint {sprintNum} Complete!</h1>
          <div className="completion-icon">✅</div>
        </div>

        <div className="sprint-summary">
          <div className="summary-item">
            <span className="summary-count">{features.length}</span>
            <span className="summary-label">Features Planned</span>
          </div>
          <div className="summary-divider">•</div>
          <div className="summary-item">
            <span className="summary-count">{effort}</span>
            <span className="summary-label">Dev Months Used</span>
          </div>
        </div>

        <div className="quick-feedback">
          {criticalFeatures.length > 0 && (
            <div className="feedback-item positive">
              <span className="feedback-icon">✓</span>
              <span className="feedback-text">Included {criticalFeatures.length} critical feature{criticalFeatures.length > 1 ? 's' : ''}</span>
            </div>
          )}
          {isOverCapacity && (
            <div className="feedback-item negative">
              <span className="feedback-icon">⚠</span>
              <span className="feedback-text">Over capacity - may cause delays</span>
            </div>
          )}
          {!isOverCapacity && effort > 0 && (
            <div className="feedback-item neutral">
              <span className="feedback-icon">→</span>
              <span className="feedback-text">Sprint plan looks good!</span>
            </div>
          )}
        </div>

        {sprintNum < 3 && (
          <div className="next-phase-notice">
            <span className="notice-icon">🚨</span>
            <span className="notice-text">Incoming SEV-1 Incident!</span>
          </div>
        )}

        <button
          className="retro-button continue-button"
          onClick={onContinue}
        >
          {sprintNum < 3 ? 'Handle Incident →' : 'View Final Results →'}
        </button>
      </div>
    </div>
  );
};

export default SprintFeedback;

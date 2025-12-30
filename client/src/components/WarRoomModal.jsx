import { useState, useEffect } from 'react';
import { paymentSystemIncident } from '../data/warRoomIncidents';
import { calculateWarRoomScore } from '../utils/warRoomScoring';
import { SlackNotificationContainer } from './SlackNotification';
import './WarRoomModal.css';

const WarRoomModal = ({ incidentNum, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [choices, setChoices] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const incident = paymentSystemIncident;
  const incidentQuestions = incident.questions;

  // Timer countdown
  useEffect(() => {
    if (isComplete) return;

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete]);

  // Trigger interruption messages at specific times
  useEffect(() => {
    if (isComplete) return;

    incident.interruptionMessages.forEach(msg => {
      if (elapsedTime === msg.time) {
        const notification = {
          ...msg,
          id: nextNotificationId
        };
        setNotifications(prev => {
          const updated = [...prev, notification];
          return updated.slice(-3);
        });
        setNextNotificationId(prev => prev + 1);
      }
    });
  }, [elapsedTime, isComplete]);

  const handleTimeout = () => {
    // Time ran out - complete with current choices
    completeIncident();
  };

  const handleChoice = (questionId, choiceId) => {
    const newChoices = [...choices, { questionId, choiceId }];
    setChoices(newChoices);

    if (currentQuestion < incidentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeIncident(newChoices);
    }
  };

  const completeIncident = (finalChoices = choices) => {
    const incidentResult = calculateWarRoomScore(finalChoices, timeLeft, incidentQuestions);
    setResult(incidentResult);
    setIsComplete(true);

    // Auto-advance after showing result
    setTimeout(() => {
      onComplete(incidentResult);
    }, 4000);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="war-room-overlay">
      <div className="war-room-container">
        {/* Header with timer */}
        <div className="war-room-header">
          <h1 className="incident-alert">
            <span className="alert-icon">🚨</span>
            SEV-1 INCIDENT
          </h1>
          <div className={`timer ${timeLeft < 30 ? 'critical' : timeLeft < 60 ? 'warning' : ''}`}>
            <span className="timer-icon">⏱️</span>
            <span className="timer-value">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Incident Dashboard */}
        <div className="incident-dashboard">
          <div className="incident-title">
            <span className="severity-badge">{incident.severity}</span>
            <span className="incident-name">{incident.title}</span>
          </div>
          <div className="incident-description">{incident.description}</div>
          <div className="metrics-grid">
            <div className="metric">
              <span className="metric-label">Error Rate</span>
              <span className="metric-value critical">{incident.metricsStart.errorRate}/min ⚠️</span>
            </div>
            <div className="metric">
              <span className="metric-label">Users Affected</span>
              <span className="metric-value">~{incident.metricsStart.usersAffected.toLocaleString()}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Revenue Impact</span>
              <span className="metric-value">${(incident.metricsStart.revenueImpact / 1000).toFixed(0)}K/hour</span>
            </div>
          </div>
        </div>

        {/* Current Question or Result */}
        {!isComplete ? (
          <div className="question-container">
            <div className="question-progress">
              <span className="progress-text">Question {currentQuestion + 1} of {incidentQuestions.length}</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / incidentQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="question-text">
              {incidentQuestions[currentQuestion].text}
            </h2>

            <div className="choices-grid">
              {incidentQuestions[currentQuestion].choices.map((choice) => (
                <button
                  key={choice.id}
                  className="choice-button"
                  onClick={() => handleChoice(currentQuestion, choice.id)}
                >
                  <span className="choice-letter">{choice.letter}</span>
                  <span className="choice-text">{choice.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="incident-resolved">
            <div className="resolved-icon">✅</div>
            <h2 className="resolved-title">Incident Resolved!</h2>
            <div className="resolved-stats">
              <div className="stat-item">
                <span className="stat-label">Time</span>
                <span className="stat-value">{90 - timeLeft}s</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Score</span>
                <span className="stat-value">{result?.points || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Grade</span>
                <span className={`stat-value grade-${result?.grade.toLowerCase()}`}>{result?.grade || 'F'}</span>
              </div>
            </div>
            <div className={`capacity-impact ${result?.capacityModifier > 0 ? 'positive' : result?.capacityModifier < 0 ? 'negative' : 'neutral'}`}>
              {result?.capacityModifier > 0 && '📈 '}
              {result?.capacityModifier < 0 && '📉 '}
              {result?.performanceFeedback}
            </div>
          </div>
        )}

        {/* Slack notifications during incident */}
        <SlackNotificationContainer
          notifications={notifications}
          onDismiss={handleDismissNotification}
        />
      </div>
    </div>
  );
};

export default WarRoomModal;

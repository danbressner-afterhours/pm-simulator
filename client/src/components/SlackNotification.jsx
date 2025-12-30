import { useState, useEffect } from 'react';
import './SlackNotification.css';

const SlackNotification = ({ message, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Slide in after a brief delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-dismiss after 5 seconds
    const dismissTimer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onDismiss();
    }, 300); // Match animation duration
  };

  const getPriorityClass = () => {
    switch (message.priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div
      className={`slack-notification ${isVisible ? 'visible' : ''} ${isLeaving ? 'leaving' : ''} ${getPriorityClass()}`}
      onClick={handleDismiss}
    >
      <div className="notification-icon">
        {/* Simple Slack-like logo */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.9"/>
          <rect x="14" y="2" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.7"/>
          <rect x="2" y="14" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.7"/>
          <rect x="14" y="14" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.9"/>
        </svg>
      </div>
      <div className="notification-content">
        <div className="notification-sender">{message.sender}</div>
        <div className="notification-message">{message.message}</div>
      </div>
      <button className="notification-close" onClick={handleDismiss}>×</button>
    </div>
  );
};

// Container component to manage multiple notifications
export const SlackNotificationContainer = ({ notifications, onDismiss }) => {
  return (
    <div className="slack-notifications-container">
      {notifications.map((notification) => (
        <SlackNotification
          key={notification.id}
          message={notification}
          onDismiss={() => onDismiss(notification.id)}
        />
      ))}
    </div>
  );
};

export default SlackNotification;

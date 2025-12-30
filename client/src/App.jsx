import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import ScoreScreen from './components/ScoreScreen';
import { SlackNotificationContainer } from './components/SlackNotification';
import { calculateScore } from './utils/scoring';
import { slackMessages } from './data/slackMessages';
import './App.css';

function App() {
  const [gamePhase, setGamePhase] = useState('playing'); // 'playing' | 'results'
  const [scoreData, setScoreData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(0);

  // Notification system - triggers random messages during gameplay
  useEffect(() => {
    if (gamePhase !== 'playing') return;

    const triggerRandomNotification = () => {
      // Get a random message
      const randomMessage = slackMessages[Math.floor(Math.random() * slackMessages.length)];

      const notification = {
        ...randomMessage,
        id: nextNotificationId
      };

      setNotifications(prev => {
        // Keep max 3 notifications
        const updated = [...prev, notification];
        return updated.slice(-3);
      });

      setNextNotificationId(prev => prev + 1);
    };

    // Trigger first notification after 5 seconds
    const firstTimeout = setTimeout(triggerRandomNotification, 5000);

    // Then trigger every 15-30 seconds
    const interval = setInterval(() => {
      triggerRandomNotification();
    }, Math.random() * 15000 + 15000); // 15-30 seconds

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [gamePhase, nextNotificationId]);

  const handleSubmit = (columns) => {
    const score = calculateScore(columns);
    setScoreData(score);
    setGamePhase('results');
    // Clear notifications when showing results
    setNotifications([]);
  };

  const handlePlayAgain = () => {
    setScoreData(null);
    setGamePhase('playing');
    setNotifications([]);
    setNextNotificationId(0);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="app">
      {gamePhase === 'playing' ? (
        <GameBoard onSubmit={handleSubmit} />
      ) : (
        <ScoreScreen scoreData={scoreData} onPlayAgain={handlePlayAgain} />
      )}

      {/* Slack Notifications */}
      {gamePhase === 'playing' && (
        <SlackNotificationContainer
          notifications={notifications}
          onDismiss={handleDismissNotification}
        />
      )}
    </div>
  );
}

export default App;

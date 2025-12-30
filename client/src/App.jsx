import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import ScoreScreen from './components/ScoreScreen';
import SprintFeedback from './components/SprintFeedback';
import WarRoomModal from './components/WarRoomModal';
import { SlackNotificationContainer } from './components/SlackNotification';
import { calculateScore } from './utils/scoring';
import { generateSprintFeedback, calculateFinalScore } from './utils/scoring';
import { slackMessages } from './data/slackMessages';
import './App.css';

function App() {
  // Phase management - now sequential
  const [gamePhase, setGamePhase] = useState('sprint1');
  // Phases: 'sprint1' → 'feedback1' → 'warroom1' →
  //         'sprint2' → 'feedback2' → 'warroom2' →
  //         'sprint3' → 'results'

  const [currentSprint, setCurrentSprint] = useState(1);
  const [scoreData, setScoreData] = useState(null);

  // Sprint-specific state
  const [sprintSubmissions, setSprintSubmissions] = useState({
    sprint1: null,
    sprint2: null,
    sprint3: null
  });
  const [sprintFeedbackData, setSprintFeedbackData] = useState(null);

  // War Room state
  const [warRoomResults, setWarRoomResults] = useState([]);
  const [capacityModifiers, setCapacityModifiers] = useState({
    sprint2: 0, // ±1 based on warroom1
    sprint3: 0  // ±1 based on warroom2
  });

  // Slack notifications
  const [notifications, setNotifications] = useState([]);
  const [nextNotificationId, setNextNotificationId] = useState(0);

  // Notification system - triggers during sprint planning phases
  useEffect(() => {
    if (!gamePhase.startsWith('sprint')) return;

    const triggerRandomNotification = () => {
      const randomMessage = slackMessages[Math.floor(Math.random() * slackMessages.length)];
      const notification = {
        ...randomMessage,
        id: nextNotificationId
      };

      setNotifications(prev => {
        const updated = [...prev, notification];
        return updated.slice(-3);
      });

      setNextNotificationId(prev => prev + 1);
    };

    const firstTimeout = setTimeout(triggerRandomNotification, 5000);
    const interval = setInterval(() => {
      triggerRandomNotification();
    }, Math.random() * 15000 + 15000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [gamePhase, nextNotificationId]);

  // Sprint submission handler
  const handleSubmitSprint = (sprintNum, columns) => {
    // Save this sprint's submission
    setSprintSubmissions(prev => ({
      ...prev,
      [`sprint${sprintNum}`]: columns[`sprint${sprintNum}`]
    }));

    // Generate feedback for this sprint
    const feedback = generateSprintFeedback(sprintNum, columns);
    setSprintFeedbackData(feedback);

    // Clear notifications
    setNotifications([]);

    // Move to feedback phase
    setGamePhase(`feedback${sprintNum}`);
  };

  // Continue from sprint feedback
  const handleFeedbackContinue = () => {
    if (currentSprint < 3) {
      // Show War Room minigame
      setGamePhase(`warroom${currentSprint}`);
    } else {
      // Sprint 3 done, calculate final score
      const finalScore = calculateFinalScore(sprintSubmissions, warRoomResults);
      setScoreData(finalScore);
      setGamePhase('results');
    }
  };

  // War Room completion handler
  const handleWarRoomComplete = (result) => {
    // Save war room results
    setWarRoomResults(prev => [...prev, result]);

    // Apply capacity modifier to next sprint
    const nextSprint = currentSprint + 1;
    setCapacityModifiers(prev => ({
      ...prev,
      [`sprint${nextSprint}`]: result.capacityModifier
    }));

    // Unlock next sprint
    setCurrentSprint(nextSprint);
    setGamePhase(`sprint${nextSprint}`);
  };

  // Play again handler
  const handlePlayAgain = () => {
    setGamePhase('sprint1');
    setCurrentSprint(1);
    setScoreData(null);
    setSprintSubmissions({ sprint1: null, sprint2: null, sprint3: null });
    setSprintFeedbackData(null);
    setWarRoomResults([]);
    setCapacityModifiers({ sprint2: 0, sprint3: 0 });
    setNotifications([]);
    setNextNotificationId(0);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Determine which sprints are locked
  const lockedSprints = Array.from({length: 3}, (_, i) => i + 1).filter(n => n > currentSprint);

  return (
    <div className="app">
      {/* Sprint planning phases */}
      {gamePhase.startsWith('sprint') && (
        <>
          <GameBoard
            onSubmitSprint={handleSubmitSprint}
            currentSprint={currentSprint}
            lockedSprints={lockedSprints}
            capacityModifiers={capacityModifiers}
            previousSubmissions={sprintSubmissions}
          />

          <SlackNotificationContainer
            notifications={notifications}
            onDismiss={handleDismissNotification}
          />
        </>
      )}

      {/* Sprint feedback phase */}
      {gamePhase.startsWith('feedback') && (
        <SprintFeedback
          sprintNum={currentSprint}
          sprintData={sprintFeedbackData}
          onContinue={handleFeedbackContinue}
        />
      )}

      {/* War Room phase */}
      {gamePhase.startsWith('warroom') && (
        <WarRoomModal
          incidentNum={currentSprint}
          onComplete={handleWarRoomComplete}
        />
      )}

      {/* Final results */}
      {gamePhase === 'results' && (
        <ScoreScreen
          scoreData={scoreData}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;

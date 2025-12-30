export const calculateWarRoomScore = (choices, timeRemaining, questions) => {
  let points = 0;
  const feedback = [];

  // Score each choice
  choices.forEach((choice, index) => {
    const question = questions[index];
    const selectedChoice = question.choices.find(c => c.id === choice.choiceId);

    if (selectedChoice) {
      points += selectedChoice.points;
      feedback.push({
        questionNum: index + 1,
        question: question.text,
        choice: selectedChoice.text,
        correct: selectedChoice.isCorrect,
        points: selectedChoice.points,
        feedback: selectedChoice.feedback
      });
    }
  });

  // Time bonus: faster = better (but accuracy matters more)
  // +1 point per 10 seconds remaining
  const timeBonus = Math.floor(timeRemaining / 10);
  points += timeBonus;

  // Determine capacity impact based on performance
  let capacityModifier = 0;
  let performanceFeedback = "";

  if (points >= 70) {
    capacityModifier = +1; // Handled so well, team is energized
    performanceFeedback = "Excellent crisis management! Team morale is high. +1 dev month next sprint.";
  } else if (points >= 40) {
    capacityModifier = 0; // OK performance, no impact
    performanceFeedback = "Decent handling. Team continues as planned.";
  } else {
    capacityModifier = -1; // Poor handling, team is burned out
    performanceFeedback = "Rough incident. Team is burned out from firefighting. -1 dev month next sprint.";
  }

  // Determine grade
  let grade;
  if (points >= 70) {
    grade = 'A';
  } else if (points >= 50) {
    grade = 'B';
  } else if (points >= 30) {
    grade = 'C';
  } else {
    grade = 'D';
  }

  return {
    points,
    timeBonus,
    timeRemaining,
    capacityModifier,
    feedback,
    performanceFeedback,
    grade
  };
};

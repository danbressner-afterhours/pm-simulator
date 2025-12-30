import { scenario, calculateTotalEffort, getFeatureById } from '../data/scenario';

export const calculateScore = (columns) => {
  const selectedFeatureIds = [...columns.sprint1, ...columns.sprint2, ...columns.sprint3];
  const totalEffort = calculateTotalEffort(selectedFeatureIds);

  let score = 0;
  const feedback = [];
  const details = {
    positives: [],
    negatives: [],
    warnings: []
  };

  // 1. Resource Constraint Check (Pass/Fail)
  if (totalEffort > scenario.context.totalDevMonths) {
    details.negatives.push({
      title: "Over capacity!",
      description: `You allocated ${totalEffort} months but only have ${scenario.context.totalDevMonths} months available.`,
      impact: -30
    });
    score -= 30;
  } else if (totalEffort === scenario.context.totalDevMonths) {
    details.positives.push({
      title: "Perfect capacity utilization",
      description: "You used all 9 dev-months efficiently!",
      impact: +10
    });
    score += 10;
  } else if (totalEffort < scenario.context.totalDevMonths - 3) {
    details.warnings.push({
      title: "Under-utilized capacity",
      description: `You only used ${totalEffort} of ${scenario.context.totalDevMonths} months. Could have done more!`,
      impact: 0
    });
  }

  // 2. Critical Must-Haves
  // Feature #12 - Enterprise customer churn risk
  if (selectedFeatureIds.includes(12)) {
    details.positives.push({
      title: "Saved the enterprise customer!",
      description: "Feature #12: Prevented churn by delivering their must-have feature.",
      impact: +20
    });
    score += 20;
  } else {
    details.negatives.push({
      title: "Lost an enterprise customer 😱",
      description: "Feature #12: The enterprise customer churned because you didn't deliver their critical feature.",
      impact: -50
    });
    score -= 50;
  }

  // Feature #10 - API deadline
  if (selectedFeatureIds.includes(10)) {
    details.positives.push({
      title: "Hit the API deadline!",
      description: "Feature #10: Updated the integration before the partner's deadline.",
      impact: +15
    });
    score += 15;
  } else {
    details.negatives.push({
      title: "Missed critical deadline",
      description: "Feature #10: The integration broke because you didn't update the API in time. 40% of users affected!",
      impact: -30
    });
    score -= 30;
  }

  // 3. Strategic Alignment

  // Enterprise growth features (#2, #7)
  if (selectedFeatureIds.includes(2)) {
    details.positives.push({
      title: "Invested in new revenue stream",
      description: "Feature #2: New product line will help grow enterprise business.",
      impact: +15
    });
    score += 15;
  }

  if (selectedFeatureIds.includes(7)) {
    details.positives.push({
      title: "Maintained competitive advantage",
      description: "Feature #7: Improved the feature 90% of users rely on. Stayed ahead of competition!",
      impact: +20
    });
    score += 20;
  } else {
    details.warnings.push({
      title: "Competitive advantage at risk",
      description: "Feature #7: Competition is closing in on your strong suit. Might lose market position.",
      impact: 0
    });
  }

  // Support/efficiency features (#11, #5)
  if (selectedFeatureIds.includes(11)) {
    details.positives.push({
      title: "Improved support efficiency",
      description: "Feature #11: Support SLA improved by 30%, reducing ticket load.",
      impact: +10
    });
    score += 10;
  }

  if (selectedFeatureIds.includes(5)) {
    details.positives.push({
      title: "Better onboarding experience",
      description: "Feature #5: UX improvements made the product more self-served.",
      impact: +10
    });
    score += 10;
  }

  // 4. Penalties for low-value work

  // Feature #9 - CEO pet project
  if (selectedFeatureIds.includes(9)) {
    details.negatives.push({
      title: "Wasted effort on CEO pet project",
      description: "Feature #9: You gave in to pressure but this was nice-to-have with low impact.",
      impact: -10
    });
    score -= 10;
  }

  // Feature #1 - Keyboard shortcuts
  if (selectedFeatureIds.includes(1)) {
    details.negatives.push({
      title: "Low ROI feature",
      description: "Feature #1: Keyboard shortcuts only benefit 5% of users. Could have prioritized better.",
      impact: -5
    });
    score -= 5;
  }

  // Feature #6 - Internal analytics
  if (selectedFeatureIds.includes(6)) {
    details.warnings.push({
      title: "Internal tools over customer value",
      description: "Feature #6: This helps internally but doesn't drive business objectives.",
      impact: 0
    });
  }

  // 5. Bonus Points

  // Feature #8 - AI MVP
  if (selectedFeatureIds.includes(8)) {
    details.positives.push({
      title: "Innovation investment",
      description: "Feature #8: AI experiment might pay off big in 2 years. Bold bet!",
      impact: +10
    });
    score += 10;
  }

  // Feature #4 - Core product feature
  if (selectedFeatureIds.includes(4)) {
    details.positives.push({
      title: "Invested in core product",
      description: "Feature #4: Solid choice - serves 80% of users and continues product vision.",
      impact: +12
    });
    score += 12;
  }

  // Feature #3 - Tech debt
  if (selectedFeatureIds.includes(3)) {
    if (selectedFeatureIds.length <= 3) {
      details.positives.push({
        title: "Addressed technical debt",
        description: "Feature #3: Good call on refactoring - will help dev velocity long-term.",
        impact: +8
      });
      score += 8;
    } else {
      details.warnings.push({
        title: "Tech debt vs features",
        description: "Feature #3: Refactoring is good, but with limited time, features might have been better.",
        impact: 0
      });
    }
  }

  // Normalize score to 0-100 range (rough baseline: good decisions should get 60-80)
  const finalScore = Math.max(0, Math.min(100, score + 50)); // Adding 50 as baseline

  // Determine grade
  let grade;
  let gradeMessage;
  if (finalScore >= 80) {
    grade = "A";
    gradeMessage = "Excellent PM instincts!";
  } else if (finalScore >= 60) {
    grade = "B";
    gradeMessage = "Solid prioritization";
  } else if (finalScore >= 40) {
    grade = "C";
    gradeMessage = "Room for improvement";
  } else {
    grade = "D";
    gradeMessage = "Needs work";
  }

  return {
    score: Math.round(finalScore),
    grade,
    gradeMessage,
    details,
    selectedFeatureIds,
    totalEffort,
    capacity: scenario.context.totalDevMonths
  };
};

// Helper to get feature summary
export const getFeatureSummary = (featureIds) => {
  return featureIds.map(id => {
    const feature = getFeatureById(id);
    return {
      id: feature.id,
      title: feature.title,
      effort: feature.effortMonths,
      impact: feature.impactLevel
    };
  });
};

export const paymentSystemIncident = {
  title: "Payment System Down",
  description: "Stripe integration is failing. Customers can't complete checkouts.",
  severity: "SEV-1",
  metricsStart: {
    errorRate: 847,
    usersAffected: 2400,
    revenueImpact: 12000
  },

  questions: [
    {
      id: 1,
      text: "Payment processing suddenly started failing. What's your FIRST action?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "Page the on-call engineer immediately",
          isCorrect: true,
          points: 15,
          feedback: "Good! Getting engineering involved ASAP is critical."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Tweet that you're investigating the issue",
          isCorrect: false,
          points: -10,
          feedback: "Premature! Investigate first, then communicate."
        },
        {
          id: 'c',
          letter: 'C',
          text: "Check Stripe status page for outages",
          isCorrect: true,
          points: 10,
          feedback: "Smart! Could be a vendor issue."
        },
        {
          id: 'd',
          letter: 'D',
          text: "Schedule an emergency meeting",
          isCorrect: false,
          points: -15,
          feedback: "Too slow! Act first, meet later."
        }
      ]
    },
    {
      id: 2,
      text: "Engineer says it's not Stripe - it's your API. CEO is Slacking you. What do you tell them?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "We're on it, investigating the root cause. Will update in 15 min.",
          isCorrect: true,
          points: 15,
          feedback: "Perfect! Confident, specific timeline, stays calm."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Not sure yet, still looking into it.",
          isCorrect: false,
          points: -5,
          feedback: "Too vague. CEO needs confidence and timeline."
        },
        {
          id: 'c',
          letter: 'C',
          text: "It's bad. Might be down for hours.",
          isCorrect: false,
          points: -20,
          feedback: "Panic mode! Never speculate worst case without data."
        },
        {
          id: 'd',
          letter: 'D',
          text: "Can we talk about this later? I'm busy.",
          isCorrect: false,
          points: -25,
          feedback: "Career limiting move. Never dismiss your CEO during a crisis."
        }
      ]
    },
    {
      id: 3,
      text: "Support has 50+ tickets. Customers are angry. What do you do?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "Draft a customer-facing status page update",
          isCorrect: true,
          points: 15,
          feedback: "Excellent! Proactive communication reduces support load."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Tell support to close tickets and say 'we're working on it'",
          isCorrect: false,
          points: -10,
          feedback: "Band-aid solution. Customers need real updates."
        },
        {
          id: 'c',
          letter: 'C',
          text: "Ignore support, focus on fixing the issue",
          isCorrect: false,
          points: -15,
          feedback: "Can't ignore customers during an outage!"
        },
        {
          id: 'd',
          letter: 'D',
          text: "Offer refunds to all affected customers immediately",
          isCorrect: false,
          points: -10,
          feedback: "Premature! Fix first, then assess compensation."
        }
      ]
    },
    {
      id: 4,
      text: "Root cause found: recent deploy broke payment validation. What next?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "Rollback the deploy immediately",
          isCorrect: true,
          points: 20,
          feedback: "Fastest path to recovery! Rollback, then investigate."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Try to hotfix the bug in production",
          isCorrect: false,
          points: -10,
          feedback: "Risky! Rollback is safer and faster."
        },
        {
          id: 'c',
          letter: 'C',
          text: "Blame the engineer who shipped it",
          isCorrect: false,
          points: -30,
          feedback: "Terrible! Blameless post-mortems are the way."
        },
        {
          id: 'd',
          letter: 'D',
          text: "Wait for QA to verify the fix first",
          isCorrect: false,
          points: -20,
          feedback: "Too slow! This is SEV-1, every minute costs money."
        }
      ]
    },
    {
      id: 5,
      text: "System is back up. What's your final action?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "Update status page: 'Resolved. Monitoring for stability.'",
          isCorrect: true,
          points: 15,
          feedback: "Perfect! Close the loop with customers."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Schedule post-mortem for next week",
          isCorrect: true,
          points: 10,
          feedback: "Good! Learn from incidents."
        },
        {
          id: 'c',
          letter: 'C',
          text: "Nothing - just move on",
          isCorrect: false,
          points: -15,
          feedback: "Miss the learning opportunity! Always do post-mortems."
        },
        {
          id: 'd',
          letter: 'D',
          text: "Fire the engineer responsible",
          isCorrect: false,
          points: -40,
          feedback: "Terrible culture! Blameless post-mortems prevent future issues."
        }
      ]
    }
  ],

  // Messages that appear during gameplay at specific times
  interruptionMessages: [
    { time: 10, sender: "CEO", message: "HOW LONG WILL THIS TAKE?!", priority: "high" },
    { time: 25, sender: "Support Lead", message: "Customers are threatening to churn", priority: "high" },
    { time: 40, sender: "Sales", message: "Lost a deal because of this 😡", priority: "medium" },
    { time: 55, sender: "Engineer", message: "Found something in the logs...", priority: "high" },
    { time: 70, sender: "Marketing", message: "Should we post on social media?", priority: "low" }
  ]
};

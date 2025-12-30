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

export const databasePerformanceIncident = {
  title: "Database Meltdown",
  description: "App performance degraded to unusable. Database queries timing out.",
  severity: "SEV-1",
  metricsStart: {
    errorRate: 1243,
    usersAffected: 4800,
    revenueImpact: 18000
  },

  questions: [
    {
      id: 1,
      text: "Users report app is extremely slow. Monitoring shows database CPU at 98%. What's your first move?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "Scale up database resources immediately",
          isCorrect: true,
          points: 15,
          feedback: "Smart! Buy yourself time to investigate the root cause."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Start a Zoom call with entire engineering team",
          isCorrect: false,
          points: -10,
          feedback: "Too many cooks! Keep the war room small and focused."
        },
        {
          id: 'c',
          letter: 'C',
          text: "Look for recent deployments or database migrations",
          isCorrect: true,
          points: 10,
          feedback: "Good instinct! Recent changes are often the culprit."
        },
        {
          id: 'd',
          letter: 'D',
          text: "Turn off monitoring alerts to reduce noise",
          isCorrect: false,
          points: -20,
          feedback: "Never silence alerts during an incident! You need visibility."
        }
      ]
    },
    {
      id: 2,
      text: "DBA finds an unoptimized query running millions of times. It's from the feature your team shipped yesterday. What do you do?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "Kill the problematic queries and disable the new feature",
          isCorrect: true,
          points: 20,
          feedback: "Correct! Stop the bleeding first. Feature can wait."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Try to optimize the query in real-time",
          isCorrect: false,
          points: -5,
          feedback: "Too risky during an outage. Disable first, optimize later."
        },
        {
          id: 'c',
          letter: 'C',
          text: "Ask the engineer who wrote it to fix it",
          isCorrect: false,
          points: -15,
          feedback: "No time for blame! Focus on resolution."
        },
        {
          id: 'd',
          letter: 'D',
          text: "Wait to see if scaling fixed it",
          isCorrect: false,
          points: -20,
          feedback: "Passive approach during SEV-1 is dangerous. Take action!"
        }
      ]
    },
    {
      id: 3,
      text: "Feature is disabled but some customers already have cached bad state. Support is overwhelmed. What's your priority?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "Write a script to clear affected customer cache",
          isCorrect: true,
          points: 15,
          feedback: "Proactive! Fix the root cause, not symptoms."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Tell support to ask customers to clear their browser cache",
          isCorrect: false,
          points: -10,
          feedback: "Puts burden on customers. You broke it, you fix it."
        },
        {
          id: 'c',
          letter: 'C',
          text: "Post a workaround on the status page",
          isCorrect: true,
          points: 10,
          feedback: "Good communication! Helps customers self-serve."
        },
        {
          id: 'd',
          letter: 'D',
          text: "Wait for cache to expire naturally",
          isCorrect: false,
          points: -15,
          feedback: "Too slow! Customers are hurting right now."
        }
      ]
    },
    {
      id: 4,
      text: "VP of Sales escalates: \"Enterprise demo in 30 minutes, is the app stable?\" What do you say?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "Yes, we've mitigated the issue. Monitoring closely.",
          isCorrect: true,
          points: 15,
          feedback: "Honest and confident. Shows you're on top of it."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Definitely stable, no issues!",
          isCorrect: false,
          points: -20,
          feedback: "Overconfident! What if something breaks during the demo?"
        },
        {
          id: 'c',
          letter: 'C',
          text: "Maybe reschedule to be safe?",
          isCorrect: false,
          points: -10,
          feedback: "Too cautious. Trust your mitigation but stay alert."
        },
        {
          id: 'd',
          letter: 'D',
          text: "I'm busy, ask engineering directly",
          isCorrect: false,
          points: -25,
          feedback: "PM owns communication! Don't deflect to engineering."
        }
      ]
    },
    {
      id: 5,
      text: "System is stable. Incident resolved. How do you prevent this next time?",
      choices: [
        {
          id: 'a',
          letter: 'A',
          text: "Add database query review to PR checklist",
          isCorrect: true,
          points: 15,
          feedback: "Process improvement! Catch issues before production."
        },
        {
          id: 'b',
          letter: 'B',
          text: "Ban the team from shipping new features for a month",
          isCorrect: false,
          points: -30,
          feedback: "Punitive and counterproductive. Learn, don't punish."
        },
        {
          id: 'c',
          letter: 'C',
          text: "Set up better database monitoring and alerts",
          isCorrect: true,
          points: 15,
          feedback: "Great! Catch issues earlier next time."
        },
        {
          id: 'd',
          letter: 'D',
          text: "Nothing - incidents happen, move on",
          isCorrect: false,
          points: -20,
          feedback: "Missed learning opportunity! Always improve after incidents."
        }
      ]
    }
  ],

  interruptionMessages: [
    { time: 10, sender: "VP Sales", message: "Big demo in 30 min, is app working???", priority: "high" },
    { time: 25, sender: "Support Lead", message: "100+ tickets and counting...", priority: "high" },
    { time: 40, sender: "DBA", message: "Found the query. It's BAD.", priority: "high" },
    { time: 55, sender: "CEO", message: "Board member just complained. Status?", priority: "high" },
    { time: 70, sender: "Engineer", message: "Cache fix ready to deploy", priority: "medium" }
  ]
};

export const incidents = [
  paymentSystemIncident,
  databasePerformanceIncident
];

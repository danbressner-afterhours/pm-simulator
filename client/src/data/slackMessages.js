export const slackMessages = [
  // Low priority - general questions
  {
    sender: "Sarah (Designer)",
    message: "hey can you do a quick call? 🙏",
    priority: "low",
    delay: 5000
  },
  {
    sender: "Random Coworker",
    message: "quick question...",
    priority: "low",
    delay: 8000
  },
  {
    sender: "Marketing",
    message: "can you review this landing page copy?",
    priority: "low",
    delay: 12000
  },
  {
    sender: "HR",
    message: "reminder to fill out your quarterly review",
    priority: "low",
    delay: 15000
  },

  // Medium priority - normal PM stuff
  {
    sender: "Your Manager",
    message: "how's that roadmap coming?",
    priority: "medium",
    delay: 10000
  },
  {
    sender: "Engineering",
    message: "can you clarify the requirements?",
    priority: "medium",
    delay: 14000
  },
  {
    sender: "Support",
    message: "15 tickets came in today 😅",
    priority: "medium",
    delay: 18000
  },
  {
    sender: "Data Team",
    message: "here are the latest metrics...",
    priority: "medium",
    delay: 22000
  },
  {
    sender: "CEO",
    message: "can we add just ONE more thing?",
    priority: "medium",
    delay: 25000
  },
  {
    sender: "Product Designer",
    message: "should we A/B test this flow?",
    priority: "medium",
    delay: 28000
  },
  {
    sender: "Sales",
    message: "customer wants a demo tomorrow!",
    priority: "medium",
    delay: 32000
  },

  // High priority - urgent stuff
  {
    sender: "Dev Team",
    message: "found a P0 bug in production 🔥",
    priority: "high",
    delay: 7000
  },
  {
    sender: "Customer Success",
    message: "enterprise client is VERY unhappy",
    priority: "high",
    delay: 16000
  },
  {
    sender: "Engineering Lead",
    message: "the API is down",
    priority: "high",
    delay: 20000
  },
  {
    sender: "Sales Director",
    message: "deal closing today - need feature commitment",
    priority: "high",
    delay: 30000
  },

  // Humorous / relatable PM moments
  {
    sender: "Frontend Dev",
    message: "this wasn't in the spec...",
    priority: "medium",
    delay: 9000
  },
  {
    sender: "Backend Dev",
    message: "can we just use a third-party for this?",
    priority: "low",
    delay: 13000
  },
  {
    sender: "QA",
    message: "I think I found edge case #47",
    priority: "medium",
    delay: 19000
  },
  {
    sender: "Intern",
    message: "what does MVP mean again?",
    priority: "low",
    delay: 23000
  },
  {
    sender: "CTO",
    message: "have you considered technical debt?",
    priority: "medium",
    delay: 26000
  },
  {
    sender: "Sales",
    message: "just promised a feature to a client 😬",
    priority: "high",
    delay: 29000
  },
  {
    sender: "Executive Team",
    message: "board meeting next week - need update",
    priority: "high",
    delay: 33000
  },
  {
    sender: "Security Team",
    message: "we need to talk about compliance",
    priority: "medium",
    delay: 35000
  },
  {
    sender: "Community Manager",
    message: "users are asking about feature X",
    priority: "low",
    delay: 37000
  },
  {
    sender: "Analytics",
    message: "conversion rate dropped 5% 📉",
    priority: "high",
    delay: 40000
  }
];

// Helper to get random message
export const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * slackMessages.length);
  return slackMessages[randomIndex];
};

// Helper to get messages by priority
export const getMessagesByPriority = (priority) => {
  return slackMessages.filter(msg => msg.priority === priority);
};

export const scenario = {
  title: "Learnit Product Planning",
  subtitle: "Your First 3 Months as PM",

  context: {
    company: "test your skills",
    role: "First Product Manager",
    teamSize: 3,
    developers: 3,
    sprintLength: "1 month",
    totalSprints: 3,
    totalDevMonths: 9,
    runway: "1.5 years",
    stage: "Growth mode - achieved initial product-market fit"
  },

  vision: "To be the most comprehensive tool for companies to train new employees and manage those trainings.",

  objectives: [
    {
      id: 1,
      text: "Expand contracts of 5 enterprise customers (30% revenue)",
      weight: 3,
      category: "enterprise"
    },
    {
      id: 2,
      text: "Grow enterprise business to 20 companies",
      weight: 3,
      category: "growth"
    },
    {
      id: 3,
      text: "Reduce support tickets by 50% and make product more self-served",
      weight: 2,
      category: "efficiency"
    }
  ],

  features: [
    {
      id: 1,
      title: "Keyboard shortcuts for heavy users",
      description: "Add keyboard shortcuts to improve power user efficiency",
      reach: "5% of users",
      impact: "Nice to have",
      impactLevel: "low",
      effortMonths: 1,
      tags: ["ux", "power-users"],
      stakeholder: "Power Users",
      alignsWithObjectives: []
    },
    {
      id: 2,
      title: "New product line",
      description: "New product that sales and CEO are very keen on - could mean whole new revenue source. Relevant for enterprise customers.",
      reach: "Enterprise customers (existing and potential)",
      impact: "High - new revenue",
      impactLevel: "high",
      effortMonths: 4,
      tags: ["enterprise", "revenue", "strategic"],
      stakeholder: "Sales & CEO",
      alignsWithObjectives: [1, 2]
    },
    {
      id: 3,
      title: "Code refactoring",
      description: "Dev team requested refactoring to improve velocity and reduce bugs",
      reach: "Internal",
      impact: "Technical debt",
      impactLevel: "medium",
      effortMonths: 3,
      tags: ["tech-debt", "internal"],
      stakeholder: "Engineering Team",
      alignsWithObjectives: []
    },
    {
      id: 4,
      title: "New feature - continues product vision",
      description: "Major feature that continues current product vision and serves most users",
      reach: "80% of users",
      impact: "Medium-big",
      impactLevel: "high",
      effortMonths: 4,
      tags: ["core-product", "high-reach"],
      stakeholder: "Product Team",
      alignsWithObjectives: []
    },
    {
      id: 5,
      title: "Onboarding improvements (UX research)",
      description: "Improvements to onboarding flow based on recent UX research",
      reach: "All new users",
      impact: "Medium",
      impactLevel: "medium",
      effortMonths: 2,
      tags: ["ux", "onboarding", "self-serve"],
      stakeholder: "UX Team",
      alignsWithObjectives: [3]
    },
    {
      id: 6,
      title: "Internal analytics tool",
      description: "Analytics tool for internal company use",
      reach: "Internal team",
      impact: "Operational",
      impactLevel: "low",
      effortMonths: 1,
      tags: ["internal", "analytics"],
      stakeholder: "Internal Team",
      alignsWithObjectives: []
    },
    {
      id: 7,
      title: "Improve competitive advantage area",
      description: "Area used by 90% of users, was once our strong suit but competition is closing in. Need to maintain competitive advantage!",
      reach: "90% of users",
      impact: "Potentially big - competitive",
      impactLevel: "critical",
      effortMonths: 3,
      tags: ["competitive", "core-product", "high-reach"],
      stakeholder: "Product Team",
      alignsWithObjectives: [1, 2]
    },
    {
      id: 8,
      title: "AI MVP experiment",
      description: "Invest in MVP for new AI-based technology that might be the future in 2 years",
      reach: "Unknown - experimental",
      impact: "Might be game changer. Or nothing...",
      impactLevel: "unknown",
      effortMonths: 2,
      tags: ["innovation", "experimental", "ai"],
      stakeholder: "CTO",
      alignsWithObjectives: []
    },
    {
      id: 9,
      title: "CEO's late-night feature idea",
      description: "Feature CEO thought of last night. He says it MUST go in next sprint or the one after.",
      reach: "20% of users",
      impact: "Cool but nice-to-have",
      impactLevel: "low",
      effortMonths: 2,
      tags: ["nice-to-have", "stakeholder-pressure"],
      stakeholder: "CEO",
      urgent: true,
      alignsWithObjectives: []
    },
    {
      id: 10,
      title: "Strategic partner API update (DEADLINE)",
      description: "Major strategic partner is updating their API. Must adjust integration or feature stops working. Hard deadline: 3 months.",
      reach: "40% of users",
      impact: "Critical - hard deadline",
      impactLevel: "critical",
      effortMonths: 2,
      tags: ["deadline", "integration", "critical"],
      stakeholder: "Partnerships Team",
      deadline: "3 months",
      critical: true,
      alignsWithObjectives: []
    },
    {
      id: 11,
      title: "Support SLA improvement tool",
      description: "Internal tool to help support improve their SLA by 30%",
      reach: "Support team",
      impact: "Reduces support load",
      impactLevel: "medium",
      effortMonths: 1,
      tags: ["internal", "support", "efficiency"],
      stakeholder: "Support Team",
      alignsWithObjectives: [3]
    },
    {
      id: 12,
      title: "Enterprise customer must-have (CHURN RISK)",
      description: "Current enterprise customer MUST have this feature or they're out the door!",
      reach: "1 enterprise customer",
      impact: "Critical - churn risk",
      impactLevel: "critical",
      effortMonths: 1,
      tags: ["enterprise", "churn-risk", "critical"],
      stakeholder: "Account Management",
      critical: true,
      churnRisk: true,
      alignsWithObjectives: [1]
    }
  ]
};

// Helper function to get feature by ID
export const getFeatureById = (id) => {
  return scenario.features.find(f => f.id === id);
};

// Helper function to calculate total effort for a set of features
export const calculateTotalEffort = (featureIds) => {
  return featureIds.reduce((total, id) => {
    const feature = getFeatureById(id);
    return total + (feature ? feature.effortMonths : 0);
  }, 0);
};

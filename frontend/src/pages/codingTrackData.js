// Complete Coding Track Data Structure for BTG Platform

const codingTrackData = {
  trackId: 'coding-fundamentals',
  trackName: 'Coding Fundamentals',
  trackDescription: 'Build strong programming foundations through daily practice',
  trackIcon: '💻',
  totalSteps: 24,
  estimatedDuration: '8-12 weeks',
  difficulty: 'Beginner to Intermediate',
  
  steps: [
    // PHASE 1: BASICS (Steps 1-6)
    {
      id: 1,
      title: 'Variables & Data Types',
      description: 'Master the building blocks of programming',
      phase: 'Fundamentals',
      requiredStreakDays: 3,
      estimatedTimePerDay: '15-20 minutes',
      learningObjectives: [
        'Understand different data types (string, number, boolean)',
        'Declare and use variables effectively',
        'Practice type conversion and checking'
      ],
      dailyPractices: [
        {
          day: 1,
          task: 'Create variables for your personal info (name, age, isStudent)',
          hint: 'Try using let, const appropriately',
          expectedOutput: 'Variables declared with correct types'
        },
        {
          day: 2,
          task: 'Write a function that takes any value and returns its type',
          hint: 'Use typeof operator',
          expectedOutput: 'Function correctly identifies data types'
        },
        {
          day: 3,
          task: 'Convert between string and number types with user input',
          hint: 'Practice parseInt(), parseFloat(), toString()',
          expectedOutput: 'Successful type conversions without errors'
        }
      ],
      resources: [
        { type: 'video', title: 'JavaScript Variables Explained', url: '#', duration: '12 min' },
        { type: 'article', title: 'Data Types Deep Dive', url: '#' },
        { type: 'playground', title: 'Variable Practice Sandbox', url: '#' }
      ],
      reflectionPrompts: [
        'What\'s the difference between let and const?',
        'When would you use different data types?',
        'What errors did you encounter and how did you solve them?'
      ]
    },
    
    {
      id: 2,
      title: 'Arrays & Basic Operations',
      description: 'Learn to work with collections of data',
      phase: 'Fundamentals',
      requiredStreakDays: 4,
      estimatedTimePerDay: '20-25 minutes',
      prerequisites: [1],
      learningObjectives: [
        'Create and manipulate arrays',
        'Use common array methods (push, pop, slice)',
        'Access and modify array elements'
      ],
      dailyPractices: [
        {
          day: 1,
          task: 'Create an array of your favorite subjects and display them',
          hint: 'Use array literal notation []',
          expectedOutput: 'Array created and printed correctly'
        },
        {
          day: 2,
          task: 'Add and remove items from your subjects array',
          hint: 'Try push(), pop(), unshift(), shift()',
          expectedOutput: 'Successfully modify array contents'
        },
        {
          day: 3,
          task: 'Find specific subjects in your array and get their positions',
          hint: 'Use indexOf() and includes()',
          expectedOutput: 'Correctly locate items in array'
        },
        {
          day: 4,
          task: 'Create a new array with only subjects containing "Science"',
          hint: 'Use filter() method',
          expectedOutput: 'Filtered array with matching items'
        }
      ],
      resources: [
        { type: 'interactive', title: 'Array Methods Visualizer', url: '#' },
        { type: 'cheatsheet', title: 'Array Methods Reference', url: '#' },
        { type: 'quiz', title: 'Array Knowledge Check', url: '#' }
      ],
      reflectionPrompts: [
        'Which array methods modify the original array?',
        'When would you use filter() vs find()?',
        'What real-world scenarios would need arrays?'
      ]
    },

    {
      id: 3,
      title: 'String Manipulation',
      description: 'Master working with text data',
      phase: 'Fundamentals',
      requiredStreakDays: 3,
      estimatedTimePerDay: '15-20 minutes',
      prerequisites: [1],
      learningObjectives: [
        'Use string methods for common operations',
        'Practice string concatenation and template literals',
        'Handle string searching and replacement'
      ],
      dailyPractices: [
        {
          day: 1,
          task: 'Create a function that formats a full name from first and last name',
          hint: 'Use template literals and string methods',
          expectedOutput: 'Properly formatted full name output'
        },
        {
          day: 2,
          task: 'Build a simple text analyzer (count words, characters, vowels)',
          hint: 'Use split(), length, replace() with regex',
          expectedOutput: 'Accurate text statistics'
        },
        {
          day: 3,
          task: 'Create a function that reverses words in a sentence',
          hint: 'Combine split(), reverse(), join()',
          expectedOutput: 'Sentence with reversed word order'
        }
      ],
      resources: [
        { type: 'reference', title: 'String Methods Cheat Sheet', url: '#' },
        { type: 'exercise', title: 'String Manipulation Challenges', url: '#' }
      ]
    },

    {
      id: 4,
      title: 'Conditional Logic',
      description: 'Make decisions in your code',
      phase: 'Fundamentals',
      requiredStreakDays: 4,
      estimatedTimePerDay: '20-25 minutes',
      prerequisites: [1, 3],
      learningObjectives: [
        'Write effective if/else statements',
        'Use comparison and logical operators',
        'Implement switch statements for multiple conditions'
      ],
      dailyPractices: [
        {
          day: 1,
          task: 'Create a grade calculator that assigns letter grades',
          hint: 'Use if/else if chains with proper ranges',
          expectedOutput: 'Correct letter grade for any numeric input'
        },
        {
          day: 2,
          task: 'Build a simple chatbot that responds to different greetings',
          hint: 'Use toLowerCase() and multiple conditions',
          expectedOutput: 'Appropriate responses to various inputs'
        },
        {
          day: 3,
          task: 'Write a function that validates user input (age, email format)',
          hint: 'Combine multiple logical operators',
          expectedOutput: 'Proper validation with helpful error messages'
        },
        {
          day: 4,
          task: 'Create a menu system using switch statements',
          hint: 'Include default case and break statements',
          expectedOutput: 'Working menu with all options functional'
        }
      ]
    },

    {
      id: 5,
      title: 'Loops & Iteration',
      description: 'Automate repetitive tasks efficiently',
      phase: 'Fundamentals',
      requiredStreakDays: 4,
      estimatedTimePerDay: '25-30 minutes',
      prerequisites: [2, 4],
      learningObjectives: [
        'Use for loops for counting and iteration',
        'Apply while loops for condition-based repetition',
        'Iterate through arrays and objects effectively'
      ],
      dailyPractices: [
        {
          day: 1,
          task: 'Create a multiplication table generator using nested for loops',
          hint: 'Use two loops: one for numbers, one for multipliers',
          expectedOutput: 'Complete multiplication table display'
        },
        {
          day: 2,
          task: 'Build a number guessing game with a while loop',
          hint: 'Continue until correct guess or max attempts',
          expectedOutput: 'Functional guessing game with feedback'
        },
        {
          day: 3,
          task: 'Process an array of student grades to find average and highest',
          hint: 'Use for...of loop or traditional for loop',
          expectedOutput: 'Correct calculations from array data'
        },
        {
          day: 4,
          task: 'Create a pattern printer (stars, numbers) using loops',
          hint: 'Nested loops for rows and columns',
          expectedOutput: 'Various patterns printed correctly'
        }
      ]
    },

    {
      id: 6,
      title: 'Functions & Parameters',
      description: 'Create reusable code blocks',
      phase: 'Fundamentals',
      requiredStreakDays: 5,
      estimatedTimePerDay: '25-30 minutes',
      prerequisites: [1, 4, 5],
      learningObjectives: [
        'Write functions with parameters and return values',
        'Understand function scope and variable access',
        'Use arrow functions and function expressions'
      ],
      dailyPractices: [
        {
          day: 1,
          task: 'Create utility functions for common math operations',
          hint: 'Functions for add, subtract, multiply, divide with parameters',
          expectedOutput: 'Working calculator functions'
        },
        {
          day: 2,
          task: 'Build functions that validate and format user data',
          hint: 'Functions for email validation, phone formatting, etc.',
          expectedOutput: 'Proper validation and formatting results'
        },
        {
          day: 3,
          task: 'Write higher-order functions that accept other functions',
          hint: 'Create a function that applies operation to array elements',
          expectedOutput: 'Functional programming concepts working'
        },
        {
          day: 4,
          task: 'Convert existing code into reusable function modules',
          hint: 'Take previous day\'s work and make it modular',
          expectedOutput: 'Clean, reusable function structure'
        },
        {
          day: 5,
          task: 'Create a mini-library of your most useful functions',
          hint: 'Organize functions into categories with documentation',
          expectedOutput: 'Well-documented function collection'
        }
      ]
    },

    // PHASE 2: INTERMEDIATE CONCEPTS (Steps 7-14)
    {
      id: 7,
      title: 'Objects & Properties',
      description: 'Work with structured data using objects',
      phase: 'Intermediate Concepts',
      requiredStreakDays: 4,
      estimatedTimePerDay: '25-30 minutes',
      prerequisites: [6],
      learningObjectives: [
        'Create and manipulate object properties',
        'Use object methods and this keyword',
        'Understand object references and copying'
      ],
      dailyPractices: [
        {
          day: 1,
          task: 'Create a student profile object with properties and methods',
          hint: 'Include name, grades, calculateGPA method',
          expectedOutput: 'Functional student object with working methods'
        },
        {
          day: 2,
          task: 'Build a simple inventory system with objects',
          hint: 'Objects for items with quantity, price, updateStock methods',
          expectedOutput: 'Working inventory with proper updates'
        },
        {
          day: 3,
          task: 'Create nested objects representing a course structure',
          hint: 'Course -> modules -> lessons with appropriate nesting',
          expectedOutput: 'Complex nested object structure'
        },
        {
          day: 4,
          task: 'Implement object comparison and merging functions',
          hint: 'Deep vs shallow comparison, Object.assign, spread operator',
          expectedOutput: 'Correct object operations and comparisons'
        }
      ]
    },

    {
      id: 8,
      title: 'Array Methods Deep Dive',
      description: 'Master advanced array manipulation techniques',
      phase: 'Intermediate Concepts',
      requiredStreakDays: 5,
      estimatedTimePerDay: '30-35 minutes',
      prerequisites: [2, 6, 7],
      learningObjectives: [
        'Use map, filter, reduce for data transformation',
        'Chain array methods for complex operations',
        'Apply functional programming principles'
      ],
      dailyPractices: [
        {
          day: 1,
          task: 'Transform student data using map and filter methods',
          hint: 'Convert grades, filter passing students, format names',
          expectedOutput: 'Properly transformed data arrays'
        },
        {
          day: 2,
          task: 'Use reduce to calculate statistics from data arrays',
          hint: 'Sum, average, max, min using reduce method',
          expectedOutput: 'Correct statistical calculations'
        },
        {
          day: 3,
          task: 'Chain multiple array methods to solve complex problems',
          hint: 'filter().map().reduce() chains for data processing',
          expectedOutput: 'Complex data transformations working'
        },
        {
          day: 4,
          task: 'Implement custom array methods using functions',
          hint: 'Create your own map, filter implementations',
          expectedOutput: 'Understanding of method internals'
        },
        {
          day: 5,
          task: 'Build a data analysis dashboard with array methods',
          hint: 'Process and display various data metrics',
          expectedOutput: 'Functional data analysis system'
        }
      ]
    },

    // Continue with more intermediate and advanced steps...
    {
      id: 9,
      title: 'Error Handling',
      description: 'Handle and prevent errors gracefully',
      phase: 'Intermediate Concepts',
      requiredStreakDays: 3,
      estimatedTimePerDay: '20-25 minutes',
      prerequisites: [6, 8],
      learningObjectives: [
        'Use try-catch blocks effectively',
        'Create custom error types',
        'Implement defensive programming practices'
      ]
    },

    {
      id: 10,
      title: 'DOM Manipulation Basics',
      description: 'Interact with web page elements',
      phase: 'Web Development',
      requiredStreakDays: 5,
      estimatedTimePerDay: '30-40 minutes',
      prerequisites: [7, 9],
      learningObjectives: [
        'Select and modify HTML elements',
        'Handle user events and interactions',
        'Create dynamic web content'
      ]
    },

    // Add more steps up to 24 total...
    // This structure continues with:
    // - Event Handling (Step 11)
    // - Asynchronous Programming (Step 12)
    // - API Integration (Step 13)
    // - Local Storage (Step 14)
    // - Project Architecture (Step 15-18)
    // - Advanced Patterns (Step 19-22)
    // - Capstone Project (Step 23-24)
  ],

  // Skill Track Metadata
  badges: [
    { id: 'fundamentals-master', name: 'Fundamentals Master', requiredSteps: [1,2,3,4,5,6], icon: '🎯' },
    { id: 'array-wizard', name: 'Array Wizard', requiredSteps: [2,8], icon: '🧙‍♂️' },
    { id: 'function-guru', name: 'Function Guru', requiredSteps: [6,8,9], icon: '⚡' },
    { id: 'web-developer', name: 'Web Developer', requiredSteps: [10,11,12], icon: '🌐' },
    { id: 'full-stack-foundation', name: 'Full Stack Foundation', requiredSteps: [1,2,3,4,5,6,7,8,9,10,11,12,13,14], icon: '🏗️' }
  ],

  // Progress Tracking Schema
  userProgressSchema: {
    trackId: 'coding-fundamentals',
    userId: 'user123',
    currentStep: 1,
    completedSteps: [],
    stepProgress: {
      // stepId: { 
      //   currentDay: 1, 
      //   streak: 2, 
      //   completed: false, 
      //   lastPracticed: '2025-01-15',
      //   reflections: ['text1', 'text2'],
      //   evidence: [{ type: 'link', url: 'github.com/...' }]
      // }
    },
    badges: [],
    startedAt: '2025-01-10',
    lastActiveAt: '2025-01-15'
  },

  // Achievement System
  achievements: [
    { id: 'first-step', name: 'First Steps', description: 'Complete your first coding step', icon: '👶', points: 10 },
    { id: 'streak-3', name: '3-Day Streak', description: 'Practice for 3 consecutive days', icon: '🔥', points: 25 },
    { id: 'streak-7', name: '7-Day Streak', description: 'Practice for 7 consecutive days', icon: '🚀', points: 50 },
    { id: 'helper', name: 'Community Helper', description: 'Help another student with their code', icon: '🤝', points: 30 },
    { id: 'perfectionist', name: 'Perfectionist', description: 'Complete a step with all reflections filled', icon: '💎', points: 40 }
  ]
};

// Export for use in your application
export default codingTrackData;

// Additional helper functions for implementation
export const trackHelpers = {
  // Check if user can access a specific step
  canAccessStep: (stepId, userProgress) => {
    const step = codingTrackData.steps.find(s => s.id === stepId);
    if (!step.prerequisites) return true;
    
    return step.prerequisites.every(prereqId => 
      userProgress.completedSteps.includes(prereqId)
    );
  },

  // Get user's next available step
  getNextStep: (userProgress) => {
    return codingTrackData.steps.find(step => 
      !userProgress.completedSteps.includes(step.id) &&
      trackHelpers.canAccessStep(step.id, userProgress)
    );
  },

  // Calculate overall progress percentage
  getProgressPercentage: (userProgress) => {
    return Math.round((userProgress.completedSteps.length / codingTrackData.totalSteps) * 100);
  },

  // Check if user earned any new badges
  checkNewBadges: (userProgress) => {
    return codingTrackData.badges.filter(badge => 
      !userProgress.badges.includes(badge.id) &&
      badge.requiredSteps.every(stepId => userProgress.completedSteps.includes(stepId))
    );
  }
}; 
window.decisionTour = new DecisionTour({
  "theme": "onway",
  "width": 390,
  "height": 844,
  "pages": [
    {
      "id": "dashboard",
      "image": "images/dashboard.png",
      "alt": "Pre-flight checklist",
      "height": 844,
      "notes": [
        {
          "title": "Process card",
          "text": "Travelers can quickly see what still needs attention",
          "x": 0.8974358974358975,
          "y": 0.36018957345971564
        },
        {
          "title": "Checklist",
          "text": "Category  a complex process into four parts of the trips",
          "x": 0.76,
          "y": 0.47
        }
      ],
      "hotspots": [
        {
          "label": "Open travel document checklist",
          "rect": [
            38,
            467,
            314,
            88
          ],
          "next": "travelers"
        }
      ]
    },
    {
      "id": "travelers",
      "image": "images/travelers.png",
      "alt": "Group checklist",
      "height": 844,
      "notes": [
        {
          "title": "Organized by travelers",
          "text": "Each person has their own checklist that individual and group upload documents easier.",
          "x": 0.04358974358974359,
          "y": 0.49881516587677727
        },
        {
          "title": "Individual process bar",
          "text": "Group or main traveler can see who still need attention at a glance",
          "x": 0.9051282051282051,
          "y": 0.20734597156398105
        }
      ],
      "hotspots": [
        {
          "label": "Open Catherine’s checklist",
          "rect": [
            16,
            136,
            358,
            108
          ],
          "next": "citizenship"
        }
      ]
    },
    {
      "id": "citizenship",
      "image": "images/citizenship.png",
      "alt": "Citizenship",
      "height": 812,
      "notes": [
        {
          "title": "Clear task length",
          "text": "Traveler always know where they are in the task and how many steps left in that part",
          "x": 0.05897435897435897,
          "y": 0.1440886699507389
        },
        {
          "title": "Hamburger menu ",
          "text": "Back to main page if user want to work on other step",
          "x": 0.958974358974359,
          "y": 0.09729064039408868
        }
      ],
      "hotspots": [
        {
          "label": "Open hamburger menu",
          "rect": [
            342,
            68,
            32,
            31
          ],
          "next": "menu"
        }
      ]
    },
    {
      "id": "menu",
      "image": "images/menu.png",
      "alt": "Navigation menu",
      "height": 844,
      "notes": [
        {
          "title": "Return to the main checklist",
          "text": "Travelers can return to the main page to work on another preparation task.",
          "x": 0.65,
          "y": 0.24
        }
      ],
      "hotspots": [
        {
          "label": "Return to checklist",
          "rect": [
            113.88,
            180.616,
            272.22,
            46.42
          ],
          "next": "home"
        }
      ]
    },
    {
      "id": "home",
      "image": "images/dashboard.png",
      "alt": "Pre-flight checklist",
      "height": 844,
      "notes": [
        {
          "title": "Continue with another preparation task",
          "text": "After reviewing documents, travelers can return to the checklist and prepare their baggage.",
          "x": 0.85,
          "y": 0.84
        }
      ],
      "hotspots": [
        {
          "label": "Open baggage",
          "rect": [
            38,
            667,
            314,
            88
          ],
          "next": "bagEntry"
        }
      ]
    },
    {
      "id": "bagEntry",
      "image": "images/baggage-empty.png",
      "alt": "Baggage details",
      "height": 812,
      "notes": [
        {
          "title": "Share baggage details in advance",
          "text": "Let travelers provide baggage weights to the airline before arrival, reducing information entry at the check-in counter.",
          "x": 0.85,
          "y": 0.4
        }
      ],
      "hotspots": [],
      "guidance": "Use the right arrow below to continue the baggage flow"
    },
    {
      "id": "bagOverweight",
      "image": "images/baggage-five.png",
      "alt": "Overweight feedback",
      "height": 812,
      "notes": [
        {
          "title": "Share details in advance",
          "text": "Travelers provide detail information to the airline before check-in, reducing information entry at the check-in counter.",
          "x": 0.9333333333333333,
          "y": 0.4630541871921182
        }
      ],
      "hotspots": [],
      "guidance": "Use the right arrow below to continue the baggage flow"
    },
    {
      "id": "bagExtra",
      "image": "images/baggage-six.png",
      "alt": "Additional-bag feedback",
      "height": 812,
      "notes": [
        {
          "title": "Identify potential issues early",
          "text": "Show relevant requirements and reminders within each task, helping travelers address potential problems before reaching the airport.",
          "x": 0.05384615384615385,
          "y": 0.7278325123152709
        }
      ],
      "hotspots": [],
      "guidance": "Use the right arrow below to continue the baggage flow"
    },
    {
      "id": "bagDanger",
      "image": "images/baggage-dangerous.png",
      "alt": "Dangerous goods",
      "height": 812,
      "notes": [
        {
          "title": "Arrive prepared and confident",
          "text": "Help travelers complete preparation in advance, leaving fewer tasks to handle at the airport and reducing uncertainty on travel day.",
          "x": 0.046153846153846156,
          "y": 0.35344827586206895
        }
      ],
      "hotspots": [],
      "guidance": "Use the right arrow below to continue the baggage flow"
    },
    {
      "id": "bagCarry",
      "image": "images/baggage-carry-on.png",
      "alt": "Carry-on allowance",
      "height": 812,
      "notes": [
        {
          "title": "Preview the check-in process",
          "text": "Guide travelers through preparation tasks step by step, with airline rules explained upfront so they know what to expect and how to meet the requirements during check-in.",
          "x": 0.046153846153846156,
          "y": 0.3103448275862069
        }
      ],
      "hotspots": [],
      "guidance": "Use the right arrow below to continue the baggage flow"
    },
    {
      "id": "complete",
      "image": "images/dashboard.png",
      "alt": "Pre-flight checklist",
      "height": 844,
      "notes": [],
      "hotspots": [],
      "context": "Both preparation flows are complete. Use the left arrow to revisit a screen or restart the walkthrough."
    }
  ]
});

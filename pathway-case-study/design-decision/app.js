window.decisionTour = new DecisionTour({
  "theme": "pathway",
  "width": 1280,
  "height": 799,
  "pages": [
    {
      "id": "home",
      "image": "images/home.png",
      "alt": "Pathway Job Center home screen",
      "height": 799,
      "notes": [
        {
          "title": "Large buttons and clear hierarchy",
          "text": "Make key actions easy to identify and reduce cognitive load.",
          "x": 0.169921875,
          "y": 0.918648310387985
        },
        {
          "title": "Visible language selection",
          "text": "helps users access the service in a more familiar language.",
          "x": 0.71015625,
          "y": 0.16645807259073842
        },
        {
          "title": "Warm colors, clear spacing, and familiar imagery",
          "text": "Create a more approachable experience for first-time or low-digital-literacy users.",
          "x": 0.8453125,
          "y": 0.7596996245306633
        }
      ],
      "hotspots": [
        {
          "label": "Sign in",
          "rect": [
            1090.0977416531086,
            50.1676754734247,
            121.65212414729673,
            53.666604497734426
          ],
          "next": "signin",
          "radius": 12
        },
        {
          "label": "Check In",
          "rect": [
            67.70900490285838,
            614.3642947340736,
            299.6773456161268,
            119.64469890823842
          ],
          "next": "signin",
          "radius": 20
        }
      ],
      "scroll": false
    },
    {
      "id": "signin",
      "image": "images/signin.png",
      "alt": "Sign in with a phone number or Member ID",
      "height": 799,
      "notes": [
        {
          "title": "Simple sign-in with a phone number or Member ID",
          "text": "lowers the barrier for users who may struggle with traditional account systems.",
          "x": 0.72734375,
          "y": 0.5256570713391739
        }
      ],
      "hotspots": [
        {
          "label": "Fill the phone or membership number",
          "rect": [
            379,
            406,
            522,
            56
          ],
          "next": "signinFilled",
          "radius": 12
        }
      ],
      "scroll": false
    },
    {
      "id": "signinFilled",
      "image": "images/signin-filled.png",
      "alt": "Sign-in form with an example phone number",
      "height": 799,
      "notes": [
        {
          "title": "Simple sign-in with a phone number or Member ID",
          "text": "lowers the barrier for users who may struggle with traditional account systems.",
          "x": 0.72734375,
          "y": 0.5256570713391739
        }
      ],
      "hotspots": [
        {
          "label": "Sign in",
          "rect": [
            378.1249383660883,
            486.62764912575517,
            251.44766743670053,
            53.666604497734426
          ],
          "next": "signedHome",
          "radius": 12
        }
      ],
      "scroll": false
    },
    {
      "id": "signedHome",
      "image": "images/signed-home.png",
      "alt": "Signed-in Pathway home screen",
      "height": 799,
      "notes": [],
      "hotspots": [],
      "guidance": "Use the right arrow below to start the next flow",
      "scroll": false
    },
    {
      "id": "jobHome",
      "image": "images/signed-home.png",
      "alt": "Signed-in home screen, Find Jobs",
      "height": 799,
      "notes": [],
      "hotspots": [
        {
          "label": "Find Jobs",
          "rect": [
            230.99275838182388,
            467.2416910180932,
            299.6773456161268,
            119.64469890823842
          ],
          "next": "jobCategories",
          "radius": 20
        }
      ],
      "scroll": false
    },
    {
      "id": "jobCategories",
      "image": "images/job-categories.png",
      "alt": "Choose a job category",
      "height": 799,
      "notes": [
        {
          "title": "Step-by-step job search",
          "text": "Reduce information overload by showing only what users need at each stage.",
          "x": 0.5,
          "y": 0.8811013767209012
        }
      ],
      "hotspots": [
        {
          "label": "Hospitality",
          "rect": [
            74.55723375953848,
            330.03411607678174,
            262.8494118624789,
            349.1351802029912
          ],
          "next": "hospitality",
          "radius": 20
        }
      ],
      "scroll": false
    },
    {
      "id": "hospitality",
      "image": "images/hospitality.png",
      "alt": "Hospitality job opportunities",
      "height": 1072,
      "notes": [
        {
          "title": "Category-based browsing",
          "text": "Helps users find jobs without needing to know specific job titles or search terms.",
          "x": 0.5,
          "y": 0.6940298507462687
        }
      ],
      "hotspots": [
        {
          "label": "Janitor at Summer Hotel",
          "rect": [
            446.82508703635295,
            337.37791681716504,
            384.71580501263276,
            153.91936013063332
          ],
          "next": "job",
          "radius": 12
        }
      ],
      "scroll": false
    },
    {
      "id": "job",
      "image": "images/job.png",
      "alt": "Janitor job details",
      "height": 799,
      "notes": [
        {
          "title": "Saved activity",
          "text": "Allows advisors to understand user interests and provide more relevant follow-up support.",
          "x": 0.83203125,
          "y": 0.11639549436795996
        }
      ],
      "hotspots": [
        {
          "label": "Save this job",
          "rect": [
            1032.6724518538576,
            22.09484499853193,
            65.83684445331326,
            65.83684445331326
          ],
          "next": "jobLiked",
          "radius": 12
        }
      ],
      "scroll": false
    },
    {
      "id": "jobLiked",
      "image": "images/job-liked.png",
      "alt": "Saved Janitor job",
      "height": 799,
      "notes": [
        {
          "title": "Saved activity",
          "text": "Allows advisors to understand user interests and provide more relevant follow-up support.",
          "x": 0.73671875,
          "y": 0.14017521902377972
        }
      ],
      "hotspots": [
        {
          "label": "I'm Interested",
          "rect": [
            864.2438482392498,
            28.386453261197644,
            156.33497380530216,
            54.020926424246795
          ],
          "next": "jobContact",
          "radius": 8
        }
      ],
      "scroll": false
    },
    {
      "id": "jobContact",
      "image": "images/job-contact.png",
      "alt": "Job interest recorded",
      "height": 799,
      "notes": [
        {
          "title": "Navigation between jobs",
          "text": "Lets users compare opportunities without returning to the main list.",
          "x": 0.9484375,
          "y": 0.5256570713391739
        }
      ],
      "hotspots": [
        {
          "label": "Next job",
          "rect": [
            1214.037396886774,
            342.0008603313231,
            65.96253297454231,
            153.91936013063332
          ],
          "next": "host",
          "radius": 12
        }
      ],
      "scroll": false
    },
    {
      "id": "host",
      "image": "images/host.png",
      "alt": "Host job at House of Nanking",
      "height": 799,
      "notes": [],
      "hotspots": [],
      "guidance": "Use the right arrow below to start the next flow",
      "scroll": false
    },
    {
      "id": "custodial",
      "image": "images/custodial.png",
      "alt": "Custodial Training program",
      "height": 799,
      "notes": [
        {
          "title": "Carousel",
          "text": "Lets users explore programs one at a time without feeling overwhelmed. Navigation controls make it easy to move between different options.",
          "x": 0.5,
          "y": 0.9599499374217773
        },
        {
          "title": "Large images and clear summary",
          "text": "Help users quickly understand what each program offers.",
          "x": 0.853125,
          "y": 0.7759699624530664
        }
      ],
      "hotspots": [],
      "scroll": false,
      "autoNext": "appliance"
    },
    {
      "id": "appliance",
      "image": "images/appliance.png",
      "alt": "Appliance Repairing program",
      "height": 799,
      "notes": [
        {
          "title": "Carousel",
          "text": "Lets users explore programs one at a time without feeling overwhelmed. Navigation controls make it easy to move between different options.",
          "x": 0.5,
          "y": 0.9599499374217773
        },
        {
          "title": "Large images and clear summary",
          "text": "Help users quickly understand what each program offers.",
          "x": 0.853125,
          "y": 0.7759699624530664
        }
      ],
      "hotspots": [],
      "scroll": false,
      "autoNext": "english"
    },
    {
      "id": "english",
      "image": "images/english.png",
      "alt": "English Class program",
      "height": 799,
      "notes": [
        {
          "title": "Carousel",
          "text": "Lets users explore programs one at a time without feeling overwhelmed. Navigation controls make it easy to move between different options.",
          "x": 0.5,
          "y": 0.9599499374217773
        },
        {
          "title": "Large images and clear summary",
          "text": "Help users quickly understand what each program offers.",
          "x": 0.853125,
          "y": 0.7759699624530664
        }
      ],
      "hotspots": [
        {
          "label": "Custodial",
          "rect": [
            231,
            698,
            200.097,
            60.714
          ],
          "next": "custodialSelected",
          "radius": 30
        }
      ],
      "guidance": "Carousel paused. Click Custodial or use the right arrow to continue",
      "scroll": false
    },
    {
      "id": "custodialSelected",
      "image": "images/custodial.png",
      "alt": "Custodial Training program, Learn more",
      "height": 799,
      "notes": [
        {
          "title": "Learn More actions",
          "text": "let users explore additional details only when they are interested.",
          "x": 0.1578125,
          "y": 0.7596996245306633
        }
      ],
      "hotspots": [
        {
          "label": "Learn more",
          "rect": [
            175.161,
            549.603,
            200.097,
            70.32
          ],
          "next": "detail",
          "radius": 16
        }
      ],
      "scroll": false
    },
    {
      "id": "detail",
      "image": "images/program-detail.png",
      "alt": "Custodial program details, overview, eligibility, careers and support services",
      "height": 3231,
      "notes": [],
      "hotspots": [],
      "scroll": true
    }
  ]
});

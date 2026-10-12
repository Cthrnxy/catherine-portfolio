window.decisionTour = new DecisionTour({
  "theme": "relo",
  "width": 390,
  "height": 844,
  "pages": [
    {
      "id": "current",
      "image": "images/current.png",
      "alt": "Relo — current",
      "height": 844,
      "notes": [
        {
          "title": "Current / Next Unit cards",
          "text": "Separates where users are moving from and where they are moving to.Different colors and illustrations make each location easy to recognize.",
          "anchors": [
            [
              0.9256410256410257,
              0.17890995260663506
            ]
          ]
        }
      ],
      "hotspots": [
        {
          "label": "Switch to Next Unit",
          "rect": [
            130,
            686,
            131,
            40
          ],
          "next": "next"
        }
      ]
    },
    {
      "id": "next",
      "image": "images/next.png",
      "alt": "Relo — next",
      "height": 844,
      "notes": [
        {
          "title": "Current / Next Unit cards",
          "text": "Separates where users are moving from and where they are moving to.Different colors and illustrations make each location easy to recognize.",
          "anchors": [
            [
              0.9128205128205128,
              0.16646919431279622
            ]
          ]
        }
      ],
      "hotspots": [
        {
          "label": "Switch to Current Unit",
          "rect": [
            130,
            686,
            131,
            40
          ],
          "next": "currentReturn"
        }
      ]
    },
    {
      "id": "currentReturn",
      "image": "images/current.png",
      "alt": "Relo — current Return",
      "height": 844,
      "notes": [],
      "hotspots": [
        {
          "label": "Open Explore",
          "rect": [
            23.297,
            747.223,
            74,
            74
          ],
          "next": "exploreCurrent"
        }
      ]
    },
    {
      "id": "exploreCurrent",
      "image": "images/explore-current.png",
      "alt": "Relo — explore Current",
      "height": 844,
      "notes": [
        {
          "title": "Current / Next switch",
          "text": "Uses a consistent position and visual state across Home and Explore, making the current location easy to identify.",
          "anchors": [
            [
              0.6743589743589744,
              0.8436018957345972
            ]
          ]
        }
      ],
      "hotspots": [
        {
          "label": "Switch to Next Unit",
          "rect": [
            129.5,
            690,
            131,
            40
          ],
          "next": "exploreNext"
        }
      ]
    },
    {
      "id": "exploreNext",
      "image": "images/explore-next.png",
      "alt": "Relo — explore Next",
      "height": 844,
      "notes": [
        {
          "title": "Current / Next switch",
          "text": "Uses a consistent position and visual state across Home and Explore, making the current location easy to identify.",
          "anchors": [
            [
              0.7012820512820512,
              0.8376777251184834
            ]
          ]
        }
      ],
      "hotspots": [
        {
          "label": "Return to Home",
          "rect": [
            109,
            748,
            74,
            74
          ],
          "next": "currentFinal"
        }
      ]
    },
    {
      "id": "currentFinal",
      "image": "images/current.png",
      "alt": "Relo — current Final",
      "height": 844,
      "notes": [],
      "hotspots": [],
      "context": "The location flow is complete. Use the right arrow to explore the approval process."
    },
    {
      "id": "enroll",
      "image": "images/enroll.png",
      "alt": "Relo — enroll",
      "height": 844,
      "notes": [
        {
          "title": "Be Approved process",
          "text": "Users confirm approval from a landlord or property manager without requiring that third party to join the app. The response then determines the next flow: approved units unlock direct transfer, while unapproved units continue through the marketplace flow.",
          "anchors": [
            [
              0.017948717948717947,
              0.3696682464454976
            ],
            [
              0.017948717948717947,
              0.7085308056872038
            ]
          ]
        }
      ],
      "hotspots": [
        {
          "label": "Confirm current unit approval",
          "rect": [
            23,
            304,
            20,
            20
          ],
          "next": "enrollCurrent"
        }
      ]
    },
    {
      "id": "enrollCurrent",
      "image": "images/enroll-current.png",
      "alt": "Relo — enroll Current",
      "height": 844,
      "notes": [
        {
          "title": "Be Approved process",
          "text": "Users confirm approval from a landlord or property manager without requiring that third party to join the app. The response then determines the next flow: approved units unlock direct transfer, while unapproved units continue through the marketplace flow.",
          "anchors": [
            [
              0.017948717948717947,
              0.3696682464454976
            ],
            [
              0.017948717948717947,
              0.7085308056872038
            ]
          ]
        }
      ],
      "hotspots": [
        {
          "label": "Confirm next unit approval",
          "rect": [
            23,
            598,
            20,
            20
          ],
          "next": "enrollApproved"
        }
      ]
    },
    {
      "id": "enrollApproved",
      "image": "images/enroll-approved.png",
      "alt": "Relo — enroll Approved",
      "height": 844,
      "notes": [
        {
          "title": "Be Approved process",
          "text": "Users confirm approval from a landlord or property manager without requiring that third party to join the app. The response then determines the next flow: approved units unlock direct transfer, while unapproved units continue through the marketplace flow.",
          "anchors": [
            [
              0.017948717948717947,
              0.3696682464454976
            ],
            [
              0.017948717948717947,
              0.7085308056872038
            ]
          ]
        }
      ],
      "hotspots": [
        {
          "label": "Save approved units",
          "rect": [
            21,
            751,
            347,
            42
          ],
          "next": "empty"
        }
      ]
    },
    {
      "id": "empty",
      "image": "images/current-empty.png",
      "alt": "Relo — empty",
      "height": 844,
      "notes": [],
      "hotspots": [],
      "context": "The approval flow is complete. The saved unit is ready for furniture transfers."
    }
  ]
});

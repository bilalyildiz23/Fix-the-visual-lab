import type { Level } from "./types";

export const LEVELS: Level[] = [
  {
    id: "dramatic-improvement",
    title: "The Dramatic Improvement",
    category: "Trust Check",
    theme: "Festival satisfaction",
    goal: "Show the improvement honestly.",
    prompt: "Does the design make the improvement feel bigger than it is?",
    context:
      "The festival team wants to show that students are happier this year. Not every visual in this game is completely wrong. Sometimes the data is correct, but the design creates the wrong story for the goal or audience.",
    presenterNote:
      "For this bar chart, the scale and colour make the change feel more dramatic than it is. The data stays the same, but the story feels different.",
    baseScores: { clarity: 48, trust: 34, audience: 66, message: 46 },
    completionFeedback:
      "For this bar chart, the scale and colour make the change feel more dramatic than it is. The data stays the same, but the story feels different.",
    spot: [
      {
        id: "scale-colour",
        label: "The scale and colour make the change feel dramatic",
        correct: true,
        message: "For this goal, this is a stronger choice.",
      },
      {
        id: "wrong-values",
        label: "The values are probably incorrect",
        correct: false,
        message: "The numbers can be correct, while the design still changes the story.",
      },
      {
        id: "too-simple",
        label: "The chart is too simple for students",
        correct: false,
        message: "Simple can be useful. The bigger issue here is scale and colour.",
      },
    ],
    actions: [
      {
        id: "axis-zero",
        label: "Start the y-axis at 0",
        correct: true,
        message: "This repair makes the size of the improvement easier to trust.",
        scoreDelta: { trust: 28, clarity: 12 },
      },
      {
        id: "positive-color",
        label: "Use a positive colour for the best score",
        correct: true,
        message: "The colour signal now fits the story better.",
        scoreDelta: { trust: 14, clarity: 14, message: 8 },
      },
      {
        id: "neutral-caption",
        label: "Add a neutral caption",
        correct: true,
        message: "A neutral caption helps the audience read the change calmly.",
        scoreDelta: { trust: 12, message: 12 },
      },
      {
        id: "celebrate",
        label: "Add celebration graphics",
        correct: false,
        message: "This could work in another context, but it adds emotion instead of fixing the main issue here.",
      },
      {
        id: "hide-axis",
        label: "Remove the axis",
        correct: false,
        message: "The axis gives useful evidence. Removing it makes the story harder to check.",
      },
      {
        id: "big-title",
        label: "Make the title huge",
        correct: false,
        message: "A bigger title may change attention, but it does not repair the scale or colour signal.",
      },
    ],
  },
  {
    id: "busy-dashboard",
    title: "The Busy Dashboard",
    category: "Clarity Check",
    theme: "Student life dashboard",
    goal: "Help the team find the main issue quickly.",
    prompt: "Where should the eye go first?",
    context:
      "A student support team opens this dashboard every morning. It has useful information, but the first version does not make the next step easy to find.",
    presenterNote:
      "The dashboard is not useless. It has useful information. But the first version does not guide the eye.",
    baseScores: { clarity: 30, trust: 56, audience: 42, message: 34 },
    completionFeedback:
      "The dashboard is not useless. It has useful information. But the first version does not guide the eye.",
    spot: [
      {
        id: "no-priority",
        label: "Everything looks equally important",
        correct: true,
        message: "For this goal, hierarchy is the strongest issue to repair.",
      },
      {
        id: "not-enough",
        label: "There is not enough information",
        correct: false,
        message: "The dashboard has enough information. The issue is that it does not guide the eye.",
      },
      {
        id: "wrong-chart",
        label: "The chart type is the main problem",
        correct: false,
        message: "The bigger issue is priority, not one chart type.",
      },
    ],
    choices: [
      {
        id: "priority",
        title: "Choose one main message",
        options: [
          {
            id: "attendance",
            label: "Main insight: Attendance dropped by 2.1 points",
            correct: true,
            message: "For this goal, this gives the team a clear first move.",
            scoreDelta: { clarity: 22, message: 20 },
          },
          {
            id: "green-points",
            label: "Green points reached 9,842",
            correct: false,
            message: "This is useful information, but it is not the strongest action signal here.",
          },
          {
            id: "app-opens",
            label: "App opens reached 31K",
            correct: false,
            message: "This may matter in another goal, but it does not help the team find the main issue quickly.",
          },
        ],
      },
    ],
    actions: [
      {
        id: "attendance-priority",
        label: "Choose one main message",
        correct: true,
        message: "Now the dashboard has a clear first place to look.",
        scoreDelta: { clarity: 22, message: 20 },
      },
      {
        id: "group-info",
        label: "Group supporting cards",
        correct: true,
        message: "Grouping helps the audience scan the dashboard faster.",
        scoreDelta: { clarity: 20, audience: 14 },
      },
      {
        id: "reduce-noise",
        label: "Turn down visual noise",
        correct: true,
        message: "This repair makes the main message easier to see.",
        scoreDelta: { clarity: 18, trust: 18 },
      },
      {
        id: "more-badges",
        label: "Add more badges",
        correct: false,
        message: "More badges may feel active, but they make the dashboard compete with itself.",
      },
      {
        id: "bigger-all",
        label: "Make every number bigger",
        correct: false,
        message: "If every number gets louder, the main message still has no clear place.",
      },
      {
        id: "more-colours",
        label: "Use more colours",
        correct: false,
        message: "More colour can add noise when the goal is quick focus.",
      },
    ],
  },
  {
    id: "expert-beginner",
    title: "The Wrong Audience View",
    category: "Audience Check",
    theme: "Student budget spending",
    goal: "Help a student understand where their monthly budget goes.",
    prompt: "Who is this made for?",
    context:
      "A monthly budget view can be correct but still hard to use. A student needs the main spending story first.",
    presenterNote:
      "The data was correct, but the first view did not fit the audience. A student needs the main spending story first.",
    baseScores: { clarity: 38, trust: 66, audience: 26, message: 34 },
    completionFeedback:
      "The data was correct, but the first view did not fit the audience. A student needs the main spending story first.",
    choices: [
      {
        id: "audience",
        title: "Choose the audience",
        options: [
          {
            id: "student",
            label: "Student",
            correct: true,
            message: "For this goal, the student needs the spending story first.",
            scoreDelta: { audience: 24 },
          },
          {
            id: "finance-office",
            label: "Finance office",
            correct: false,
            message: "A finance office may need a dense table, but that is not the goal here.",
          },
          {
            id: "data-analyst",
            label: "Data analyst",
            correct: false,
            message: "A data analyst may need detail, but a student needs the main takeaway first.",
          },
        ],
      },
      {
        id: "first-message",
        title: "Best first message",
        options: [
          {
            id: "rent",
            label: "Rent takes the biggest part of the budget",
            correct: true,
            message: "This gives the student the main spending story first.",
            scoreDelta: { clarity: 24, audience: 24, message: 18 },
          },
          {
            id: "ledger",
            label: "Expense ledger by monthly category",
            correct: false,
            message: "This is accurate, but it feels more like an admin view than a student view.",
          },
          {
            id: "total",
            label: "Total monthly spending is EUR 1,215",
            correct: false,
            message: "The total is useful, but it does not show where the money goes.",
          },
        ],
      },
    ],
    actions: [
      {
        id: "student-headline",
        label: "Add a student-friendly headline",
        correct: true,
        message: "This repair makes the main budget story clear for a student.",
        scoreDelta: { audience: 18, message: 14 },
      },
      {
        id: "highlight-rent",
        label: "Highlight the biggest spending category",
        correct: true,
        message: "Rent now stands out as the biggest part of the budget.",
        scoreDelta: { clarity: 18, message: 16 },
      },
      {
        id: "group-labels",
        label: "Use clearer labels and grouped categories",
        correct: true,
        message: "The labels now help the student compare spending areas faster.",
        scoreDelta: { clarity: 16, audience: 12 },
      },
      {
        id: "finance-terms",
        label: "Add more financial terms",
        correct: false,
        message: "This could fit a finance report, but it does not help a student understand the story quickly.",
      },
      {
        id: "bright-slices",
        label: "Make every slice a different bright colour",
        correct: false,
        message: "More colours can make the donut harder to read when every category competes.",
      },
      {
        id: "hide-amounts",
        label: "Hide the amounts",
        correct: false,
        message: "The amounts help the student judge where savings may be possible.",
      },
    ],
  },
  {
    id: "careful-title",
    title: "The Careful Title",
    category: "Story Check",
    theme: "Screen time and grades",
    goal: "Avoid overclaiming the story.",
    prompt: "What can this chart safely claim?",
    context:
      "A student magazine wants a strong headline. The data shows a clear relationship, but the title could still claim more than the data proves.",
    presenterNote:
      "The relationship is visible, but the title decides how strong the story feels. A fair title says linked, not caused.",
    baseScores: { clarity: 54, trust: 30, audience: 52, message: 30 },
    completionFeedback:
      "The relationship is visible, but the title decides how strong the story feels. A fair title says linked, not caused.",
    choices: [
      {
        id: "headline",
        title: "Choose the fairest headline",
        options: [
          {
            id: "destroying",
            label: "Phones are destroying grades",
            correct: false,
            message: "This headline is strong, but it claims more than the data proves.",
          },
          {
            id: "linked",
            label: "More screen time is linked to lower grades",
            correct: true,
            message: "For this goal, this headline is strong but still careful.",
            scoreDelta: { trust: 36, message: 30 },
          },
          {
            id: "causes-fail",
            label: "Screen time causes students to fail",
            correct: false,
            message: "Even a strong relationship does not prove that screen time is the cause.",
          },
        ],
      },
    ],
    actions: [
      {
        id: "careful-headline",
        label: "Use the careful headline",
        correct: true,
        message: "The title now says what the chart can safely claim.",
        scoreDelta: { trust: 22, message: 22 },
      },
      {
        id: "cause-note",
        label: "Add: this shows a relationship, not proof of cause and effect",
        correct: true,
        message: "This note keeps the strong pattern, but avoids overclaiming the cause.",
        scoreDelta: { trust: 26, audience: 12 },
      },
      {
        id: "red-warning",
        label: "Make the trend line red",
        correct: false,
        message: "Red makes the story feel more alarming than this goal needs.",
      },
      {
        id: "remove-dots",
        label: "Hide the data points",
        correct: false,
        message: "The points help the audience see the evidence behind the trend.",
      },
      {
        id: "warning-icon",
        label: "Use a dramatic warning icon",
        correct: false,
        message: "A warning icon adds drama, but it does not make the claim more fair.",
      },
    ],
  },
  {
    id: "missing-comparison",
    title: "The Missing Comparison",
    category: "Context Check",
    theme: "Student club popularity",
    goal: "Compare clubs fairly.",
    prompt: "Bigger total, or fairer comparison?",
    context:
      "The school wants to fund popular clubs. Raw members show which club is biggest. Percentage of capacity shows which club is most full.",
    presenterNote:
      "Raw totals are useful, but they answer a different question. For a fair comparison, capacity gives important context.",
    baseScores: { clarity: 44, trust: 38, audience: 50, message: 42 },
    completionFeedback:
      "Raw totals are useful, but they answer a different question. For a fair comparison, capacity gives important context.",
    choices: [
      {
        id: "view",
        title: "Choose the fairer view for this goal",
        options: [
          {
            id: "raw",
            label: "Show raw members",
            correct: false,
            message: "Raw members answer which club is biggest. This goal needs a fairer capacity comparison.",
          },
          {
            id: "capacity",
            label: "Show percentage of capacity",
            correct: true,
            message: "This compares clubs more fairly for this goal.",
            scoreDelta: { trust: 30, clarity: 18, message: 16 },
          },
          {
            id: "alphabet",
            label: "Sort alphabetically only",
            correct: false,
            message: "Sorting can help scanning, but it does not add the missing context.",
          },
        ],
      },
    ],
    actions: [
      {
        id: "add-capacity",
        label: "Add capacity context",
        correct: true,
        message: "The audience can now see how full each club is.",
        scoreDelta: { trust: 18, audience: 14 },
      },
      {
        id: "fair-note",
        label: "Add a fair comparison note",
        correct: true,
        message: "The note explains why the comparison changed.",
        scoreDelta: { clarity: 12, message: 12 },
      },
      {
        id: "hide-small",
        label: "Hide smaller clubs",
        correct: false,
        message: "Smaller clubs may be very full, so hiding them removes useful context.",
      },
      {
        id: "bright-biggest",
        label: "Make the biggest bar brighter",
        correct: false,
        message: "This makes the raw total stand out more, but it does not answer the fairness question.",
      },
      {
        id: "more-colours",
        label: "Use more colours",
        correct: false,
        message: "More colour does not add the missing comparison context.",
      },
    ],
  },
  {
    id: "audience-design",
    title: "Design for the Audience",
    category: "Audience Check",
    theme: "Cafeteria feedback",
    goal: "Help the cafeteria manager choose what to improve next month.",
    prompt: "Same data, different user.",
    context:
      "The same cafeteria survey goes to a manager, students and a data analyst. No version is always best. The best version depends on the goal and audience.",
    presenterNote:
      "No version is always best. For this goal, the manager needs the problem area and action priority first.",
    baseScores: { clarity: 46, trust: 60, audience: 30, message: 44 },
    completionFeedback:
      "No version is always best. For this goal, the manager needs the problem area and action priority first.",
    choices: [
      {
        id: "audience",
        title: "Choose audience",
        options: [
          {
            id: "manager",
            label: "Cafeteria manager",
            correct: true,
            message: "For this goal, the manager needs action priority.",
            scoreDelta: { audience: 18 },
          },
          {
            id: "students",
            label: "Students",
            correct: false,
            message: "Students may need a simple promise view, but that is not the goal of this level.",
          },
          {
            id: "analyst",
            label: "Data analyst",
            correct: false,
            message: "Analysts need detail and method, but the current goal is a manager decision.",
          },
        ],
      },
      {
        id: "version",
        title: "Best version for the selected goal",
        options: [
          {
            id: "priority",
            label: "Problem areas and action priority",
            correct: true,
            message: "This repair makes the next action clear for the manager.",
            scoreDelta: { clarity: 20, audience: 30, message: 18 },
          },
          {
            id: "poster",
            label: "Simple poster with what will improve",
            correct: false,
            message: "This could fit students, but it gives the manager less decision detail.",
          },
          {
            id: "raw-table",
            label: "Detailed analyst table as the main view",
            correct: false,
            message: "Useful for analysis, but slower for a manager choosing the next improvement.",
          },
        ],
      },
    ],
    actions: [
      {
        id: "manager-priority-board",
        label: "Show manager priority board",
        correct: true,
        message: "The manager can now see what to improve first.",
        scoreDelta: { clarity: 20, audience: 20, message: 16 },
      },
      {
        id: "show-sample",
        label: "Keep sample info in small text",
        correct: true,
        message: "Trust detail stays available without taking over the main message.",
        scoreDelta: { trust: 14 },
      },
      {
        id: "hide-waiting",
        label: "Hide waiting time",
        correct: false,
        message: "Waiting time is the main problem area for this goal.",
      },
      {
        id: "all-equal",
        label: "Make all topics equal",
        correct: false,
        message: "Equal emphasis hides the action priority the manager needs.",
      },
    ],
  },
  {
    id: "honest-ranking",
    title: "The Honest Ranking",
    category: "Trust Check",
    theme: "Student satisfaction ranking",
    goal: "Avoid making close results look like a clear winner.",
    prompt: "Winner, or basically close?",
    context:
      "The school wants to publish a ranking of campus services. The scores are close, so the design must avoid making the winner look too certain.",
    presenterNote:
      "Sometimes the honest story is not 'number one wins'. Sometimes the honest story is that the results are very close.",
    baseScores: { clarity: 50, trust: 34, audience: 52, message: 36 },
    completionFeedback:
      "Sometimes the honest story is not 'number one wins'. Sometimes the honest story is that the results are very close.",
    choices: [
      {
        id: "message",
        title: "Choose the more careful message",
        options: [
          {
            id: "clear-winner",
            label: "Library is the clear winner",
            correct: false,
            message: "The difference is small, so this message feels too certain.",
          },
          {
            id: "close",
            label: "The scores are close. The exact ranking may not be meaningful.",
            correct: true,
            message: "For this goal, this is a stronger and more careful choice.",
            scoreDelta: { trust: 32, message: 30 },
          },
          {
            id: "worst",
            label: "Study rooms are failing",
            correct: false,
            message: "This overstates a small gap.",
          },
        ],
      },
    ],
    actions: [
      {
        id: "uncertainty",
        label: "Add uncertainty ranges",
        correct: true,
        message: "The ranking now shows that the exact order is not certain.",
        scoreDelta: { clarity: 16, trust: 22 },
      },
      {
        id: "careful-message",
        label: "Add a careful message",
        correct: true,
        message: "This repair makes the story less overconfident.",
        scoreDelta: { trust: 16, message: 12 },
      },
      {
        id: "remove-winner",
        label: "Remove strong winner styling",
        correct: true,
        message: "The visual no longer pushes Library as a clear winner.",
        scoreDelta: { clarity: 10, message: 14 },
      },
      {
        id: "gold-medal",
        label: "Add a gold medal to Library",
        correct: false,
        message: "A medal makes the winner feel more certain than the data supports.",
      },
      {
        id: "sort-hard",
        label: "Use harsher rank colours",
        correct: false,
        message: "Harsh colours add drama without adding evidence.",
      },
      {
        id: "remove-percentages",
        label: "Remove the percentages",
        correct: false,
        message: "The percentages help the audience see how close the scores are.",
      },
    ],
  },
];

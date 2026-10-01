import { CopingStrategy } from '../types';

export const COPING_STRATEGIES: CopingStrategy[] = [
  // ACADEMIC
  {
    id: 'strat-academic-1',
    category: 'academic',
    title: 'The 5-Minute Micro-Action Blast',
    tagline: 'Defeat homework paralysis and task overwhelm',
    steps: [
      'Pick the one assignment giving you the greatest dread.',
      'Shrink the expectation to laughable size: promise yourself to work for ONLY 5 minutes or solve just 2 problems.',
      'Set a timer on your phone and put the phone across the room out of sight.',
      'When the 5-minute timer rings, give yourself full permission to stop. (Over 80% of the time, the momentum takes over and you continue comfortably!).'
    ],
    inSchoolTip: 'In class: When given a big worksheet, fold it in half so your eyes only see 3 questions instead of 20.',
    scienceExplanation: 'Overwhelm triggers an amygdala freeze response. Breaking tasks into non-threatening micro-units bypasses the panic circuit and stimulates dopamine upon completion.',
    timeEstimate: '5 mins',
    interactiveTool: 'reframing'
  },
  {
    id: 'strat-academic-2',
    category: 'academic',
    title: 'Worst / Best / Most Likely Reality Audit',
    tagline: 'Bust pre-exam doom spirals and worst-case scenarios',
    steps: [
      'Write down your absolute worst-case scenario: "What if I get a 0 and drop out?"',
      'Write down the fantasy best-case scenario: "What if I get 100% and a parade?"',
      'Identify the Realistic / Most Likely outcome: "I will probably score between 80% and 92%, which is completely workable."',
      'Develop a plan for the most likely: "What are 2 specific topics I can review right now?"'
    ],
    inSchoolTip: 'Mentally ask yourself: "Will this test score matter 3 years from today?" If no, bring the adrenaline down 3 notches.',
    scienceExplanation: 'Catastrophizing locks prefrontal cognitive synthesis. Generating the "realistic middle" restores neural equilibrium between fear and analytical thinking.',
    timeEstimate: '3-4 mins',
    interactiveTool: 'reframing'
  },

  // SOCIAL
  {
    id: 'strat-social-1',
    category: 'social',
    title: 'The Spotlight Buster & 3 Alternatives',
    tagline: 'Stop assuming peers are laughing at or scrutinizing you',
    steps: [
      'Notice when you assume a laugh, whisper, or glance was directed at you.',
      'Say to yourself: "That is the Spotlight Illusion—I am not the main character in their heads."',
      'Generate 3 realistic alternative reasons: 1) They saw a funny video, 2) They were talking about their own gossip, 3) Someone told a joke.',
      'Take a slow breath and return attention to your own lunch or conversation.'
    ],
    inSchoolTip: 'Look around the room: notice how many other kids are looking down at their phones or worrying about their own outfits. They are not thinking about you.',
    scienceExplanation: 'Adolescent egocentrism is a normal neurological stage where teens overestimate how much peers observe them. Active cognitive alternative-generation breaks this bias.',
    timeEstimate: '2 mins',
    interactiveTool: 'reframing'
  },
  {
    id: 'strat-social-2',
    category: 'social',
    title: 'The 45-Minute Low-Stakes Social Pass',
    tagline: 'Conquer party or hangout avoidance without burning out',
    steps: [
      'Agree to attend the social event, but set an internal "45-minute trial contract."',
      'Find an anchor person you know or an easy activity (petting the host\'s cat, getting a snack, listening to the music).',
      'Set an internal goal to ask 2 casual open-ended questions: "What music do you listen to?" or "Have you seen that movie?"',
      'When 45 minutes pass, if you are having fun, stay! If your social battery is empty, thank the host politely and leave with pride.'
    ],
    inSchoolTip: 'When entering a crowded hallway or group, count 3 friendly faces or find one person smiling.',
    scienceExplanation: 'Gradual behavioral exposure with a guaranteed exit route reduces threat anticipation and builds autonomous social confidence.',
    timeEstimate: 'Varies',
    interactiveTool: 'grounding'
  },

  // DIGITAL
  {
    id: 'strat-digital-1',
    category: 'digital',
    title: 'The Curated Highlight Reel Reality Check',
    tagline: 'Detox from social media comparison and feeling behind',
    steps: [
      'When an "aesthetic" post or story makes you feel bad, pause immediately.',
      'Say aloud or mentally: "I am comparing my full, unedited blooper reel to their 10-second studio highlights with good lighting and 30 rejected takes."',
      'Set an app timer for 20 minutes on Instagram/TikTok/Snapchat.',
      'Put your phone face down across the room and do one physical action (pet your dog, drink cold water, doodle).'
    ],
    inSchoolTip: 'Mute toxic accounts or stories that leave you feeling insecure without having to unfriend or create conflict.',
    scienceExplanation: 'Social media triggers algorithmic upward social comparison. Breaking the scrolling loop within 3 seconds halts dopamine depletion.',
    timeEstimate: '2 mins',
    interactiveTool: 'reframing'
  },
  {
    id: 'strat-digital-2',
    category: 'digital',
    title: 'The "Left on Read" Latency Buffer',
    tagline: 'Stop panicking when messages don\'t get immediate replies',
    steps: [
      'Acknowledge the impulse: "My brain wants a reply right now to feel validated."',
      'Remind yourself: "Their response time is about their schedule, their parents calling them, their homework, or their mood—not my worth."',
      'Resist sending follow-up question marks or anxious texts.',
      'Commit to a 2-hour latency buffer before even looking at the chat again.'
    ],
    inSchoolTip: 'Turn off read receipts and notification badges for non-urgent group chats so you control when you check them.',
    scienceExplanation: 'Instant messaging creates an artificial urgency illusion. Regulating distress tolerance builds adult-level emotional security.',
    timeEstimate: '1 min',
    interactiveTool: 'reframing'
  },

  // BODY IMAGE
  {
    id: 'strat-body-1',
    category: 'body_image',
    title: 'Body Neutrality & The Functionality Shift',
    tagline: 'Value what your body does over how it looks in mirrors',
    steps: [
      'Catch yourself criticizing a body feature in the mirror or photo.',
      'Step back 3 feet: mirror zoom exaggerates details no human eye sees in real life.',
      'Shift from appearance to functionality: "Thank you feet for letting me dance/skate; thank you lungs for breathing; thank you eyes for seeing art."',
      'Wear clothes that feel soft and comfortable today—clothes exist to serve your body, not the other way around.'
    ],
    inSchoolTip: 'If feeling self-conscious in class, discreetly place both feet flat on the floor, stretch your spine tall, and feel your physical strength.',
    scienceExplanation: 'Body neutrality replaces toxic positivity with biological appreciation, decreasing body dysmorphic self-surveillance.',
    timeEstimate: '3 mins',
    interactiveTool: 'reframing'
  },
  {
    id: 'strat-body-2',
    category: 'body_image',
    title: 'The Best Friend Voice Mirror',
    tagline: 'Quiet the vicious inner critic with self-compassion',
    steps: [
      'Notice the cruel sentence you just told yourself in your head.',
      'Ask: "Would I ever say these exact words to my best friend, little sibling, or someone I care about?"',
      'Notice how absurd and hurtful it sounds when applied to someone else.',
      'Translate it into what a loving friend would actually say: "You are growing, you are worthy, and one awkward day or bad photo doesn\'t change your light."'
    ],
    inSchoolTip: 'Put a gentle hand over your chest or clasp your hands together under the desk for a discreet calming hug.',
    scienceExplanation: 'Self-compassion releases oxytocin, reducing cortisol and down-regulating the threat-defense system.',
    timeEstimate: '2 mins',
    interactiveTool: 'reframing'
  },

  // FUTURE
  {
    id: 'strat-future-1',
    category: 'future',
    title: 'The Circle of Control Partition',
    tagline: 'Stop drowning in existential dread and future uncertainty',
    steps: [
      'Draw or imagine two circles: a large outer circle and a small inner circle.',
      'In the outer circle (Things I CANNOT Control): College admission algorithms, other people\'s grades, the future economy, what teachers assign.',
      'In the inner circle (Things I CAN Control): My study effort for today, how kindly I treat myself, when I go to bed, taking breaks.',
      'Consciously withdraw your mental energy from the outer circle and put 100% of it into one small action in the inner circle.'
    ],
    inSchoolTip: 'Keep an index card in your notebook with your 3 "Today Controls" (e.g., eat lunch, finish 1 worksheet, breathe).',
    scienceExplanation: 'Locus of control theory proves that shifting focus to internal, actionable variables radically reduces feelings of powerlessness.',
    timeEstimate: '3 mins',
    interactiveTool: 'reframing'
  },

  // PHYSICAL
  {
    id: 'strat-physical-1',
    category: 'physical',
    title: 'The Physiological Double-Sigh (Stanford Protocol)',
    tagline: 'Fastest biological brake for a pounding heart & racing panic',
    steps: [
      'Take a deep inhale through your nose filling your lungs ~80%.',
      'At the very top, take a second quick sharp "top-off" sniff through your nose to pop open collapsed alveoli air sacs.',
      'Open your mouth and do a long, slow, effortless sigh out until lungs are completely empty.',
      'Repeat 2 to 3 times in a row. Notice your heart rate dropping immediately.'
    ],
    inSchoolTip: 'You can do this completely silently in class during a test or presentation! Nobody will even notice.',
    scienceExplanation: 'Discovered by neuroscientists at Stanford: the double-sniff plus extended exhalation triggers the vagus nerve and mechanically slows cardiac pace in seconds.',
    timeEstimate: '30 seconds',
    interactiveTool: 'breathing'
  },
  {
    id: 'strat-physical-2',
    category: 'physical',
    title: 'The 5-4-3-2-1 Sensory Grounding Matrix',
    tagline: 'Snap out of derealization, dizziness, and feeling disconnected',
    steps: [
      '5 SEE: Look around and silently name 5 distinct things you see (a blue notebook, a wooden chair, shadows on the wall, a shoelace, an outlet).',
      '4 FEEL: Notice 4 tactile textures (your feet inside shoes, the cold plastic desk, fabric of your hoodie, hair on your neck).',
      '3 HEAR: Listen carefully for 3 sounds (air conditioner hum, pencils scratching, cars outside).',
      '2 SMELL: Notice 2 scents (chalk, laundry detergent, hand sanitizer, fresh paper).',
      '1 TASTE: Notice 1 taste in your mouth (mint gum, water, or just taking a mindful swallow).'
    ],
    inSchoolTip: 'Keep a tactile object in your pocket (smooth pebble, textured ring, rubber band) to touch secretly when zoned out.',
    scienceExplanation: 'Sensory grounding forces the brain\'s thalamus and sensory cortex into real-time sensory inputs, knocking out panic fantasies.',
    timeEstimate: '2-3 mins',
    interactiveTool: 'grounding'
  },
  {
    id: 'strat-physical-3',
    category: 'physical',
    title: 'Box Breathing (4-4-4-4 Navy SEAL Pacer)',
    tagline: 'Balance oxygen and carbon dioxide for deep physical calm',
    steps: [
      'Inhale smoothly through your nose for 4 counts.',
      'Hold your breath gently with lungs full for 4 counts.',
      'Exhale slowly and completely through your mouth for 4 counts.',
      'Hold empty lungs in quiet stillness for 4 counts.',
      'Cycle 4 complete rounds.'
    ],
    inSchoolTip: 'Trace the 4 edges of your notebook, textbook, or desk with your finger as you count the 4 sides of the box.',
    scienceExplanation: 'Rhythmic, equalized respiration stabilizes autonomic nervous system tone and increases heart rate variability (HRV).',
    timeEstimate: '2 mins',
    interactiveTool: 'breathing'
  }
];

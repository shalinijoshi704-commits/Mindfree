import { CheckInStatement } from '../types';

export const ANXIETY_STATEMENTS: CheckInStatement[] = [
  // ==========================================
  // ACADEMIC & EXAM PRESSURE (6 statements)
  // ==========================================
  {
    id: 'acad-1',
    category: 'academic',
    scenario: '10 minutes before the mid-term chemistry exam',
    statement: '"My mind has gone completely blank. If I fail this one test, my GPA will tank, and my entire future will be ruined."',
    options: [
      {
        id: 'acad-1-a',
        text: 'Acknowledge: "My brain feels flooded with adrenaline right now, but a single test score never defines my whole life or intelligence. I will take three deep belly breaths and start with the easiest question first."',
        isCorrect: true,
        explanation: 'Grounding yourself, putting the test into realistic perspective, and starting with a quick win interrupts the panic spiral.'
      },
      {
        id: 'acad-1-b',
        text: 'Pretend to be sick and go to the school nurse so you can avoid taking the exam altogether.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Avoidance provides temporary relief but amplifies exam anxiety for next time and compounds missed work.'
      },
      {
        id: 'acad-1-c',
        text: 'Tell yourself: "You\'re right, you are definitely going to fail because you are inherently terrible at science."',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Catastrophizing turns a normal nervous feeling into an exaggerated worst-case doom scenario.'
      },
      {
        id: 'acad-1-d',
        text: 'Force yourself not to think about it at all, scroll social media rapidly, and bottle up the panic.',
        isCorrect: false,
        trapType: 'Toxic Positivity / Suppression',
        explanation: 'Suppression makes physical anxiety spike higher right when test papers are handed out.'
      }
    ],
    educationalInsight: 'Pre-exam blankness is a temporary trick played by excess cortisol and adrenaline. Your knowledge is still stored in memory—it returns once your nervous system calms down.',
    cbtTechnique: 'De-catastrophizing & Physiological Sigh'
  },
  {
    id: 'acad-2',
    category: 'academic',
    scenario: 'Called on unexpectedly by the teacher during English literature class',
    statement: '"The teacher just asked me a question and my voice cracked. Everybody is secretly laughing at me and thinking I am so stupid."',
    options: [
      {
        id: 'acad-2-a',
        text: 'Immediately look down at your desk, stay silent the rest of the period, and vow to never speak up in class again.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Shutting down reinforces the false belief that speaking up is dangerous and embarrassing.'
      },
      {
        id: 'acad-2-b',
        text: 'Reframe: "Voice cracks and pauses happen to literally everyone in high school. My classmates are mostly worried about being called on themselves, not scrutinizing me. I will just finish my sentence calmly."',
        isCorrect: true,
        explanation: 'This busts the Spotlight Effect (assuming all eyes are judging you) and normalizes typical adolescent physical reactions.'
      },
      {
        id: 'acad-2-c',
        text: 'Convince yourself that everyone in the classroom is taking notes about how awkward you are.',
        isCorrect: false,
        trapType: 'Mind Reading & Assumption',
        explanation: 'Mind reading assumes we know the critical thoughts of 25 other teens without any evidence.'
      },
      {
        id: 'acad-2-d',
        text: 'Angrily snap at the teacher for daring to ask you a question in front of others.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Lashing out comes from fear, but damages your relationship with teachers and peers.'
      }
    ],
    educationalInsight: 'The Spotlight Effect is extremely strong between ages 12 and 18. In reality, peers spend 95% of their attention worrying about their own presentation, hair, and insecurities.',
    cbtTechnique: 'Challenging the Spotlight Effect'
  },
  {
    id: 'acad-3',
    category: 'academic',
    scenario: 'Receiving an 84% on a major history project you spent all weekend on',
    statement: '"I didn\'t get an A. All that hard work was completely wasted, and anything less than perfection is an utter failure."',
    options: [
      {
        id: 'acad-3-a',
        text: 'Throw the rubric in the trash and refuse to do the next assignment because high effort feels pointless.',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Black-and-white thinking treats any outcome between 0% and 99% as equal to total failure.'
      },
      {
        id: 'acad-3-b',
        text: 'Rethink: "A B is solid mastery of tough material. Perfection is an unrealistic standard. I can review the teacher\'s comments as useful feedback for the next unit without beating myself up."',
        isCorrect: true,
        explanation: 'Embracing a Growth Mindset separates your intrinsic human worth from an academic letter grade.'
      },
      {
        id: 'acad-3-c',
        text: 'Stay awake until 3:00 AM every night next week over-studying to guarantee you never get a B again.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Over-studying without sleep accelerates teenage burnout, panic attacks, and cognitive fatigue.'
      },
      {
        id: 'acad-3-d',
        text: 'Assume the teacher personally hates you and graded you unfairly out of spite.',
        isCorrect: false,
        trapType: 'Mind Reading & Assumption',
        explanation: 'Personalizing an objective grade prevents you from seeing actionable constructive feedback.'
      }
    ],
    educationalInsight: 'Perfectionism is anxiety wearing a mask of high achievement. Healthy striving embraces mistakes as data points; perfectionism treats mistakes as moral flaws.',
    cbtTechnique: 'Cognitive Continuum (Dialing Down All-or-Nothing)'
  },
  {
    id: 'acad-4',
    category: 'academic',
    scenario: 'Group project presentation scheduled for Friday morning',
    statement: '"I have to present the intro slides. I just know I will stumble on words, everyone will cringe, and our group will hate me."',
    options: [
      {
        id: 'acad-4-a',
        text: 'Text the group at midnight before claiming your WiFi broke so they have to cover your portion.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Bailing last minute breaks group trust and worsens performance phobia in the future.'
      },
      {
        id: 'acad-4-b',
        text: 'Grounding response: "Stumbling on a word isn\'t a disaster; it\'s just normal human speech. I will practice my 3 bullet points with a friend or in front of the mirror, and keep water nearby."',
        isCorrect: true,
        explanation: 'Preparation, accepting slight imperfections, and practical anchors (water sip, cue cards) regulate pre-speech jitters.'
      },
      {
        id: 'acad-4-c',
        text: 'Memorize every single word script perfectly, word-for-word, and panic if you forget an exact adjective.',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Rigid memorization actually increases presentation freezing compared to understanding key bullet concepts.'
      },
      {
        id: 'acad-4-d',
        text: 'Tell yourself you will definitely pass out on stage so there is no point in preparing.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Catastrophizing exaggerates bodily arousal into catastrophic medical fantasies.'
      }
    ],
    educationalInsight: 'Glossophobia (speech anxiety) triggers the exact same fight-or-flight response as seeing a predator. Re-framing adrenaline as "excitement and focus" enhances performance.',
    cbtTechnique: 'Arousal Reappraisal (Anxious -> Excited)'
  },
  {
    id: 'acad-5',
    category: 'academic',
    scenario: 'Sitting at desk with 3 overdue homework assignments and a book chapter to read',
    statement: '"There is way too much to do. I am hopelessly behind, so my brain is frozen and I can\'t even start one single math problem."',
    options: [
      {
        id: 'acad-5-a',
        text: 'Micro-step strategy: "Executive overwhelm is real. Instead of tackling 5 hours of work, I will set a 10-minute timer and solve just the first 2 math problems. Starting small breaks paralysis."',
        isCorrect: true,
        explanation: 'Lowering the bar to a micro-task bypasses the amygdala\'s panic lock and builds momentum through dopamine from small wins.'
      },
      {
        id: 'acad-5-b',
        text: 'Open YouTube and binge videos for 4 hours while feeling guilty and sick to your stomach.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Procrastination is an emotional regulation problem, not laziness—distraction increases morning dread.'
      },
      {
        id: 'acad-5-c',
        text: 'Convince yourself that you are fundamentally broken and will probably drop out of school.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Making a temporary backlog into an existential identity crisis drains all motivation.'
      },
      {
        id: 'acad-5-d',
        text: 'Try to do all 4 assignments at once by multitasking with 15 browser tabs open simultaneously.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Multitasking under stress amplifies cognitive overload and mistakes.'
      }
    ],
    educationalInsight: 'The "Homework Freeze" is an amygdala freeze response. Action precedes motivation—doing 3 minutes of a task tricks the brain into completing it.',
    cbtTechnique: 'The 5-Minute Micro-Action Rule'
  },
  {
    id: 'acad-6',
    category: 'academic',
    scenario: 'Looking around a honors math class where other students seem to answer instantly',
    statement: '"Everyone else understands this calculus theorem instantly while I have to read it three times. I clearly don\'t belong here."',
    options: [
      {
        id: 'acad-6-a',
        text: 'Drop the class immediately without talking to the teacher or seeking tutoring.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Giving up early robs you of discovering your true capability with the right support.'
      },
      {
        id: 'acad-6-b',
        text: 'Tell yourself you have an inferior brain and should never challenge yourself again.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Fixed mindset beliefs prevent brain neuroplasticity and growth.'
      },
      {
        id: 'acad-6-c',
        text: 'Reality check: "Speed does not equal intelligence. Depth of understanding matters more. Needing multiple reads is normal, and I can ask the teacher for one clarification during office hours."',
        isCorrect: true,
        explanation: 'This reframes cognitive processing speed as distinct from deep learning and encourages self-advocacy.'
      },
      {
        id: 'acad-6-d',
        text: 'Pretend you know everything, nod enthusiastically, and copy someone else\'s homework later.',
        isCorrect: false,
        trapType: 'Toxic Positivity / Suppression',
        explanation: 'Masking confusion increases testing anxiety when exams arrive.'
      }
    ],
    educationalInsight: 'Imposter syndrome peaks when students transition to harder classes. Asking questions is actually what the highest-achieving students do most often.',
    cbtTechnique: 'Imposter Syndrome Reality Check'
  },

  // ==========================================
  // SOCIAL & PEER JUDGMENT (6 statements)
  // ==========================================
  {
    id: 'soc-1',
    category: 'social',
    scenario: 'Walking into a bustling high school cafeteria during lunch break',
    statement: '"I have to find a seat, but everyone is already sitting in cliques. If I walk over to a table, they will give each other glances and whisper about me."',
    options: [
      {
        id: 'soc-1-a',
        text: 'Walk into a bathroom stall and eat your lunch alone in the stall every single day.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Bathroom eating increases isolation and confirms the untrue fear that you are unapproachable.'
      },
      {
        id: 'soc-1-b',
        text: 'Evidence-based thought: "Most people are absorbed in their own phone screens and lunch chatter. I can look for someone with an open seat, smile, and simply ask: \'Hey, is this seat taken?\' The worst that happens is a quick \'yes\', which is not a rejection of my soul."',
        isCorrect: true,
        explanation: 'Depersonalizes the situation, removes mind reading, and provides an actionable social script.'
      },
      {
        id: 'soc-1-c',
        text: 'Glare defensively at everyone so nobody thinks you want to be their friend anyway.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Defensive hostility pushes away kind people who would have happily shared a seat.'
      },
      {
        id: 'soc-1-d',
        text: 'Decide you are doomed to be friendless forever and completely unworthy of companionship.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Jumping from one awkward moment to lifelong isolation is a hallmark distortion.'
      }
    ],
    educationalInsight: 'Social anxiety convinces us that other teenagers have seamless confidence. In reality, over 70% of teens report feeling insecure in cafeteria settings.',
    cbtTechnique: 'Hypothesis Testing & Social Scripts'
  },
  {
    id: 'soc-2',
    category: 'social',
    scenario: 'Passing a group of classmates in the hallway who burst out laughing as you walk past',
    statement: '"They were definitely laughing at my outfit or how I walk. I am so humiliated."',
    options: [
      {
        id: 'soc-2-a',
        text: 'Rush to the restroom, inspect your clothes obsessively, and call your parents to pick you up early.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Compulsive checking and leaving school reinforces the idea that random laughter was targeted at you.'
      },
      {
        id: 'soc-2-b',
        text: 'Decide that you must confront them and accuse them of talking behind your back.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Acting on emotional assumptions without evidence often causes unnecessary conflict.'
      },
      {
        id: 'soc-2-c',
        text: 'Alternative perspective: "Unless someone said my name, their laughter was almost certainly about a meme, a joke, or something in their conversation. The universe doesn\'t revolve around me, and that\'s actually a comforting relief!"',
        isCorrect: true,
        explanation: 'Generating alternative explanations is the core CBT tool for tackling personalization and paranoia.'
      },
      {
        id: 'soc-2-d',
        text: 'Tell yourself you deserve to be laughed at because you look ridiculous.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Turning external ambiguity into internal self-hatred harms emotional self-esteem.'
      }
    ],
    educationalInsight: 'Personalization is assuming random events are aimed at you. When you hear laughter, there are dozens of plausible reasons having zero to do with you.',
    cbtTechnique: 'Generating 3 Alternative Explanations'
  },
  {
    id: 'soc-3',
    category: 'social',
    scenario: 'Invited to a birthday party where you only know one person well',
    statement: '"I will just stand in the corner looking awkward while everyone else mingles effortlessly. I should just make up an excuse and stay in bed."',
    options: [
      {
        id: 'soc-3-a',
        text: 'Cancel at the last minute and spend the night refreshing social stories with deep FOMO and regret.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Canceling provides relief for 10 minutes, followed by hours of FOMO, guilt, and reduced future invites.'
      },
      {
        id: 'soc-3-b',
        text: 'Stepwise social experiment: "I will go for 45 minutes as a low-stakes experiment. I can stick close to my friend, ask one new person what music or games they like, and if I still feel drained after 45 minutes, I have permission to leave gracefully."',
        isCorrect: true,
        explanation: 'The "45-Minute Exit Pass" lowers stakes, eliminates the pressure to be the life of the party, and builds social resilience.'
      },
      {
        id: 'soc-3-c',
        text: 'Go to the party and stay glued to your phone screen in the bathroom the entire time.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Hiding while present creates safety behavior dependence and misses actual connection opportunities.'
      },
      {
        id: 'soc-3-d',
        text: 'Force yourself to act completely loud and fake so nobody sees you are introverted.',
        isCorrect: false,
        trapType: 'Toxic Positivity / Suppression',
        explanation: 'Overcompensating causes deep social exhaustion and feels inauthentic.'
      }
    ],
    educationalInsight: 'Gradual exposure with an "honorable exit strategy" lets introverts and anxious youth test social situations without feeling trapped.',
    cbtTechnique: 'Behavioral Experiment with Safety Valves'
  },
  {
    id: 'soc-4',
    category: 'social',
    scenario: 'There is a silence that lasts for 10 seconds while talking one-on-one with a peer',
    statement: '"This silence is unbearable. I am so boring and have zero social skills. They probably can\'t wait to get away from me."',
    options: [
      {
        id: 'soc-4-a',
        text: 'Start frantically talking about random things without breathing so there is never silence.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Frantic talking increases internal anxiety and feels jittery to the other person.'
      },
      {
        id: 'soc-4-b',
        text: 'Abruptly walk away without saying goodbye to escape the awkwardness.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Abruptly fleeing creates actual confusion where a normal conversational pause was happening.'
      },
      {
        id: 'soc-4-c',
        text: 'Mindful acceptance: "Conversations naturally have pauses; silence is a normal rhythm, not an emergency. It takes two people to carry a chat, so the burden is not 100% on me. I can just take a relaxed breath or ask an open-ended question."',
        isCorrect: true,
        explanation: 'Sharing the responsibility of conversation and normalizing pauses relieves the performance burden.'
      },
      {
        id: 'soc-4-d',
        text: 'Apologize profusely: "I\'m so sorry I\'m such a weird, boring person to talk to!"',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Over-apologizing puts awkward emotional labor on the listener to validate you.'
      }
    ],
    educationalInsight: 'Comfort with brief silences is actually a sign of authentic connection. Anxious minds misinterpret peaceful pauses as catastrophic failures.',
    cbtTechnique: 'Shared Responsibility Cognitive Reframe'
  },
  {
    id: 'soc-5',
    category: 'social',
    scenario: 'Working in an assigned pair for a biology lab with a popular classmate',
    statement: '"They are going to think I\'m a total loser because I don\'t hang out with their crowd."',
    options: [
      {
        id: 'soc-5-a',
        text: 'Do all the work by yourself in silence so you don\'t have to speak to them at all.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Doing all the work breeds resentment and prevents genuine peer connection.'
      },
      {
        id: 'soc-5-b',
        text: 'Objective focus: "We are both just high schoolers trying to get this microscope slide focused. I will focus on being polite, cooperative, and doing our task well. People respect reliability far more than social clique status."',
        isCorrect: true,
        explanation: 'Task-focused attention grounds anxiety in the present sensory reality rather than social status anxieties.'
      },
      {
        id: 'soc-5-c',
        text: 'Make up stories about fake parties you went to so you seem cooler.',
        isCorrect: false,
        trapType: 'Toxic Positivity / Suppression',
        explanation: 'Fabricating stories creates constant fear of being caught in lies and heightens stress.'
      },
      {
        id: 'soc-5-d',
        text: 'Assume they are judging every movement of your hands while you hold the test tube.',
        isCorrect: false,
        trapType: 'Mind Reading & Assumption',
        explanation: 'Projecting your own self-criticism onto someone who is just trying to finish class.'
      }
    ],
    educationalInsight: 'Task-Focused Attention redirects brain bandwidth away from self-monitoring and into the external task, instantly decreasing social tension.',
    cbtTechnique: 'Task-Focused Attention Shift'
  },
  {
    id: 'soc-6',
    category: 'social',
    scenario: 'Disagreeing with a friend\'s suggestion for weekend plans',
    statement: '"If I speak up and say I don\'t want to go to the crowded mall, they will get angry, kick me out of the group, and drop me as a friend."',
    options: [
      {
        id: 'soc-6-a',
        text: 'Agree immediately, go to the mall even though you feel miserable and overwhelmed, and resent them secretly.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'People-pleasing leads to emotional burnout, exhaustion, and hidden bitterness.'
      },
      {
        id: 'soc-6-b',
        text: 'Assertive balance: "True friendship can easily handle healthy boundaries. I can say: \'I am pretty drained for a loud mall today, but I would love to hang out or get boba tomorrow.\' Speaking up with kindness is healthy."',
        isCorrect: true,
        explanation: 'Offering an alternative plan shows care while holding a self-respecting boundary.'
      },
      {
        id: 'soc-6-c',
        text: 'Send a passive-aggressive emoji in the chat and give everyone the silent treatment.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Passive-aggressive communication escalates teenage drama and misunderstandings.'
      },
      {
        id: 'soc-6-d',
        text: 'Ghost everyone for the entire weekend and turn off your phone in distress.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Ghosting creates worry and alienates caring friends.'
      }
    ],
    educationalInsight: 'Boundaries are not walls; they are guard rails that keep relationships safe and long-lasting.',
    cbtTechnique: 'Assertive "Yes to You, No to Activity" Boundary'
  },

  // ==========================================
  // DIGITAL FOMO & CYBER STRESS (6 statements)
  // ==========================================
  {
    id: 'dig-1',
    category: 'digital',
    scenario: 'Checking Snapchat/Instagram and seeing mutual friends hanging out at an arcade without you',
    statement: '"Everyone is hanging out without me. I was deliberately excluded because nobody actually likes me when I\'m not around."',
    options: [
      {
        id: 'dig-1-a',
        text: 'Post an angry, cryptic message on your story complaining about fake friends.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Subtweeting or vague-posting invites drama and usually makes you feel more isolated afterwards.'
      },
      {
        id: 'dig-1-b',
        text: 'Keep refreshing their stories every 5 minutes to see who else arrives and torment yourself.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Pain-scrolling amplifies rejection sensitivity and feeds emotional adrenaline.'
      },
      {
        id: 'dig-1-c',
        text: 'Grounded perspective: "Seeing people together hurts, and that feeling is valid. But hangouts often happen spontaneously or around specific circumstances (like sports or neighborhood). It doesn\'t mean my friendships are over. I will put my phone away and do something fun for myself right now."',
        isCorrect: true,
        explanation: 'Validates real teen hurt feelings while actively disputing the catastrophizing jump to "nobody likes me".'
      },
      {
        id: 'dig-1-d',
        text: 'Block all of them immediately and delete your account in a fit of despair.',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Nuclear reactions to spontaneous social events burn bridges over misunderstandings.'
      }
    ],
    educationalInsight: 'Social media presents an artificially curated highlight reel of other people\'s lives. FOMO (Fear Of Missing Out) triggers the brain\'s primitive tribe-exclusion alert.',
    cbtTechnique: 'Validation + Phone Circuit Breaker'
  },
  {
    id: 'dig-2',
    category: 'digital',
    scenario: 'You sent a text to a close friend 3 hours ago; it shows "Read" but no reply',
    statement: '"They saw it and didn\'t reply. I definitely said something weird and offended them, and now they hate me."',
    options: [
      {
        id: 'dig-2-a',
        text: 'Send 6 question marks and follow-up texts demanding to know what you did wrong.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Bombarding with panic messages pushes people away and creates real awkwardness where none existed.'
      },
      {
        id: 'dig-2-b',
        text: 'Evidence check: "People get called down for dinner, start homework, get distracted, or put their phone down. A delayed reply is almost always about their day, not a hidden grudge against me. I will let them respond in their own time."',
        isCorrect: true,
        explanation: 'De-personalizes response latency and honors other people\'s lives and busy schedules.'
      },
      {
        id: 'dig-2-c',
        text: 'Vow never to message them first ever again and delete their contact information.',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Holding rigid tit-for-tat rules destroys healthy teenage friendships.'
      },
      {
        id: 'dig-2-d',
        text: 'Re-read the text 50 times analyzing every single syllable to find your "fatal flaw."',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Rumination keeps you in an anxious cognitive feedback loop.'
      }
    ],
    educationalInsight: 'Asynchronous communication means people reply when they have capacity, not instantly. "Left on read" is a normal part of busy human life.',
    cbtTechnique: 'Decentering & Latency Acceptance'
  },
  {
    id: 'dig-3',
    category: 'digital',
    scenario: 'Scrolling TikTok/Reels at 11:30 PM before bed and seeing teens living "aesthetic, perfect lives"',
    statement: '"Everyone my age is prettier, more productive, traveling, and has aesthetic rooms. My life is boring, messy, and totally pathetic in comparison."',
    options: [
      {
        id: 'dig-3-a',
        text: 'Spend until 2:00 AM online shopping for trendy clothes and room decor you can\'t afford.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Retail therapy driven by social comparison feeds the cycle of insecurity and sleeplessness.'
      },
      {
        id: 'dig-3-b',
        text: 'Digital literacy reality: "I am comparing my behind-the-scenes reality to their edited, filtered, 15-second highlight clip. Nobody posts their panic, messy rooms, or family arguments. I will plug my phone in across the room and sleep."',
        isCorrect: true,
        explanation: 'Recognizing algorithmic curation and putting physical distance between bed and phone restores sanity.'
      },
      {
        id: 'dig-3-c',
        text: 'Conclude that you must go on an extreme crash diet and change your entire personality.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Changing yourself based on algorithmically generated influencers harms youth mental health.'
      },
      {
        id: 'dig-3-d',
        text: 'Post a fake, staged photo pretending to be at an expensive event to keep up appearances.',
        isCorrect: false,
        trapType: 'Toxic Positivity / Suppression',
        explanation: 'Faking a persona deepens feelings of imposture and emptiness.'
      }
    ],
    educationalInsight: 'Algorithms are engineered to hold teen attention by triggering social comparison and inadequacy. Putting phones outside the bedroom improves teen mood scores by over 30%.',
    cbtTechnique: 'Behind-The-Scenes vs. Highlight Reel Check'
  },
  {
    id: 'dig-4',
    category: 'digital',
    scenario: 'A rumor about someone at school gets mentioned in a huge class group chat',
    statement: '"Drama is exploding in the chat. If I don\'t chime in and take a side, everyone will turn on me next."',
    options: [
      {
        id: 'dig-4-a',
        text: 'Forward the rumors to 3 other friends to be the first with juicy gossip.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Spreading cyber-rumors harms peers and can carry severe school and social consequences.'
      },
      {
        id: 'dig-4-b',
        text: 'Healthy boundary: "Group chat drama burns bright and dies quickly. Staying neutral and silent or muting the chat protects my peace and shows integrity. Not every wildfire needs my gasoline."',
        isCorrect: true,
        explanation: 'Muting noisy drama chats preserves mental energy and avoids toxic school conflicts.'
      },
      {
        id: 'dig-4-c',
        text: 'Start an aggressive argument in all caps with the instigator.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Feeding cyber-trolls rarely creates positive resolutions and fuels screenshots.'
      },
      {
        id: 'dig-4-d',
        text: 'Obsessively screenshot every message in terror that you will get framed.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Panic-hoarding screenshots locks your attention on other people\'s negativity.'
      }
    ],
    educationalInsight: 'The strongest power in the digital era is the "Mute Notifications" button. Refusing to participate in cyber rumors is an act of high emotional maturity.',
    cbtTechnique: 'Strategic Non-Engagement (Digital Zen)'
  },
  {
    id: 'dig-5',
    category: 'digital',
    scenario: 'Posted a photo or creative drawing on social media and it only got 8 likes in an hour',
    statement: '"Only 8 likes? This is so embarrassing. My art/picture is awful, and everyone who saw it thinks I\'m cringey. I need to delete it immediately."',
    options: [
      {
        id: 'dig-5-a',
        text: 'Delete the post in shame, delete your artwork, and promise never to share creative hobbies again.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Allowing algorithmic metrics to kill your creative passion is heartbreaking and unnecessary.'
      },
      {
        id: 'dig-5-b',
        text: 'Value separation: "My creativity and value exist independently of an algorithm code. Low likes usually just mean timing or feed changes. I created this because I love it, not for an algorithm\'s approval."',
        isCorrect: true,
        explanation: 'Separates intrinsic joy of creation from extrinsic vanity metrics.'
      },
      {
        id: 'dig-5-c',
        text: 'Text 10 friends pleading with them to like and comment on your post so you don\'t look bad.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Begging for likes reinforces the illusion that numbers determine self-worth.'
      },
      {
        id: 'dig-5-d',
        text: 'Decide that this confirms you have no talent and should never try anything new.',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Tying self-worth to engagement feeds an endless dopamine trap.'
      }
    ],
    educationalInsight: 'Social media algorithms optimize for controversy and brand sponsors, not human artistic beauty. Your hobby belongs to your soul, not the feed.',
    cbtTechnique: 'Intrinsic vs Extrinsic Value Anchor'
  },
  {
    id: 'dig-6',
    category: 'digital',
    scenario: 'Accidentally sent a screenshot of a funny chat back to the exact person you took it from',
    statement: '"I just accidentally sent the screenshot to the person themselves! My life is over, I have destroyed everything, and I can never show my face again."',
    options: [
      {
        id: 'dig-6-a',
        text: 'Block them immediately, throw your phone across the room, and pretend your phone was hacked by aliens.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Elaborate cover-ups look far worse than simple teenage honesty.'
      },
      {
        id: 'dig-6-b',
        text: 'Honest humility & humor: "Take a breath. It feels mortifying, but it is not lethal. If the screenshot was harmless, say: \'Oops, hilarious fail—sent to you instead of saving it!\' If it was unkind, own up sincerely: \'That was a mistake and I apologize for gossiping.\' Life goes on."',
        isCorrect: true,
        explanation: 'Direct honesty and de-escalating panic with humor or accountability diffuses tension immediately.'
      },
      {
        id: 'dig-6-c',
        text: 'Tell them it wasn\'t you and that your little sibling stole your phone.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Obvious lies erode trust far more than the original screenshot.'
      },
      {
        id: 'dig-6-d',
        text: 'Conclude that this one awkward moment will permanently ruin your entire reputation forever.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'In two weeks, this will be forgotten or become a funny story to laugh about together.'
      }
    ],
    educationalInsight: 'The cringe of digital slips fades rapidly. Owning up with a quick humorous shrug turns potential drama into an everyday relatable teen mistake.',
    cbtTechnique: 'Humorous Radical Acceptance'
  },

  // ==========================================
  // BODY IMAGE & SELF-WORTH (6 statements)
  // ==========================================
  {
    id: 'body-1',
    category: 'body_image',
    scenario: 'Looking in the bathroom mirror on the morning of school picture day with a noticeable breakout',
    statement: '"I have a massive pimple on my chin. Everyone will stare directly at it, and I look completely repulsive."',
    options: [
      {
        id: 'body-1-a',
        text: 'Refuse to go to school and stay home locked in your bedroom for 3 days until it clears.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Missing school for skin breakouts builds avoidance patterns and isolates you.'
      },
      {
        id: 'body-1-b',
        text: 'Apply 5 different harsh chemicals at once, scrub until it bleeds, and cake heavy makeup over it.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Aggressive treatments inflame skin further and signal distress.'
      },
      {
        id: 'body-1-c',
        text: 'Compassionate perspective: "Almost every teenager on the planet gets breakouts—it is just hormones doing normal puberty work. Nobody is magnifying my face like I am in this mirror. I can put a gentle pimple patch on and hold my head high."',
        isCorrect: true,
        explanation: 'Normalizes biological puberty changes and breaks mirror-magnification hyper-focus.'
      },
      {
        id: 'body-1-d',
        text: 'Tell yourself you can never take pictures with your friends until your skin is 100% glass-smooth.',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Airbrushed media standards rob you of making real memories with genuine friends.'
      }
    ],
    educationalInsight: 'Teen skin undergoes massive hormonal surges. Over 85% of adolescents experience acne. Looking closer than 12 inches into a mirror magnifies flaws that no passerby can see.',
    cbtTechnique: 'Mirror Stepping-Back & Common Humanity'
  },
  {
    id: 'body-2',
    category: 'body_image',
    scenario: 'Trying on jeans for the new school year and discovering last year\'s size is tight',
    statement: '"My favorite jeans don\'t fit anymore. I\'ve gained weight, I look disgusting, and I have zero self-control."',
    options: [
      {
        id: 'body-2-a',
        text: 'Body-respect reframe: "My body is supposed to grow and develop through my teen years—it needs bones, muscle, and energy. Clothes are supposed to fit MY body, not the other way around. I will get comfortable clothes that fit me today."',
        isCorrect: true,
        explanation: 'Reframing clothes as functional tools for bodies rather than measuring sticks for human worth.'
      },
      {
        id: 'body-2-b',
        text: 'Start skipping lunch at school to force yourself back into the old jeans size.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Skipping meals during growth spurts harms adolescent brain development and causes intense mood swings.'
      },
      {
        id: 'body-2-c',
        text: 'Wear an oversized winter jacket in 85-degree weather every day to hide your body.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Body concealment behaviors increase physical discomfort and heighten body obsession.'
      },
      {
        id: 'body-2-d',
        text: 'Decide you are lazy and bad for having normal biological growth spurts.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Shame never produces health; compassionate self-care does.'
      }
    ],
    educationalInsight: 'Adolescent bodies undergo bone density expansion, organ growth, and hormonal distribution. Growing out of clothes is a biological necessity, not a personal flaw.',
    cbtTechnique: 'Body Neutrality (Clothes Fit Me, Not Me Fit Clothes)'
  },
  {
    id: 'body-3',
    category: 'body_image',
    scenario: 'Changing in the gym locker room for P.E. class',
    statement: '"Other kids look so toned, athletic, and mature. I feel so awkward, scrawny/chubby, and out of place in my own skin."',
    options: [
      {
        id: 'body-3-a',
        text: 'Forge a doctor\'s note to get permanently excused from physical education.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Avoiding movement deprives you of natural mood-boosting endorphins.'
      },
      {
        id: 'body-3-b',
        text: 'Body neutrality reminder: "Bodies develop at wildly different rates between ages 12 and 18; some hit growth spurts early, some late. My body is worthy because it breathes, laughs, and moves, not because it matches a gym mannequin."',
        isCorrect: true,
        explanation: 'Body neutrality focuses on what your body does (functionality) rather than how it looks to others.'
      },
      {
        id: 'body-3-c',
        text: 'Stare at your shoes and change in dark bathroom stalls with extreme dread every week.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Locker room anxiety is universal, but isolation amplifies the sense of shame.'
      },
      {
        id: 'body-3-d',
        text: 'Judge other kids\' bodies harshly in your mind to make yourself feel superior.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Judging others actually deepens your own internal self-criticism.'
      }
    ],
    educationalInsight: 'Puberty is an asynchronous process—different organs, limbs, and hormones peak years apart. Comparing your body at age 14 to someone else at 14 is comparing apples to pineapples.',
    cbtTechnique: 'Body Functionality & Developmental Patience'
  },
  {
    id: 'body-4',
    category: 'body_image',
    scenario: 'A family member makes an offhand comment at dinner: "Wow, you\'ve really grown taller and filled out!"',
    statement: '"Filled out? That means they think I am fat and out of shape. I should just stop eating dinner with family."',
    options: [
      {
        id: 'body-4-a',
        text: 'Storm out of the kitchen, slam your bedroom door, and refuse to speak to anyone.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Exploding in anger leaves the underlying hurt unaddressed.'
      },
      {
        id: 'body-4-b',
        text: 'Clarification & reframe: "Adults often use clumsy words when noticing normal growth spurts. They usually mean \'You are growing up into a young adult\', not a critique of my shape. If it made me uncomfortable, I can calmly let them know: \'I prefer not talking about my body size.\'"',
        isCorrect: true,
        explanation: 'Decodes clumsy adult phrasing and teaches polite, assertive boundary-setting.'
      },
      {
        id: 'body-4-c',
        text: 'Ruminate on that single word for 6 months and let it dictate your self-esteem.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Giving one casual phrase immense power over your self-worth leads to chronic pain.'
      },
      {
        id: 'body-4-d',
        text: 'Conclude that your family is ashamed of how you look.',
        isCorrect: false,
        trapType: 'Mind Reading & Assumption',
        explanation: 'Assuming family members have malicious intent usually misreads their intention.'
      }
    ],
    educationalInsight: 'Relatives frequently make well-meaning but insensitive comments about teen growth. Setting a gentle verbal boundary teaches them how to speak respectfully.',
    cbtTechnique: 'Decoupling Intent from Impact + Calm Boundary'
  },
  {
    id: 'body-5',
    category: 'body_image',
    scenario: 'Feeling intensely self-conscious about wearing a swimsuit at a school pool party or beach trip',
    statement: '"Everyone will judge my thighs/arms/stomach. I\'ll just sit in a dark corner wearing a hoodie in 90-degree heat."',
    options: [
      {
        id: 'body-5-a',
        text: 'Wear a winter hoodie to the pool, overheat, and watch everyone else have fun from afar.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Suffering in heat prevents you from making fun summer memories.'
      },
      {
        id: 'body-5-b',
        text: 'Fun-over-appearance refocus: "The purpose of a pool is to cool off, play games, and laugh with friends—not to audition for a swimwear commercial. Once I jump in the cool water, everyone will just be splashing and having fun."',
        isCorrect: true,
        explanation: 'Refocuses on sensory enjoyment and play instead of viewing yourself as a static display object.'
      },
      {
        id: 'body-5-c',
        text: 'Cancel your attendance and sit at home feeling miserable and left out.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Canceling summer trips to protect against imaginary judgment creates lasting teen regret.'
      },
      {
        id: 'body-5-d',
        text: 'Criticize everyone else at the pool in your head so you feel less insecure.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Mental criticism keeps your brain focused entirely on physical flaws.'
      }
    ],
    educationalInsight: 'The concept of a "beach body" is an advertising myth designed to sell diets. Any body that is at the beach is, by definition, a beach body.',
    cbtTechnique: 'Sensory Immersion over Self-Surveillance'
  },
  {
    id: 'body-6',
    category: 'body_image',
    scenario: 'Noticing a feature you dislike (nose, height, hair texture, smile) in a tagged photo online',
    statement: '"Look at that picture of me—I look so weird compared to everyone else. I wish I could trade faces with someone else."',
    options: [
      {
        id: 'body-6-a',
        text: 'Self-compassion anchor: "Photos capture one awkward 1/1000th of a second under flat lighting; they don\'t capture my warmth, humor, or living energy. Unique features make people interesting, not defective. I will treat myself with the same kindness I\'d show my best friend."',
        isCorrect: true,
        explanation: 'Practicing the "Best Friend Rule"—treating yourself with the empathy you would offer someone you love.'
      },
      {
        id: 'body-6-b',
        text: 'Demand that the friend take the group photo down and scream at them for posting it.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Exploding at a friend over an innocent group memory creates relational rift.'
      },
      {
        id: 'body-6-c',
        text: 'Spend 2 hours using face-tuning apps to warp your face until you look like someone else.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Digital face warping worsens body dysmorphia by creating an impossible standard in your head.'
      },
      {
        id: 'body-6-d',
        text: 'Refuse to ever be in photos with family or friends for the rest of high school.',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Avoiding photos means having no visual memories of your youth later in life.'
      }
    ],
    educationalInsight: 'The "Best Friend Test" is gold-standard CBT: if you wouldn\'t say it to your dearest friend in tears, do not say it to your own reflection.',
    cbtTechnique: 'The Best Friend Self-Compassion Test'
  },

  // ==========================================
  // FUTURE & HIGH EXPECTATIONS (6 statements)
  // ==========================================
  {
    id: 'fut-1',
    category: 'future',
    scenario: 'Family members asking at Thanksgiving: "So, what are your exact college and career plans?"',
    statement: '"I have no idea what I want to do with my life. My cousins all have 5-year plans. I am already falling hopelessly behind."',
    options: [
      {
        id: 'fut-1-a',
        text: 'Make up an elaborate lie about becoming a pediatric neurosurgeon just to silence the room.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Lying creates future pressure to live up to a fake persona you don\'t even want.'
      },
      {
        id: 'fut-1-b',
        text: 'Realistic timeline: "I am a teenager—my job right now is to explore what interests me, not carve a 40-year career in stone. Most adults change careers multiple times! I can say: \'Right now I am exploring psychology and art and keeping options open.\'"',
        isCorrect: true,
        explanation: 'Normalizes career exploration and relieves the artificial pressure of having life figured out at 15.'
      },
      {
        id: 'fut-1-c',
        text: 'Lock yourself in the guest room and cry because you think you will be unemployed forever.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Equating not having an immediate career plan with permanent poverty is extreme catastrophizing.'
      },
      {
        id: 'fut-1-d',
        text: 'Give up on studying since you don\'t have an exact goal anyway.',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'All-or-nothing thinking prevents building basic foundational skills while exploring.'
      }
    ],
    educationalInsight: 'Over 80% of college students change their major at least once, and the average adult changes careers 3 to 7 times. Curiosity matters far more than early certainty.',
    cbtTechnique: 'Timeline Expansion & Exploration Permission'
  },
  {
    id: 'fut-2',
    category: 'future',
    scenario: 'Listening to peers discuss having 10 extracurriculars, varsity sports, and 150 volunteer hours',
    statement: '"I only do track and drama club. If my resume isn\'t overflowing with awards, top colleges will reject me and my parents will be devastated."',
    options: [
      {
        id: 'fut-2-a',
        text: 'Sign up for 6 new clubs tomorrow, sleep 4 hours a night, and run yourself into physical illness.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Overloading your schedule creates chronic sleep deprivation, anxiety, and depression.'
      },
      {
        id: 'fut-2-b',
        text: 'Drop out of track and drama because "what\'s the point if you aren\'t the best in the state."',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Quitting activities you genuinely enjoy because of resume obsession robs your life of joy.'
      },
      {
        id: 'fut-2-c',
        text: 'Authenticity reframe: "Depth and genuine joy matter so much more than a laundry list of superficial checkmarks. Being genuinely invested in track and drama brings me happiness and makes me a well-rounded human. There are hundreds of great colleges and pathways for me."',
        isCorrect: true,
        explanation: 'Focuses on authentic engagement and reminds you there are countless fulfilling life paths.'
      },
      {
        id: 'fut-2-d',
        text: 'Resent your parents and start huge screaming matches about their expectations.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Acting out in anger without honest dialogue closes doors to mutual understanding.'
      }
    ],
    educationalInsight: 'Admissions officers and employers consistently rank "authentic dedication to 1-2 passions" higher than an artificial checklist of 10 clubs done for show.',
    cbtTechnique: 'Values-Based Living (Depth over Checklists)'
  },
  {
    id: 'fut-3',
    category: 'future',
    scenario: 'Transitioning to a new school year or moving from middle to high school',
    statement: '"Everything is changing. New building, harder classes, older students. I won\'t be able to handle it and I\'ll crumble."',
    options: [
      {
        id: 'fut-3-a',
        text: 'Beg your parents to let you homeschool or skip the first month of the semester.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Skipping transition periods makes integration twice as scary later.'
      },
      {
        id: 'fut-3-b',
        text: 'Resilience bank review: "Change is naturally uncomfortable, but discomfort is not danger. I have handled new schools, tough grades, and changes before and adapted every time. I don\'t need to figure out the whole semester today—just navigate day one."',
        isCorrect: true,
        explanation: 'Accessing your "Resilience Bank" reminds your nervous system of past transitions you successfully survived.'
      },
      {
        id: 'fut-3-c',
        text: 'Convince yourself that high school will be a living nightmare like a movie caricature.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Hollywood movie stereotypes exaggerate school transitions into dramatic battlegrounds.'
      },
      {
        id: 'fut-3-d',
        text: 'Put up a cold wall and refuse to speak to any new classmates or teachers.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Withdrawing guarantees you will feel lonely and unsupported.'
      }
    ],
    educationalInsight: 'Humans are biologically wired to fear change because the primitive brain equates the unknown with danger. Recognizing "discomfort != danger" calms the alarm.',
    cbtTechnique: 'Drawing on the Resilience Bank'
  },
  {
    id: 'fut-4',
    category: 'future',
    scenario: 'Receiving a rejection letter from a summer program, team tryout, or selective club',
    statement: '"I didn\'t make the cut. This proves that I have zero real talent and my dream is officially dead."',
    options: [
      {
        id: 'fut-4-a',
        text: 'Rejection as redirection: "Hearing \'no\' stings, and it\'s totally okay to feel bummed today. But one committee\'s decision is not a verdict on my potential. Many famous creators, athletes, and leaders were cut multiple times. I can ask for feedback and keep growing."',
        isCorrect: true,
        explanation: 'Allows grieving the loss while reframing rejection as redirection and a normal stepping stone.'
      },
      {
        id: 'fut-4-b',
        text: 'Throw away your gear/instruments and never try out for anything ever again.',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Quitting after the first refusal turns a temporary setback into a permanent defeat.'
      },
      {
        id: 'fut-4-c',
        text: 'Send an angry email to the judges or coach calling them corrupt.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Burning bridges ruins future opportunities with that organization.'
      },
      {
        id: 'fut-4-d',
        text: 'Bottle up all sadness, pretend you never cared at all, and act like a robot.',
        isCorrect: false,
        trapType: 'Toxic Positivity / Suppression',
        explanation: 'Emotional suppression turns into somatic symptoms like headaches and chronic tension.'
      }
    ],
    educationalInsight: 'Michael Jordan was famously cut from his high school varsity team as a sophomore. Resilience is not never failing; it is how you speak to yourself after a "no".',
    cbtTechnique: 'Rejection as Redirection Reframe'
  },
  {
    id: 'fut-5',
    category: 'future',
    scenario: 'Feeling the pressure of parental expectations to pursue a career path you don\'t enjoy',
    statement: '"My parents want me to be a lawyer/doctor, but I want to study graphic design. If I follow my heart, I will break their hearts and be an ungrateful child."',
    options: [
      {
        id: 'fut-5-a',
        text: 'Suffer in silence for the next 10 years studying a subject you despise just to avoid conflict.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Living another person\'s life plan leads to severe clinical burnout and depression in your 20s.'
      },
      {
        id: 'fut-5-b',
        text: 'Scream at your parents that they ruined your childhood and run away.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Hostile confrontation shuts down empathy and makes parents double down out of panic.'
      },
      {
        id: 'fut-5-c',
        text: 'Compassionate differentiation: "My parents\' desires come from their love and desire for my financial security, which is good. But my life is ultimately mine to live. I can show them respect while gradually communicating my passions and sharing practical career data about design."',
        isCorrect: true,
        explanation: 'Validates parents\' positive intent (security) while maintaining personal autonomy and mature communication.'
      },
      {
        id: 'fut-5-d',
        text: 'Deliberately fail all your classes so they lower their expectations of you.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Self-sabotage damages your own freedom and options far more than anyone else\'s.'
      }
    ],
    educationalInsight: 'Differentiation is the healthy adolescent process of becoming an independent individual while staying connected in love to family.',
    cbtTechnique: 'Healthy Differentiation & Two-Way Empathy'
  },
  {
    id: 'fut-6',
    category: 'future',
    scenario: 'Thinking about climate change, global news, or the economy while reading headlines',
    statement: '"The world is in chaos and everything is going downhill. What is the point of studying or planning for a future that looks so bleak?"',
    options: [
      {
        id: 'fut-6-a',
        text: 'Doomscroll 5 hours of catastrophic news every evening until you feel numb.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Doomscrolling stimulates the brain\'s helplessness pathways without solving any real-world problem.'
      },
      {
        id: 'fut-6-b',
        text: 'Circle of control: "Large world problems are real, but doomscrolling doesn\'t fix them—it only exhausts my soul. I will focus on my Circle of Control: my kindness, my local community, my education, and small positive actions. The world needs engaged, healthy young people, not paralyzed ones."',
        isCorrect: true,
        explanation: 'Shifts focus from the massive "Circle of Concern" (where you have no direct control) to the "Circle of Influence" (actionable everyday choices).'
      },
      {
        id: 'fut-6-c',
        text: 'Pretend nothing bad is happening anywhere in the world and ignore all current events.',
        isCorrect: false,
        trapType: 'Toxic Positivity / Suppression',
        explanation: 'Total ignorance doesn\'t resolve underlying existential dread.'
      },
      {
        id: 'fut-6-d',
        text: 'Stop caring about school, friends, and your health because "nothing matters."',
        isCorrect: false,
        trapType: 'All-or-Nothing Perfectionism',
        explanation: 'Nihilism is anxiety giving up on hope. Active engagement creates meaning.'
      }
    ],
    educationalInsight: 'Eco-anxiety and news fatigue affect over 60% of modern teenagers. Focusing on local, concrete, positive actions immediately lifts the sensation of helplessness.',
    cbtTechnique: 'Circle of Control vs. Circle of Concern'
  },

  // ==========================================
  // PHYSICAL PANIC & BODY SENSATIONS (6 statements)
  // ==========================================
  {
    id: 'phys-1',
    category: 'physical',
    scenario: 'Sitting in class and suddenly noticing your heart beating fast and chest feeling tight',
    statement: '"My heart is pounding out of my chest and I can\'t get enough air. Something is physically wrong with me—am I having a medical emergency?"',
    options: [
      {
        id: 'phys-1-a',
        text: 'Biology explanation & slow sigh: "My body\'s sympathetic alarm system misfired—this is just a rush of adrenaline, not a heart attack. Adrenaline always peaks in 3 minutes and then metabolizes. I will do a double-inhale through my nose and a long, slow sigh out through my mouth."',
        isCorrect: true,
        explanation: 'Demystifying panic physiology (adrenaline curve) and using the Physiological Sigh directly activates the parasympathetic brake.'
      },
      {
        id: 'phys-1-b',
        text: 'Take rapid, shallow gasps of air as fast as you can while screaming for help.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Hyperventilating expels too much CO2 and intensifies tingling and dizziness.'
      },
      {
        id: 'phys-1-c',
        text: 'Ruminate on your pulse rate and obsessively check your smartwatch every 10 seconds.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Obsessive pulse checking feeds the fear-adrenaline loop, keeping your heart elevated.'
      },
      {
        id: 'phys-1-d',
        text: 'Tell yourself you will definitely faint and cause a massive scene.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'In panic, blood pressure is elevated, making true fainting biologically very rare.'
      }
    ],
    educationalInsight: 'During panic, your heart beats fast to pump oxygen to your muscles because your brain thinks you are running from a predator. It is uncomfortable, but biologically harmless.',
    cbtTechnique: 'Physiological Sigh & Adrenaline Wave De-escalation'
  },
  {
    id: 'phys-2',
    category: 'physical',
    scenario: 'Standing in a choir, theater rehearsal, or assembly when your hands start trembling',
    statement: '"My hands are shaking visibly. Everyone can see I am trembling like a leaf. If I hold the sheet paper, it will shake loudly."',
    options: [
      {
        id: 'phys-2-a',
        text: 'Drop the paper, run out the fire exit, and hide in your car or bus.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Fleeing stamps the rehearsal hall as a danger zone in your amygdala.'
      },
      {
        id: 'phys-2-b',
        text: 'Grounding + isometric release: "Shaking is just extra motor energy from adrenaline. I can anchor my feet flat on the floor, gently squeeze my thigh muscles or press my thumb and forefinger together, and place the paper on the music stand instead of holding it in the air."',
        isCorrect: true,
        explanation: 'Provides discreet physical grounding (isometric press) and a practical adjustment (stand vs hand).'
      },
      {
        id: 'phys-2-c',
        text: 'Stare intensely at your hands and try with all your willpower to force them to stop shaking.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Trying to force trembles to stop increases muscle tension and worsens the shake.'
      },
      {
        id: 'phys-2-d',
        text: 'Convince yourself that you have developed a permanent neurological illness.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Catastrophic health anxiety misinterprets simple nervous tremors.'
      }
    ],
    educationalInsight: 'Essential nervous tremors in the hands are caused by adrenaline binding to beta-receptors in muscle fibers. Channeling that energy into large muscles (legs, core) dissipates it.',
    cbtTechnique: 'Isometric Muscle Grounding'
  },
  {
    id: 'phys-3',
    category: 'physical',
    scenario: 'Before a big sports match or solo performance, feeling intense nausea and "stomach knots"',
    statement: '"My stomach feels like it is in a blender. I feel like I might throw up. I definitely cannot play this game today."',
    options: [
      {
        id: 'phys-3-a',
        text: 'Tell the coach you have food poisoning and sit on the bench all season.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Missing matches due to "butterflies" prevents your brain from learning that nausea passes once play begins.'
      },
      {
        id: 'phys-3-b',
        text: 'Gut-brain understanding: "The gut and brain are directly connected via the vagus nerve. When I am pumped for a game, blood diverts from digestion to my leg muscles—that IS the flutter feeling! My butterflies are just getting in formation. I will sip cold water and do warm-up stretches."',
        isCorrect: true,
        explanation: '"Butterflies in formation" turns a scary physical sensation into a sign of ready athletic arousal.'
      },
      {
        id: 'phys-3-c',
        text: 'Drink three energy drinks to shock your system into alertness.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Excess caffeine massively spikes nausea, heart rate, and gastrointestinal distress.'
      },
      {
        id: 'phys-3-d',
        text: 'Force yourself to vomit to get it over with.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Inducing vomiting creates dangerous physical habits and dehydrates you.'
      }
    ],
    educationalInsight: 'The enteric nervous system (the "second brain" in your gut) reacts immediately to excitement and nervousness. Once active movement begins, digestion settles.',
    cbtTechnique: 'Gut-Brain Reframing (Butterflies in Formation)'
  },
  {
    id: 'phys-4',
    category: 'physical',
    scenario: 'Feeling suddenly dizzy, lightheaded, or spaced out (derealization) in a warm, crowded hallway',
    statement: '"I feel floaty and unreal, like I\'m watching myself from outside my body. I am going crazy or losing touch with reality."',
    options: [
      {
        id: 'phys-4-a',
        text: 'Sensory 5-4-3-2-1 anchor: "Feeling spaced out (derealization) is a common, harmless defense mechanism when the brain is overstimulated by heat and noise. I am completely safe and sane. I will plant both feet firmly, touch a cool wall, find 3 blue things, and name them in my mind."',
        isCorrect: true,
        explanation: '5-4-3-2-1 sensory grounding pulls consciousness back into the physical present and dispels derealization.'
      },
      {
        id: 'phys-4-b',
        text: 'Panic and think you are entering a permanent psychiatric psychosis.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Derealization during anxiety is an over-filtering of sensory data, completely separate from psychosis.'
      },
      {
        id: 'phys-4-c',
        text: 'Close your eyes and sprint blindly toward the exit.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Running blindly while dizzy increases the risk of tripping or bumping into people.'
      },
      {
        id: 'phys-4-d',
        text: 'Pinch yourself hard until it bruises to check if you are dreaming.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Hurting yourself is never an appropriate grounding technique; gentle sensory touch is.'
      }
    ],
    educationalInsight: 'Derealization and depersonalization are the brain\'s "circuit breakers" when overstimulated. It is 100% temporary and harmless—grounding through physical senses restores presence.',
    cbtTechnique: '5-4-3-2-1 Sensory Grounding'
  },
  {
    id: 'phys-5',
    category: 'physical',
    scenario: 'Trying to fall asleep on Sunday night before school starts, but muscles are tense and mind won\'t stop racing',
    statement: '"It is 1:00 AM and I am still wide awake. If I don\'t sleep right this second, tomorrow will be an utter catastrophe and I\'ll collapse during class."',
    options: [
      {
        id: 'phys-5-a',
        text: 'Check the clock every 3 minutes, calculate how many hours of sleep you have left, and panic more.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Clock-watching triggers math calculations and alertness spikes, guaranteeing wakefulness.'
      },
      {
        id: 'phys-5-b',
        text: 'Turn on your phone screen, play video games, and blast bright blue light into your eyes until 4:00 AM.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Blue light suppresses melatonin production and destroys circadian rhythm.'
      },
      {
        id: 'phys-5-c',
        text: 'Sleep paradox reframe: "Even if I just lie here quietly with eyes closed, my body and brain are still getting 70% of the restorative benefits of physical rest. Sleep doesn\'t have to be forced. I will turn the clock away, do progressive muscle relaxation from my toes to head, and let my mind wander."',
        isCorrect: true,
        explanation: 'Releasing the "performance demand" to fall asleep instantly removes sleep anxiety.'
      },
      {
        id: 'phys-5-d',
        text: 'Take multiple unprescribed sleeping pills without asking a parent or doctor.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Taking unprescribed medications is dangerous and habit-forming.'
      }
    ],
    educationalInsight: 'Sleep paradox: you cannot force sleep; sleep only arrives when you stop demanding it. Resting peacefully in the dark provides significant biological restoration even if you drift.',
    cbtTechnique: 'Paradoxical Sleep Reframe & Progressive Muscle Relaxation'
  },
  {
    id: 'phys-6',
    category: 'physical',
    scenario: 'Feeling a sudden hot flash, blushing, and burning cheeks during a debate or conversation',
    statement: '"My face is burning hot red. Everyone can see how flustered and weak I am. I want the ground to swallow me whole."',
    options: [
      {
        id: 'phys-6-a',
        text: 'Cover your face with both hands, apologize frantically, and run to the bathroom.',
        isCorrect: false,
        trapType: 'Avoidance & Escape',
        explanation: 'Highlighting blushing draws far more attention than the flush itself.'
      },
      {
        id: 'phys-6-b',
        text: 'Blush acceptance + cooling thought: "Blushing is an involuntary surge of capillary blood flow—it actually signals sincerity and social awareness, not weakness! People find modest blushing endearing. I will rest my palms on my cool desk and keep speaking."',
        isCorrect: true,
        explanation: 'Accepts the involuntary blush, uses physical desk cooling, and reframes it as a sign of empathy and sincerity.'
      },
      {
        id: 'phys-6-c',
        text: 'Punch your own cheeks to disguise the blush with pain.',
        isCorrect: false,
        trapType: 'Emotional Reasoning',
        explanation: 'Self-harm or punishing physical responses creates acute distress.'
      },
      {
        id: 'phys-6-d',
        text: 'Assume that everyone will remember your red face for the rest of your life.',
        isCorrect: false,
        trapType: 'Catastrophizing',
        explanation: 'Peers forget flushed cheeks in less than 30 seconds.'
      }
    ],
    educationalInsight: 'Blushing is controlled by the sympathetic nervous system and cannot be stopped by willpower. Studies show that people who blush during social gaffes are judged as MORE trustworthy and likable by their peers.',
    cbtTechnique: 'Radical Acceptance of Physiological Flushing'
  }
];

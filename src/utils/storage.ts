import { AnxietyType, SessionResult, UserProgress } from '../types';
import { BADGES } from '../data/badges';

const STORAGE_KEY = 'mindease_user_progress_v1';

const getTodayString = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const INITIAL_PROGRESS: UserProgress = {
  nickname: 'Mindful Explorer',
  avatar: '🦊',
  xp: 0,
  level: 1,
  streak: 1,
  lastActiveDay: getTodayString(),
  totalCheckIns: 0,
  totalStatementsAnswered: 0,
  totalCorrect: 0,
  categoryPerformance: {
    academic: { answered: 0, correct: 0 },
    social: { answered: 0, correct: 0 },
    digital: { answered: 0, correct: 0 },
    body_image: { answered: 0, correct: 0 },
    future: { answered: 0, correct: 0 },
    physical: { answered: 0, correct: 0 }
  },
  unlockedBadges: [],
  history: [],
  soundEnabled: true
};

export const loadUserProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed: UserProgress = JSON.parse(raw);

    // Verify and update streak
    const today = getTodayString();
    if (parsed.lastActiveDay !== today) {
      const last = new Date(parsed.lastActiveDay);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        parsed.streak += 1;
      } else if (diffDays > 1) {
        parsed.streak = 1;
      }
      parsed.lastActiveDay = today;
      saveUserProgress(parsed);
    }

    return { ...INITIAL_PROGRESS, ...parsed };
  } catch {
    return INITIAL_PROGRESS;
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress', e);
  }
};

export const calculateLevel = (xp: number): { level: number; title: string; currentLevelXp: number; nextLevelXp: number; progressPercent: number } => {
  const xpPerLevel = 100;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const nextLevelXp = xpPerLevel;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / nextLevelXp) * 100));

  const titles = [
    'Curious Spark',
    'Grounded Scout',
    'Thought Alchemist',
    'Calm Navigator',
    'Serenity Champion',
    'Resilience Legend'
  ];

  const title = titles[Math.min(level - 1, titles.length - 1)];

  return { level, title, currentLevelXp, nextLevelXp, progressPercent };
};

export const checkForNewBadges = (progress: UserProgress, lastSession?: SessionResult): string[] => {
  const newlyUnlocked: string[] = [];

  for (const badge of BADGES) {
    if (progress.unlockedBadges.includes(badge.id)) continue;

    let qualifies = false;

    switch (badge.id) {
      case 'first-breath':
        qualifies = progress.totalCheckIns >= 1;
        break;
      case 'sharp-mind':
        qualifies = Boolean(lastSession && lastSession.scorePercentage === 100 && lastSession.totalStatements >= 5);
        break;
      case 'mindful-explorer':
        qualifies = progress.totalCheckIns >= 5;
        break;
      case 'trap-detective':
        qualifies = progress.totalCorrect >= 10;
        break;
      case 'exam-zen':
        qualifies = progress.categoryPerformance.academic.correct >= 5;
        break;
      case 'social-fearless':
        qualifies = progress.categoryPerformance.social.correct >= 5;
        break;
      case 'digital-zen':
        qualifies = progress.categoryPerformance.digital.correct >= 5;
        break;
      case 'body-compassion':
        qualifies = progress.categoryPerformance.body_image.correct >= 5;
        break;
      case 'future-vision':
        qualifies = progress.categoryPerformance.future.correct >= 5;
        break;
      case 'body-calm':
        qualifies = progress.categoryPerformance.physical.correct >= 5;
        break;
      case 'streak-fire':
        qualifies = progress.streak >= 3;
        break;
      case 'zenith-titan':
        qualifies = progress.xp >= 500;
        break;
    }

    if (qualifies) {
      newlyUnlocked.push(badge.id);
    }
  }

  return newlyUnlocked;
};

export const recordSessionCompletion = (
  currentProgress: UserProgress,
  session: SessionResult
): { updatedProgress: UserProgress; newlyUnlockedBadges: string[] } => {
  const updatedCategoryPerf = { ...currentProgress.categoryPerformance };

  // Update category stats
  (Object.keys(session.categoryScores) as AnxietyType[]).forEach((cat) => {
    const s = session.categoryScores[cat];
    if (s && s.total > 0) {
      updatedCategoryPerf[cat] = {
        answered: (updatedCategoryPerf[cat]?.answered || 0) + s.total,
        correct: (updatedCategoryPerf[cat]?.correct || 0) + s.correct
      };
    }
  });

  const tempProgress: UserProgress = {
    ...currentProgress,
    xp: currentProgress.xp + session.xpEarned,
    level: Math.floor((currentProgress.xp + session.xpEarned) / 100) + 1,
    totalCheckIns: currentProgress.totalCheckIns + 1,
    totalStatementsAnswered: currentProgress.totalStatementsAnswered + session.totalStatements,
    totalCorrect: currentProgress.totalCorrect + session.correctCount,
    categoryPerformance: updatedCategoryPerf,
    history: [session, ...currentProgress.history].slice(0, 20)
  };

  const newBadges = checkForNewBadges(tempProgress, session);
  const finalProgress: UserProgress = {
    ...tempProgress,
    unlockedBadges: [...tempProgress.unlockedBadges, ...newBadges]
  };

  saveUserProgress(finalProgress);
  return { updatedProgress: finalProgress, newlyUnlockedBadges: newBadges };
};

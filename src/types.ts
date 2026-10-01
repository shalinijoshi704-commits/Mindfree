/**
 * Type definitions for MindEase: Teen Anxiety Check-In & Coping Lab
 */

export type AnxietyType =
  | 'academic'
  | 'social'
  | 'digital'
  | 'body_image'
  | 'future'
  | 'physical';

export interface AnxietyCategoryMeta {
  id: AnxietyType;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  icon: string;
}

export interface StatementOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  trapType?: 'Catastrophizing' | 'Avoidance & Escape' | 'Mind Reading & Assumption' | 'All-or-Nothing Perfectionism' | 'Toxic Positivity / Suppression' | 'Emotional Reasoning';
}

export interface CheckInStatement {
  id: string;
  category: AnxietyType;
  scenario: string;
  statement: string;
  options: StatementOption[];
  educationalInsight: string;
  cbtTechnique: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  category: 'milestone' | 'accuracy' | 'streak' | 'category_master';
  unlockedAt?: string;
  targetCount: number;
}

export interface CategoryStat {
  answered: number;
  correct: number;
}

export interface CopingStrategy {
  id: string;
  category: AnxietyType;
  title: string;
  tagline: string;
  steps: string[];
  inSchoolTip: string;
  scienceExplanation: string;
  timeEstimate: string;
  interactiveTool?: 'breathing' | 'grounding' | 'reframing';
}

export interface SessionResult {
  id: string;
  timestamp: number;
  totalStatements: number;
  correctCount: number;
  scorePercentage: number;
  xpEarned: number;
  timeSpentSeconds: number;
  categoryScores: Record<AnxietyType, { total: number; correct: number }>;
  newlyUnlockedBadges: string[];
  recommendedStrategies: CopingStrategy[];
  answers: Array<{
    statementId: string;
    statement: string;
    category: AnxietyType;
    selectedOptionId: string;
    isCorrect: boolean;
    correctOptionText: string;
  }>;
}

export interface UserProgress {
  nickname: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDay: string;
  totalCheckIns: number;
  totalStatementsAnswered: number;
  totalCorrect: number;
  categoryPerformance: Record<AnxietyType, CategoryStat>;
  unlockedBadges: string[];
  history: SessionResult[];
  soundEnabled: boolean;
}

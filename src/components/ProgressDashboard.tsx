import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Flame,
  Zap,
  CheckCircle2,
  Lock,
  Calendar,
  Compass,
  TrendingUp,
  Brain,
  ShieldCheck,
  ChevronRight,
  Clock
} from 'lucide-react';
import { UserProgress, Badge, AnxietyType } from '../types';
import { BADGES } from '../data/badges';
import { ANXIETY_CATEGORIES } from '../data/anxietyCategories';
import { calculateLevel } from '../utils/storage';

interface ProgressDashboardProps {
  progress: UserProgress;
  onStartNewCheckIn: () => void;
  onOpenProfile: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onStartNewCheckIn,
  onOpenProfile
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const { level, title, currentLevelXp, nextLevelXp, progressPercent } = calculateLevel(progress.xp);

  const overallAccuracy =
    progress.totalStatementsAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalStatementsAnswered) * 100)
      : 0;

  // Filter badges
  const filteredBadges = BADGES.filter((b) => {
    const isUnlocked = progress.unlockedBadges.includes(b.id);
    if (badgeFilter === 'unlocked') return isUnlocked;
    if (badgeFilter === 'locked') return !isUnlocked;
    return true;
  });

  const unlockedCount = progress.unlockedBadges.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{progress.avatar}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {progress.nickname}&apos;s Resilience Journey
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Track your cognitive reframing mastery, unlocked badges, and check-in history.
          </p>
        </div>

        <button
          onClick={onStartNewCheckIn}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Check-In</span>
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {/* Streak */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {progress.streak} <span className="text-xs font-normal text-slate-400">Days</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Daily Streak
            </div>
          </div>
        </div>

        {/* Check-ins completed */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {progress.totalCheckIns}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Sessions Done
            </div>
          </div>
        </div>

        {/* Overall Accuracy */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {overallAccuracy}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Reframing Accuracy
            </div>
          </div>
        </div>

        {/* Badges unlocked */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-500 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {unlockedCount} / {BADGES.length}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Badges Earned
            </div>
          </div>
        </div>
      </div>

      {/* Level & XP Progression Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-inner">
              {progress.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-300">
                  Level {level}
                </span>
                <span className="w-1 h-1 rounded-full bg-indigo-300" />
                <span className="text-xs font-semibold text-slate-300">{title}</span>
              </div>
              <h2 className="text-2xl font-black">{progress.nickname}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
            <Zap className="w-4 h-4 fill-amber-300" />
            <span>{progress.xp} Total XP</span>
          </div>
        </div>

        {/* Level XP Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
            <span>Progress to Level {level + 1}</span>
            <span>
              {currentLevelXp} / {nextLevelXp} XP ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Anxiety Domain Mastery Progress Bars */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Teen Anxiety Category Mastery
            </h2>
          </div>
          <span className="text-xs text-slate-400">Cumulative accuracy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {(Object.keys(ANXIETY_CATEGORIES) as AnxietyType[]).map((catKey) => {
            const meta = ANXIETY_CATEGORIES[catKey];
            const stat = progress.categoryPerformance[catKey] || { answered: 0, correct: 0 };
            const rate = stat.answered > 0 ? Math.round((stat.correct / stat.answered) * 100) : 0;

            return (
              <div
                key={catKey}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-700"
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${meta.bgColor} border ${meta.borderColor}`} />
                    <span className="text-slate-800 dark:text-slate-200 font-extrabold">
                      {meta.label}
                    </span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400">
                    {stat.correct}/{stat.answered} ({rate}%)
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${rate}%`,
                      backgroundColor: meta.accentColor
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gamified Badges Trophy Cabinet */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Trophy Cabinet: Collectible Badges
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Unlock badges by maintaining streaks, acing check-in quests, and conquering thinking traps.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setBadgeFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                badgeFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              All ({BADGES.length})
            </button>
            <button
              onClick={() => setBadgeFilter('unlocked')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                badgeFilter === 'unlocked'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => setBadgeFilter('locked')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                badgeFilter === 'locked'
                  ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-300 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Locked ({BADGES.length - unlockedCount})
            </button>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);

            const tierBorder =
              badge.tier === 'diamond'
                ? 'border-cyan-400/50'
                : badge.tier === 'gold'
                ? 'border-amber-400/50'
                : badge.tier === 'silver'
                ? 'border-slate-300'
                : 'border-amber-600/30';

            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isUnlocked
                    ? `bg-white dark:bg-slate-800/90 ${tierBorder} hover:shadow-lg hover:scale-102`
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-2xl w-10 h-10 rounded-xl flex items-center justify-center ${
                        isUnlocked
                          ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isUnlocked ? '🌟' : <Lock className="w-4 h-4 text-slate-400" />}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        badge.tier === 'diamond'
                          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                          : badge.tier === 'gold'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {badge.tier}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold">
                  {isUnlocked ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="text-slate-400">In Progress</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Check-In History Log */}
      {progress.history.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Recent Check-In History
            </h2>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {progress.history.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="py-3.5 flex items-center justify-between gap-4 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      session.scorePercentage >= 80
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    }`}
                  >
                    {session.scorePercentage}%
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {session.correctCount} of {session.totalStatements} Correct
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {new Date(session.timestamp).toLocaleDateString()} • {session.timeSpentSeconds}s duration
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold text-xs">
                    +{session.xpEarned} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

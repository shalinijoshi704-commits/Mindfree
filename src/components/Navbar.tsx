import React from 'react';
import { Sparkles, Flame, Volume2, VolumeX, ShieldAlert, Award, Compass, HeartPulse, User } from 'lucide-react';
import { UserProgress } from '../types';
import { calculateLevel } from '../utils/storage';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  progress: UserProgress;
  activeTab: 'quiz' | 'progress' | 'toolbox';
  onSelectTab: (tab: 'quiz' | 'progress' | 'toolbox') => void;
  onOpenProfile: () => void;
  onOpenCrisis: () => void;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  activeTab,
  onSelectTab,
  onOpenProfile,
  onOpenCrisis,
  onToggleSound
}) => {
  const { level, title, currentLevelXp, nextLevelXp, progressPercent } = calculateLevel(progress.xp);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none" onClick={() => onSelectTab('quiz')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                MindEase
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                Ages 12-18
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Teen Anxiety Check-In & Coping Lab
            </p>
          </div>
        </div>

        {/* Central Nav Tabs */}
        <nav className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <button
            onClick={() => onSelectTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Check-In</span>
          </button>

          <button
            onClick={() => onSelectTab('progress')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'progress'
                ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Progress & Badges</span>
          </button>

          <button
            onClick={() => onSelectTab('toolbox')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'toolbox'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>Coping Tools</span>
          </button>
        </nav>

        {/* Right Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak */}
          <div
            title={`Active Check-in Streak: ${progress.streak} days`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 text-xs font-bold"
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
            <span>{progress.streak}d</span>
          </div>

          {/* Level Pill */}
          <div
            onClick={onOpenProfile}
            title={`Level ${level}: ${title} (${currentLevelXp}/${nextLevelXp} XP)`}
            className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
          >
            <div className="text-sm">{progress.avatar}</div>
            <div className="text-left leading-none">
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                Lv.{level} {title}
              </div>
              <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-0.5 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.enabled = !progress.soundEnabled;
            }}
            title={progress.soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {progress.soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Crisis / Support Fast Button */}
          <button
            onClick={onOpenCrisis}
            title="Need immediate help or someone to talk to?"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-semibold transition-all shadow-xs"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="hidden sm:inline">Teen Help</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={onOpenProfile}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-lg"
            title="Profile & Settings"
          >
            <span>{progress.avatar}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

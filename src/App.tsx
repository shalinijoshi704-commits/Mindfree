import React, { useState, useEffect } from 'react';
import { UserProgress, SessionResult } from './types';
import {
  loadUserProgress,
  saveUserProgress,
  recordSessionCompletion,
  INITIAL_PROGRESS,
  checkForNewBadges
} from './utils/storage';
import { soundManager } from './utils/audio';
import { Navbar } from './components/Navbar';
import { CheckInQuiz } from './components/CheckInQuiz';
import { ResultsSummary } from './components/ResultsSummary';
import { ProgressDashboard } from './components/ProgressDashboard';
import { CopingToolbox } from './components/CopingToolbox';
import { CrisisResourcesModal } from './components/CrisisResourcesModal';
import { ProfileModal } from './components/ProfileModal';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [activeTab, setActiveTab] = useState<'quiz' | 'progress' | 'toolbox'>('quiz');
  const [currentSessionResult, setCurrentSessionResult] = useState<SessionResult | null>(null);
  const [toolboxInitialTool, setToolboxInitialTool] = useState<'breathing' | 'grounding' | 'reframing'>('breathing');

  // Modals
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Sync sound manager enabled state
  useEffect(() => {
    soundManager.enabled = progress.soundEnabled;
  }, [progress.soundEnabled]);

  // When a quiz session finishes
  const handleFinishSession = (result: SessionResult) => {
    const { updatedProgress, newlyUnlockedBadges } = recordSessionCompletion(progress, result);
    setProgress(updatedProgress);

    // Attach newly unlocked badges to current result for celebratory display
    const finalResult: SessionResult = {
      ...result,
      newlyUnlockedBadges
    };
    setCurrentSessionResult(finalResult);
  };

  // Start new check-in
  const handleStartNewCheckIn = () => {
    setCurrentSessionResult(null);
    setActiveTab('quiz');
  };

  // Award XP from tools (breathing, journaling)
  const handleAwardXp = (amount: number, reason: string) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      const updated: UserProgress = {
        ...prev,
        xp: newXp,
        level: newLevel
      };
      const newBadges = checkForNewBadges(updated);
      const final: UserProgress = {
        ...updated,
        unlockedBadges: [...updated.unlockedBadges, ...newBadges]
      };
      saveUserProgress(final);
      return final;
    });
  };

  // Sound toggle
  const handleToggleSound = () => {
    setProgress((prev) => {
      const updated = { ...prev, soundEnabled: !prev.soundEnabled };
      saveUserProgress(updated);
      soundManager.enabled = updated.soundEnabled;
      return updated;
    });
  };

  // Update Profile
  const handleUpdateProfile = (nickname: string, avatar: string) => {
    setProgress((prev) => {
      const updated = { ...prev, nickname, avatar };
      saveUserProgress(updated);
      return updated;
    });
  };

  // Reset Progress
  const handleResetProgress = () => {
    saveUserProgress(INITIAL_PROGRESS);
    setProgress(INITIAL_PROGRESS);
    setCurrentSessionResult(null);
  };

  // Navigate to specific tool in toolbox
  const handleOpenSpecificTool = (tool?: 'breathing' | 'grounding' | 'reframing') => {
    if (tool) setToolboxInitialTool(tool);
    setCurrentSessionResult(null);
    setActiveTab('toolbox');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        progress={progress}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'quiz' && currentSessionResult) {
            // Keep on results if they want to review or allow new check-in
          }
          setActiveTab(tab);
        }}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenCrisis={() => setIsCrisisModalOpen(true)}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* CHECK-IN TAB */}
        {activeTab === 'quiz' && (
          <>
            {currentSessionResult ? (
              <ResultsSummary
                result={currentSessionResult}
                onRetake={handleStartNewCheckIn}
                onExploreToolbox={handleOpenSpecificTool}
                onViewBadges={() => {
                  setCurrentSessionResult(null);
                  setActiveTab('progress');
                }}
                userName={progress.nickname}
              />
            ) : (
              <CheckInQuiz
                onFinishSession={handleFinishSession}
                onExploreToolbox={() => {
                  setActiveTab('toolbox');
                }}
                userName={progress.nickname}
              />
            )}
          </>
        )}

        {/* PROGRESS & BADGES TAB */}
        {activeTab === 'progress' && (
          <ProgressDashboard
            progress={progress}
            onStartNewCheckIn={handleStartNewCheckIn}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {/* COPING TOOLBOX TAB */}
        {activeTab === 'toolbox' && (
          <CopingToolbox
            initialTool={toolboxInitialTool}
            onAwardXp={handleAwardXp}
          />
        )}
      </main>

      {/* Supportive Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>MindEase Anxiety Lab • Designed for Youth Ages 12-18</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Cognitive Behavioral Therapy (CBT) Framework</span>
            <button
              onClick={() => setIsCrisisModalOpen(true)}
              className="text-rose-600 dark:text-rose-400 font-bold hover:underline"
            >
              Need immediate support?
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CrisisResourcesModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        progress={progress}
        onUpdateProfile={handleUpdateProfile}
        onToggleSound={handleToggleSound}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}

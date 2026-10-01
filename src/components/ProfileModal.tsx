import React, { useState } from 'react';
import { X, Check, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import { UserProgress } from '../types';
import { calculateLevel } from '../utils/storage';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateProfile: (nickname: string, avatar: string) => void;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

const AVATARS = ['🦊', '🐼', '🦉', '🐬', '🐯', '🌟', '🚀', '🌸', '⚡', '🧘', '🦄', '🎧'];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  progress,
  onUpdateProfile,
  onToggleSound,
  onResetProgress
}) => {
  const [nickname, setNickname] = useState<string>(progress.nickname);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(progress.avatar);

  if (!isOpen) return null;

  const { level, title } = calculateLevel(progress.xp);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onUpdateProfile(nickname.trim(), selectedAvatar);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">
          Profile & Preferences
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Level {level} • {title}
        </p>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Choose Your Companion Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setSelectedAvatar(av)}
                  className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center border-2 transition-all ${
                    selectedAvatar === av
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 scale-105 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Nickname Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Your Nickname
            </label>
            <input
              type="text"
              maxLength={20}
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sound Preferences */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {progress.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-indigo-500" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Calming Audio & Chimes
                </div>
                <div className="text-[11px] text-slate-400">
                  Pleasant sounds for answers & breathing
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleSound}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                progress.soundEnabled
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {progress.soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                if (confirm('Reset all streaks, XP, and badges back to Level 1?')) {
                  onResetProgress();
                  onClose();
                }
              }}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progress</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

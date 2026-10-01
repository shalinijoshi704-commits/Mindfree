import React, { useState, useEffect, useRef } from 'react';
import {
  HeartPulse,
  Wind,
  Eye,
  Brain,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  BookOpen,
  Filter,
  Check,
  Smile,
  Volume2
} from 'lucide-react';
import { CopingStrategy, AnxietyType } from '../types';
import { COPING_STRATEGIES } from '../data/copingStrategies';
import { ANXIETY_CATEGORIES } from '../data/anxietyCategories';
import { soundManager } from '../utils/audio';

interface CopingToolboxProps {
  initialTool?: 'breathing' | 'grounding' | 'reframing';
  onAwardXp: (amount: number, reason: string) => void;
}

export const CopingToolbox: React.FC<CopingToolboxProps> = ({
  initialTool = 'breathing',
  onAwardXp
}) => {
  const [activeTab, setActiveTab] = useState<'breathing' | 'grounding' | 'reframing' | 'library'>(
    initialTool
  );

  // Filter for library
  const [selectedCategory, setSelectedCategory] = useState<AnxietyType | 'all'>('all');

  // ==========================================
  // BOX BREATHING ENGINE
  // ==========================================
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)'>('Inhale');
  const [breathSecondsLeft, setBreathSecondsLeft] = useState<number>(4);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isBreathingActive) {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
      return;
    }

    breathTimerRef.current = setInterval(() => {
      setBreathSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition phases
        setBreathPhase((currentPhase) => {
          if (currentPhase === 'Inhale') {
            soundManager.playBreathingBell('hold');
            return 'Hold (Full)';
          }
          if (currentPhase === 'Hold (Full)') {
            soundManager.playBreathingBell('exhale');
            return 'Exhale';
          }
          if (currentPhase === 'Exhale') {
            soundManager.playBreathingBell('hold');
            return 'Hold (Empty)';
          }
          // After Hold (Empty), cycle complete
          setCyclesCompleted((c) => {
            const next = c + 1;
            if (next === 4) {
              onAwardXp(30, 'Completed 4 Box Breathing Cycles');
              soundManager.playBadgeUnlock();
            }
            return next;
          });
          soundManager.playBreathingBell('inhale');
          return 'Inhale';
        });

        return 4; // 4 seconds per phase
      });
    }, 1000);

    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [isBreathingActive, onAwardXp]);

  const toggleBreathing = () => {
    if (!isBreathingActive) {
      setBreathPhase('Inhale');
      setBreathSecondsLeft(4);
      soundManager.playBreathingBell('inhale');
      setIsBreathingActive(true);
    } else {
      setIsBreathingActive(false);
    }
  };

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('Inhale');
    setBreathSecondsLeft(4);
    setCyclesCompleted(0);
  };

  // ==========================================
  // 5-4-3-2-1 GROUNDING STATE
  // ==========================================
  const [groundingStep, setGroundingStep] = useState<number>(5);
  const [groundingInputs, setGroundingInputs] = useState<Record<number, string[]>>({
    5: ['', '', '', '', ''],
    4: ['', '', '', ''],
    3: ['', '', ''],
    2: ['', ''],
    1: ['']
  });
  const [groundingCompleted, setGroundingCompleted] = useState<boolean>(false);

  const handleGroundingChange = (step: number, index: number, value: string) => {
    setGroundingInputs((prev) => {
      const copy = [...prev[step]];
      copy[index] = value;
      return { ...prev, [step]: copy };
    });
  };

  const handleCompleteGroundingStep = () => {
    if (groundingStep > 1) {
      setGroundingStep((prev) => prev - 1);
      soundManager.playCorrect();
    } else {
      setGroundingCompleted(true);
      soundManager.playBadgeUnlock();
      onAwardXp(30, 'Completed 5-4-3-2-1 Sensory Grounding');
    }
  };

  // ==========================================
  // THOUGHT RE-FRAMER JOURNAL
  // ==========================================
  const [journalWorry, setJournalWorry] = useState<string>('');
  const [journalTrap, setJournalTrap] = useState<string>('Catastrophizing');
  const [journalEvidence, setJournalEvidence] = useState<string>('');
  const [journalReframe, setJournalReframe] = useState<string>('');
  const [savedReframes, setSavedReframes] = useState<
    Array<{
      id: string;
      worry: string;
      trap: string;
      reframe: string;
      date: string;
    }>
  >(() => {
    try {
      const stored = localStorage.getItem('mindease_saved_reframes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleSaveReframe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalWorry.trim() || !journalReframe.trim()) return;

    const newEntry = {
      id: `ref_${Date.now()}`,
      worry: journalWorry,
      trap: journalTrap,
      reframe: journalReframe,
      date: new Date().toLocaleDateString()
    };

    const updated = [newEntry, ...savedReframes];
    setSavedReframes(updated);
    try {
      localStorage.setItem('mindease_saved_reframes', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    soundManager.playBadgeUnlock();
    onAwardXp(25, 'Created a Healthy Cognitive Reframe');

    setJournalWorry('');
    setJournalEvidence('');
    setJournalReframe('');
  };

  const handleDeleteReframe = (id: string) => {
    const updated = savedReframes.filter((r) => r.id !== id);
    setSavedReframes(updated);
    localStorage.setItem('mindease_saved_reframes', JSON.stringify(updated));
  };

  // Library filtered items
  const filteredStrategies = COPING_STRATEGIES.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Interactive Teen Coping Toolkit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Your Personal Calming Lab
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Interactive tools you can practice whenever adrenaline surges, thoughts spiral, or school stress peaks.
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl max-w-xl mx-auto">
        <button
          onClick={() => setActiveTab('breathing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'breathing'
              ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>Box Breathing Pacer</span>
        </button>

        <button
          onClick={() => setActiveTab('grounding')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'grounding'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>5-4-3-2-1 Sensory Reset</span>
        </button>

        <button
          onClick={() => setActiveTab('reframing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'reframing'
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Thought Re-Framer</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'library'
              ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Strategy Guide</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: BOX BREATHING PACER                                    */}
      {/* ============================================================== */}
      {activeTab === 'breathing' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-md text-center max-w-2xl mx-auto animate-fadeIn">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-bold mb-4">
            <Wind className="w-3.5 h-3.5" />
            <span>4-4-4-4 Navy SEAL Resonance Protocol</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Rhythmic Box Breathing
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Equalizes oxygen & CO2, activates the vagus nerve, and physically slows racing heartbeat.
          </p>

          {/* Animated Visual Breathing Orb */}
          <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
            {/* Outer Pulsing Rings */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${
                isBreathingActive && (breathPhase === 'Inhale' || breathPhase === 'Hold (Full)')
                  ? 'bg-teal-500/20 scale-100'
                  : 'bg-teal-500/5 scale-75'
              }`}
            />
            <div
              className={`absolute w-52 h-52 rounded-full transition-all duration-1000 ease-in-out ${
                isBreathingActive && (breathPhase === 'Inhale' || breathPhase === 'Hold (Full)')
                  ? 'bg-teal-500/30 scale-100'
                  : 'bg-teal-500/10 scale-80'
              }`}
            />

            {/* Inner Core Ball */}
            <div
              className={`relative z-10 w-40 h-40 rounded-full bg-gradient-to-tr from-teal-500 via-emerald-400 to-cyan-500 text-white shadow-2xl shadow-teal-500/30 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
                isBreathingActive
                  ? breathPhase === 'Inhale'
                    ? 'scale-110'
                    : breathPhase === 'Hold (Full)'
                    ? 'scale-110 ring-8 ring-white/30'
                    : breathPhase === 'Exhale'
                    ? 'scale-85'
                    : 'scale-85 ring-4 ring-white/10'
                  : 'scale-95'
              }`}
            >
              <span className="text-xs uppercase font-extrabold tracking-widest text-teal-100">
                {isBreathingActive ? breathPhase : 'Ready'}
              </span>
              <span className="text-4xl font-black my-1">
                {isBreathingActive ? breathSecondsLeft : '4s'}
              </span>
              <span className="text-[10px] text-teal-100">
                {cyclesCompleted} Cycles Done
              </span>
            </div>
          </div>

          {/* Guidance instruction */}
          <p className="text-xs sm:text-sm font-semibold text-teal-800 dark:text-teal-300 mb-6 h-6">
            {isBreathingActive ? (
              breathPhase === 'Inhale' ? (
                'Breathe in slowly through your nose...'
              ) : breathPhase === 'Hold (Full)' ? (
                'Hold breath gently with lungs comfortably full...'
              ) : breathPhase === 'Exhale' ? (
                'Exhale smoothly and completely through mouth...'
              ) : (
                'Quiet pause with empty lungs...'
              )
            ) : (
              'Press start and sync your breath with the expanding orb.'
            )}
          </p>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={toggleBreathing}
              className={`px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition-all ${
                isBreathingActive
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
              }`}
            >
              {isBreathingActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isBreathingActive ? 'Pause Exercise' : 'Start Box Breathing'}</span>
            </button>

            <button
              onClick={resetBreathing}
              title="Reset cycle counter"
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* In-school tip box */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-left text-xs">
            <strong className="text-slate-900 dark:text-white block mb-1">
              🏫 Discreet In-Class Hack:
            </strong>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Trace the four sides of your desk or notebook with your index finger while silently counting 4-4-4-4. Nobody will ever know you are doing a breathing reset!
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: 5-4-3-2-1 SENSORY GROUNDING                             */}
      {/* ============================================================== */}
      {activeTab === 'grounding' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-md max-w-2xl mx-auto animate-fadeIn">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-3">
              <Eye className="w-3.5 h-3.5" />
              <span>Sensory Reality Anchor</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              5-4-3-2-1 Sensory Grounding
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Pulls attention out of catastrophic spirals and firmly anchors it back into your present physical room.
            </p>
          </div>

          {!groundingCompleted ? (
            <div>
              {/* Stepper Progress Indicator */}
              <div className="flex items-center justify-between mb-8 max-w-sm mx-auto">
                {[5, 4, 3, 2, 1].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                      groundingStep === stepNum
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900 scale-110'
                        : groundingStep < stepNum
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {groundingStep < stepNum ? '✓' : stepNum}
                  </div>
                ))}
              </div>

              {/* Current Step Content */}
              <div className="bg-indigo-50/50 dark:bg-slate-900/40 rounded-2xl p-6 border border-indigo-100 dark:border-slate-700 mb-6">
                <div className="text-center mb-4">
                  <span className="text-3xl block mb-2">
                    {groundingStep === 5
                      ? '👀'
                      : groundingStep === 4
                      ? '✋'
                      : groundingStep === 3
                      ? '👂'
                      : groundingStep === 2
                      ? '👃'
                      : '👅'}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {groundingStep === 5 && 'Notice 5 things you can SEE'}
                    {groundingStep === 4 && 'Notice 4 things you can physically FEEL'}
                    {groundingStep === 3 && 'Notice 3 things you can HEAR'}
                    {groundingStep === 2 && 'Notice 2 things you can SMELL'}
                    {groundingStep === 1 && 'Notice 1 thing you can TASTE'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Look around right now. Type or mentally name each item:
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  {groundingInputs[groundingStep].map((val, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder={`Item ${idx + 1}... (e.g. ${
                        groundingStep === 5
                          ? ['blue notebook', 'door knob', 'ceiling light', 'shoes', 'clock'][idx]
                          : groundingStep === 4
                          ? ['smooth desk', 'hoodie fabric', 'feet on floor', 'cool air'][idx]
                          : groundingStep === 3
                          ? ['clock ticking', 'hum of computer', 'birds outside'][idx]
                          : groundingStep === 2
                          ? ['fresh air', 'pencil wood'][idx]
                          : 'mint gum / water'
                      })`}
                      value={val}
                      onChange={(e) => handleGroundingChange(groundingStep, idx, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ))}
                </div>

                <button
                  onClick={handleCompleteGroundingStep}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{groundingStep > 1 ? `Next Step (${groundingStep - 1} left)` : 'Finish Grounding'}</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                ✨
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                Sensory Presence Restored!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                Your brain has checked in with its actual physical surroundings. The threat signal has dropped.
              </p>
              <button
                onClick={() => {
                  setGroundingCompleted(false);
                  setGroundingStep(5);
                  setGroundingInputs({
                    5: ['', '', '', '', ''],
                    4: ['', '', '', ''],
                    3: ['', '', ''],
                    2: ['', ''],
                    1: ['']
                  });
                }}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md"
              >
                Reset Grounding Matrix
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: THOUGHT RE-FRAMER JOURNAL                               */}
      {/* ============================================================== */}
      {activeTab === 'reframing' && (
        <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
          {/* Creator Form */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                CBT Pocket Thought Re-Framer
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Turn an anxious spiral into an objective, self-compassionate action plan.
            </p>

            <form onSubmit={handleSaveReframe} className="space-y-4">
              {/* Step 1: The worry */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  1. What anxious thought is popping up?
                </label>
                <input
                  type="text"
                  required
                  placeholder='e.g. "If I fail this quiz, my life is ruined and everyone thinks I am dumb."'
                  value={journalWorry}
                  onChange={(e) => setJournalWorry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Step 2: Trap selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  2. Spot the Cognitive Trap:
                </label>
                <select
                  value={journalTrap}
                  onChange={(e) => setJournalTrap(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Catastrophizing">Catastrophizing (Assuming the worst possible outcome)</option>
                  <option value="Mind Reading & Assumption">Mind Reading (Assuming you know what peers think)</option>
                  <option value="All-or-Nothing Perfectionism">All-or-Nothing Perfectionism (Must be 100% or failure)</option>
                  <option value="Emotional Reasoning">Emotional Reasoning (Feeling anxious = actual danger)</option>
                  <option value="Avoidance & Escape">Avoidance (Running away to get short-term relief)</option>
                </select>
              </div>

              {/* Step 3: Realistic Reframe */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  3. Realistic, Compassionate Reframe:
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder='e.g. "One quiz is just a small checkpoint, not my whole life. I have studied before and I can ask the teacher for help."'
                  value={journalReframe}
                  onChange={(e) => setJournalReframe(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save Reframe to My Calm Journal (+25 XP)</span>
              </button>
            </form>
          </div>

          {/* Saved Reframes List */}
          {savedReframes.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                My Saved Reframes ({savedReframes.length})
              </h3>
              {savedReframes.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold text-[10px]">
                        Trap: {entry.trap}
                      </span>
                      <span className="text-[10px] text-slate-400">{entry.date}</span>
                    </div>
                    <p className="line-through text-slate-400 italic">
                      &quot;{entry.worry}&quot;
                    </p>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                      ✓ &quot;{entry.reframe}&quot;
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteReframe(entry.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: COMPLETE STRATEGY GUIDE LIBRARY                         */}
      {/* ============================================================== */}
      {activeTab === 'library' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              All Topics ({COPING_STRATEGIES.length})
            </button>
            {(Object.keys(ANXIETY_CATEGORIES) as AnxietyType[]).map((catKey) => {
              const meta = ANXIETY_CATEGORIES[catKey];
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === catKey
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {meta.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Strategy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStrategies.map((strat) => {
              const meta = ANXIETY_CATEGORIES[strat.category];
              return (
                <div
                  key={strat.id}
                  className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.bgColor} ${meta.color}`}>
                        {meta.shortLabel}
                      </span>
                      <span className="text-[11px] text-slate-400">{strat.timeEstimate}</span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                      {strat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      {strat.tagline}
                    </p>

                    <div className="space-y-1.5 mb-4 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl">
                      {strat.steps.map((st, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                            {i + 1}.
                          </span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 text-xs">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                      🏫 Discreet Classroom Tip:
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">{strat.inSchoolTip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

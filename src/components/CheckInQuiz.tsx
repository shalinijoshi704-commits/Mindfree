import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  RotateCcw,
  BookOpen,
  Filter,
  Check,
  Brain,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';
import { CheckInStatement, AnxietyType, StatementOption, SessionResult } from '../types';
import { ANXIETY_STATEMENTS } from '../data/anxietyStatements';
import { ANXIETY_CATEGORIES } from '../data/anxietyCategories';
import { COPING_STRATEGIES } from '../data/copingStrategies';
import { soundManager } from '../utils/audio';

interface CheckInQuizProps {
  onFinishSession: (result: SessionResult) => void;
  onExploreToolbox: () => void;
  userName: string;
}

type QuizMode = 'quick' | 'full' | 'category';

export const CheckInQuiz: React.FC<CheckInQuizProps> = ({
  onFinishSession,
  onExploreToolbox,
  userName
}) => {
  // Session Configuration State
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<QuizMode>('quick');
  const [selectedCategory, setSelectedCategory] = useState<AnxietyType | 'all'>('all');

  // Active Session State
  const [activeStatements, setActiveStatements] = useState<CheckInStatement[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<StatementOption[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Tracking metrics
  const [score, setScore] = useState<number>(0);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [sessionAnswers, setSessionAnswers] = useState<
    Array<{
      statementId: string;
      statement: string;
      category: AnxietyType;
      selectedOptionId: string;
      isCorrect: boolean;
      correctOptionText: string;
    }>
  >([]);

  // Start a new session with randomly sampled statements
  const startSession = (mode: QuizMode, cat: AnxietyType | 'all' = 'all') => {
    let pool = [...ANXIETY_STATEMENTS];

    if (cat !== 'all') {
      pool = pool.filter((s) => s.category === cat);
    }

    // Shuffle statements
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const count = mode === 'quick' ? 5 : mode === 'full' ? 10 : Math.min(6, shuffledPool.length);
    const chosenStatements = shuffledPool.slice(0, count);

    setActiveStatements(chosenStatements);
    setCurrentIndex(0);
    setScore(0);
    setSessionAnswers([]);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setSessionStartTime(Date.now());
    setIsSessionActive(true);
  };

  // Whenever statement changes, randomize its 4 options
  useEffect(() => {
    if (!isSessionActive || activeStatements.length === 0) return;
    const current = activeStatements[currentIndex];
    if (current) {
      // Shuffle options copy
      const shuffled = [...current.options].sort(() => 0.5 - Math.random());
      setShuffledOptions(shuffled);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    }
  }, [currentIndex, isSessionActive, activeStatements]);

  const currentStatement = activeStatements[currentIndex];
  const categoryMeta = currentStatement ? ANXIETY_CATEGORIES[currentStatement.category] : null;

  // Handle choice selection
  const handleSelectOption = (option: StatementOption) => {
    if (isAnswerSubmitted) return;

    setSelectedOptionId(option.id);
    setIsAnswerSubmitted(true);

    const isCorrect = option.isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      soundManager.playCorrect();
    } else {
      soundManager.playGentleNotice();
    }

    // Record answer
    const correctOption = currentStatement.options.find((o) => o.isCorrect);
    setSessionAnswers((prev) => [
      ...prev,
      {
        statementId: currentStatement.id,
        statement: currentStatement.statement,
        category: currentStatement.category,
        selectedOptionId: option.id,
        isCorrect,
        correctOptionText: correctOption?.text || ''
      }
    ]);
  };

  // Next statement or conclude session
  const handleNext = () => {
    if (currentIndex + 1 < activeStatements.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      concludeSession();
    }
  };

  // Build the final SessionResult object
  const concludeSession = () => {
    const elapsedSeconds = Math.round((Date.now() - sessionStartTime) / 1000);
    const total = activeStatements.length;
    const correctCount = score + (selectedOption?.isCorrect ? 0 : 0); // already tracked
    const percentage = Math.round((score / total) * 100);

    // Calculate category breakdowns
    const categoryScores: Record<AnxietyType, { total: number; correct: number }> = {
      academic: { total: 0, correct: 0 },
      social: { total: 0, correct: 0 },
      digital: { total: 0, correct: 0 },
      body_image: { total: 0, correct: 0 },
      future: { total: 0, correct: 0 },
      physical: { total: 0, correct: 0 }
    };

    sessionAnswers.forEach((ans) => {
      if (categoryScores[ans.category]) {
        categoryScores[ans.category].total += 1;
        if (ans.isCorrect) {
          categoryScores[ans.category].correct += 1;
        }
      }
    });

    // Find recommended strategies based on topics explored and any mistakes
    const exploredCategories = Array.from(new Set(sessionAnswers.map((a) => a.category)));
    const missedCategories = Array.from(new Set(sessionAnswers.filter((a) => !a.isCorrect).map((a) => a.category)));

    const priorityCategories = missedCategories.length > 0 ? missedCategories : exploredCategories;
    const recommended = COPING_STRATEGIES.filter((st) => priorityCategories.includes(st.category)).slice(0, 3);

    // Base XP: 20 XP per correct answer + 30 XP completion bonus + 20 XP if 100%
    const xpEarned = score * 20 + 30 + (percentage === 100 ? 25 : 0);

    const result: SessionResult = {
      id: `session_${Date.now()}`,
      timestamp: Date.now(),
      totalStatements: total,
      correctCount: score,
      scorePercentage: percentage,
      xpEarned,
      timeSpentSeconds: elapsedSeconds,
      categoryScores,
      newlyUnlockedBadges: [],
      recommendedStrategies: recommended,
      answers: sessionAnswers
    };

    setIsSessionActive(false);
    onFinishSession(result);
  };

  const selectedOption = shuffledOptions.find((o) => o.id === selectedOptionId);
  const correctOption = shuffledOptions.find((o) => o.isCorrect);

  // RENDER: Mode Selection / Dashboard Screen
  if (!isSessionActive) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
        {/* Welcome Hero */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Teen Coping Quest</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Hey, {userName}! Ready for your Anxiety Check-In?
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Test and train your real-world emotional resilience. Read realistic teen thoughts, identify the healthiest CBT coping reframes, and collect XP & badges.
          </p>
        </div>

        {/* Quest Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Quick Check-In */}
          <div
            onClick={() => {
              setSelectedMode('quick');
              startSession('quick', 'all');
            }}
            className="group relative bg-white dark:bg-slate-800/90 rounded-2xl p-6 border-2 border-indigo-100 hover:border-indigo-500 dark:border-slate-700 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[11px] font-bold">
              ~2 mins
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                Quick Daily Check-In
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                5 random teen statements across all anxiety types. Perfect for daily streak maintenance.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Start Quick Check-In</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Full Quest */}
          <div
            onClick={() => {
              setSelectedMode('full');
              startSession('full', 'all');
            }}
            className="group relative bg-white dark:bg-slate-800/90 rounded-2xl p-6 border-2 border-purple-100 hover:border-purple-500 dark:border-slate-700 dark:hover:border-purple-500 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 text-[11px] font-bold">
              ~5 mins
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                Full Resilience Quest
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                10 comprehensive statements evaluating all 6 core teen anxiety domains for an in-depth score & coping plan.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Launch Full Quest</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Category Focused */}
          <div
            onClick={() => setSelectedMode('category')}
            className={`group relative bg-white dark:bg-slate-800/90 rounded-2xl p-6 border-2 ${
              selectedMode === 'category'
                ? 'border-teal-500 ring-2 ring-teal-500/20'
                : 'border-teal-100 hover:border-teal-500 dark:border-slate-700 dark:hover:border-teal-500'
            } shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between`}
          >
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 text-[11px] font-bold">
              Custom
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                Category Drill-Down
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Target one specific area: School exams, social awkwardness, digital FOMO, body image, or panic symptoms.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Choose Anxiety Category</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Category Picker (if category mode or drill-down selected) */}
        {selectedMode === 'category' && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-8 animate-fadeIn">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Select an Anxiety Category to Practice:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(Object.keys(ANXIETY_CATEGORIES) as AnxietyType[]).map((catKey) => {
                const cat = ANXIETY_CATEGORIES[catKey];
                return (
                  <button
                    key={catKey}
                    onClick={() => {
                      setSelectedCategory(catKey);
                      startSession('category', catKey);
                    }}
                    className="p-4 rounded-xl text-left bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cat.bgColor} ${cat.color}`}>
                          {cat.shortLabel}
                        </span>
                        <span className="text-[11px] text-slate-400">6 Statements</span>
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">
                        {cat.label}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                    <div className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <span>Practice {cat.shortLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Teen Assurance & Science Note */}
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800 rounded-2xl p-5 border border-indigo-100 dark:border-slate-700 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Safe, Evidence-Based & Private
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Every statement and choice in MindEase is grounded in <strong>Cognitive Behavioral Therapy (CBT)</strong>, neuroscience, and adolescent psychology. Your answers are stored locally on your device. Take your time—reframing thoughts is a skill that gets stronger with every try!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Active Quiz / Check-In Question
  const progressPercent = Math.round(((currentIndex + 1) / activeStatements.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
      {/* Top Header & Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Check-In {currentIndex + 1} of {activeStatements.length}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${categoryMeta?.bgColor} ${categoryMeta?.color}`}>
              {categoryMeta?.shortLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <Check className="w-4 h-4" /> {score} Correct
            </span>
            <button
              onClick={() => {
                if (confirm('Exit this check-in session? Current progress will be lost.')) {
                  setIsSessionActive(false);
                }
              }}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* The Statement Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-700 shadow-md mb-6">
        {/* Context / Scenario Pill */}
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            Scenario: {currentStatement.scenario}
          </span>
        </div>

        {/* The Anxious Self-Talk Statement */}
        <div className="relative pl-6 sm:pl-8 border-l-4 border-indigo-400 dark:border-indigo-500 my-4">
          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed italic font-serif">
            {currentStatement.statement}
          </p>
        </div>

        {/* Challenge prompt */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          <HelpCircle className="w-4 h-4" />
          <span>Which of the following 4 options is the healthiest, evidence-based coping reframe?</span>
        </div>
      </div>

      {/* 4 Choices */}
      <div className="space-y-3 mb-6">
        {shuffledOptions.map((option, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedOptionId === option.id;
          const isCorrect = option.isCorrect;

          let cardStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/20';
          let letterStyle = 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';

          if (isAnswerSubmitted) {
            if (isCorrect) {
              cardStyle = 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20';
              letterStyle = 'bg-emerald-500 text-white font-bold';
            } else if (isSelected && !isCorrect) {
              cardStyle = 'border-rose-400 bg-rose-50/90 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
              letterStyle = 'bg-rose-500 text-white font-bold';
            } else {
              cardStyle = 'opacity-60 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400';
              letterStyle = 'bg-slate-200 dark:bg-slate-800 text-slate-400';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3 sm:gap-4 ${cardStyle} ${
                !isAnswerSubmitted ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 transition-colors ${letterStyle}`}
              >
                {letter}
              </div>

              <div className="flex-1">
                <p className="text-sm sm:text-base font-medium leading-relaxed">
                  {option.text}
                </p>

                {/* Show unhelpful trap tag if revealed */}
                {isAnswerSubmitted && option.trapType && (isSelected || !isCorrect) && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[11px] font-semibold">
                    <AlertCircle className="w-3 h-3" />
                    <span>Unhelpful Trap: {option.trapType}</span>
                  </div>
                )}
              </div>

              {/* Status Icon */}
              {isAnswerSubmitted && (
                <div className="flex-shrink-0 pt-0.5">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : isSelected ? (
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner (when answered) */}
      {isAnswerSubmitted && selectedOption && (
        <div
          className={`rounded-2xl p-5 sm:p-6 mb-6 border animate-fadeIn ${
            selectedOption.isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
              : 'bg-indigo-50/80 dark:bg-slate-800/90 border-indigo-200 dark:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {selectedOption.isCorrect ? (
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Spot on! That is the healthy CBT reframe. (+20 XP)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold text-sm">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span>Good learning moment! Let\'s analyze why:</span>
              </div>
            )}
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {/* Why the correct answer works */}
            <div>
              <strong className="text-slate-900 dark:text-white block mb-0.5">Why the Healthy Option Works:</strong>
              <p className="leading-relaxed">{correctOption?.explanation}</p>
            </div>

            {/* Why the chosen trap was risky (if incorrect) */}
            {!selectedOption.isCorrect && selectedOption.explanation && (
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700">
                <strong className="text-rose-700 dark:text-rose-400 block mb-0.5">
                  About the option you picked ({selectedOption.trapType || 'Thinking Trap'}):
                </strong>
                <p className="leading-relaxed">{selectedOption.explanation}</p>
              </div>
            )}

            {/* Educational CBT Technique Badge */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400">CBT Technique:</span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold">
                {currentStatement.cbtTechnique}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">
              💡 {currentStatement.educationalInsight}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2"
            >
              <span>{currentIndex + 1 < activeStatements.length ? 'Next Statement' : 'View Complete Results & Coping Plan'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

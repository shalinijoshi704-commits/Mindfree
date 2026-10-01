import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  HeartPulse,
  Share2,
  ChevronDown,
  ChevronUp,
  Brain,
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { SessionResult, AnxietyType, CopingStrategy } from '../types';
import { ANXIETY_CATEGORIES } from '../data/anxietyCategories';
import { BADGES } from '../data/badges';
import { soundManager } from '../utils/audio';

interface ResultsSummaryProps {
  result: SessionResult;
  onRetake: () => void;
  onExploreToolbox: (specificTool?: 'breathing' | 'grounding' | 'reframing') => void;
  onViewBadges: () => void;
  userName: string;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  result,
  onRetake,
  onExploreToolbox,
  onViewBadges,
  userName
}) => {
  const [copiedPlan, setCopiedPlan] = useState<boolean>(false);
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);

  // Trigger celebration on load
  useEffect(() => {
    // If great score or new badges, trigger confetti
    if (result.scorePercentage >= 70 || result.newlyUnlockedBadges.length > 0) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (result.newlyUnlockedBadges.length > 0) {
        soundManager.playBadgeUnlock();
      }
    }
  }, [result]);

  // Determine performance tier & encouragement
  let tierTitle = 'Mindful Apprentice';
  let tierMessage = 'You are building awareness of anxious thought traps! Every check-in rewires your brain for greater calm.';
  let tierColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200';

  if (result.scorePercentage >= 90) {
    tierTitle = 'Zenith Resilience Titan';
    tierMessage = 'Exceptional emotional intelligence! You spotted cognitive traps effortlessly and chose empowering reframes.';
    tierColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
  } else if (result.scorePercentage >= 70) {
    tierTitle = 'Resilient Navigator';
    tierMessage = 'Great work! You have strong grounding instincts and recognize healthy CBT alternatives in most teen scenarios.';
    tierColor = 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200';
  }

  // Find evaluated categories
  const activeCategories = (Object.keys(result.categoryScores) as AnxietyType[]).filter(
    (c) => result.categoryScores[c].total > 0
  );

  // Copy Calm Plan to Clipboard
  const handleCopyPlan = () => {
    const lines = [
      `🧘 My MindEase Pocket Calm Plan - ${userName}`,
      `Date: ${new Date(result.timestamp).toLocaleDateString()}`,
      `Score: ${result.correctCount}/${result.totalStatements} (${result.scorePercentage}%)`,
      '',
      '--- RECOMMENDED COPING STRATEGIES ---',
      ...result.recommendedStrategies.map((s, idx) => [
        `\n[${idx + 1}] ${s.title} (${ANXIETY_CATEGORIES[s.category]?.shortLabel})`,
        `💡 Focus: ${s.tagline}`,
        `⚡ In-School Discreet Tip: ${s.inSchoolTip}`,
        'Steps:',
        ...s.steps.map((st, i) => `  ${i + 1}. ${st}`)
      ].join('\n')),
      '',
      '🌟 Remember: Discomfort is not danger. Take one slow breath at a time.'
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Newly Unlocked Badges Pop-in */}
      {result.newlyUnlockedBadges.length > 0 && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-400/20 via-purple-400/20 to-pink-400/20 border-2 border-amber-300 dark:border-amber-600 flex flex-col sm:flex-row items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow-md">
              🏆
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                New Gamified Badge Unlocked!
              </div>
              <div className="font-extrabold text-slate-900 dark:text-white text-base">
                {result.newlyUnlockedBadges
                  .map((id) => BADGES.find((b) => b.id === id)?.title)
                  .filter(Boolean)
                  .join(', ')}
              </div>
            </div>
          </div>
          <button
            onClick={onViewBadges}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors"
          >
            View Trophy Cabinet
          </button>
        </div>
      )}

      {/* Main Scorecard Hero */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Score Badge */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-3 ${tierColor}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tierTitle}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Check-In Completed!
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
              {tierMessage}
            </p>
          </div>

          {/* Right: Circular Score & XP */}
          <div className="flex items-center gap-6 sm:gap-8">
            {/* Score Ring */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-100 dark:stroke-slate-700"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * result.scorePercentage) / 100}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {result.scorePercentage}%
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  {result.correctCount}/{result.totalStatements} Correct
                </span>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold">
                <Zap className="w-4 h-4 text-purple-500" />
                <span>+{result.xpEarned} Mind XP</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-xs font-medium">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{result.timeSpentSeconds}s elapsed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onRetake}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Another Check-In</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPlan}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
            >
              {copiedPlan ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPlan ? 'Calm Plan Copied!' : 'Copy Pocket Calm Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Category Breakdown + Personalized Coping Strategies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Category Performance Breakdown */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-indigo-500" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Anxiety Domain Mastery
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            How accurately you navigated each teen anxiety category in this session:
          </p>

          <div className="space-y-4">
            {activeCategories.map((catKey) => {
              const meta = ANXIETY_CATEGORIES[catKey];
              const scoreData = result.categoryScores[catKey];
              const percent = Math.round((scoreData.correct / scoreData.total) * 100);

              return (
                <div key={catKey}>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-200">{meta.shortLabel}</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {scoreData.correct}/{scoreData.total} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percent === 100
                          ? 'bg-emerald-500'
                          : percent >= 50
                          ? 'bg-indigo-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Tailored Coping Strategies Blueprint */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-r from-teal-500/10 to-indigo-500/10 rounded-2xl p-4 border border-teal-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HeartPulse className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Personalized Coping Strategies For You
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Custom-tailored evidence-based CBT exercises based on your check-in:
                </p>
              </div>
            </div>
            <button
              onClick={() => onExploreToolbox()}
              className="text-xs font-bold text-teal-700 dark:text-teal-300 underline"
            >
              Open Toolbox
            </button>
          </div>

          {result.recommendedStrategies.map((strat) => {
            const meta = ANXIETY_CATEGORIES[strat.category];

            return (
              <div
                key={strat.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-teal-400 dark:hover:border-teal-500 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${meta.bgColor} ${meta.color}`}>
                      {meta.shortLabel}
                    </span>
                    <span className="text-[11px] text-slate-400">Takes {strat.timeEstimate}</span>
                  </div>
                  {strat.interactiveTool && (
                    <button
                      onClick={() => onExploreToolbox(strat.interactiveTool)}
                      className="px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Launch Interactive Exercise</span>
                    </button>
                  )}
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {strat.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
                  {strat.tagline}
                </p>

                {/* Steps List */}
                <div className="space-y-1.5 mb-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl">
                  {strat.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-extrabold text-teal-600 dark:text-teal-400 mt-0.5">
                        {idx + 1}.
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>

                {/* In-school tip banner */}
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 flex items-start gap-2 text-xs">
                  <span className="font-bold text-amber-700 dark:text-amber-300 flex-shrink-0">
                    🏫 Discreet In-School Tip:
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {strat.inSchoolTip}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accordion: Review All Answer Choices */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
        <button
          onClick={() => setShowAllAnswers((prev) => !prev)}
          className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Review Session Statements & Answers ({result.answers.length})
            </span>
          </div>
          {showAllAnswers ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showAllAnswers && (
          <div className="p-5 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
            {result.answers.map((ans, idx) => (
              <div
                key={ans.statementId + idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-500 dark:text-slate-400">Statement {idx + 1}</span>
                  <span className={ans.isCorrect ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                    {ans.isCorrect ? '✓ Correct Reframe' : '✕ Trap Selected'}
                  </span>
                </div>
                <p className="font-serif italic font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  {ans.statement}
                </p>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-0.5">Healthy CBT Option:</strong>
                  <span className="text-slate-700 dark:text-slate-300">{ans.correctOptionText}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

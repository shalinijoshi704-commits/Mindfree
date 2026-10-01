import { AnxietyCategoryMeta, AnxietyType } from '../types';

export const ANXIETY_CATEGORIES: Record<AnxietyType, AnxietyCategoryMeta> = {
  academic: {
    id: 'academic',
    label: 'Academic & Exam Pressure',
    shortLabel: 'Academic',
    description: 'Fear of tests, grades, speaking in class, forgetting answers, or falling short of perfection.',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    accentColor: '#f59e0b',
    icon: 'GraduationCap'
  },
  social: {
    id: 'social',
    label: 'Social & Peer Judgment',
    shortLabel: 'Social',
    description: 'Worries about being laughed at, awkwardness in groups, lunchroom cafeteria panic, or fitting in.',
    color: 'text-violet-700 dark:text-violet-300',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    accentColor: '#8b5cf6',
    icon: 'Users'
  },
  digital: {
    id: 'digital',
    label: 'Digital FOMO & Cyber Stress',
    shortLabel: 'Digital FOMO',
    description: 'Anxiety from being left on read, uninvited to group chats, doomscrolling, or social media comparison.',
    color: 'text-cyan-700 dark:text-cyan-300',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    accentColor: '#06b6d4',
    icon: 'Smartphone'
  },
  body_image: {
    id: 'body_image',
    label: 'Body Image & Self-Worth',
    shortLabel: 'Self-Image',
    description: 'Harsh internal critic about appearance, clothes, changing bodies during puberty, or feeling scrutinized.',
    color: 'text-rose-700 dark:text-rose-300',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    accentColor: '#f43f5e',
    icon: 'Sparkles'
  },
  future: {
    id: 'future',
    label: 'Future & Big Transitions',
    shortLabel: 'Future',
    description: 'Overwhelm about high school, college choices, career expectations, or feeling behind peers.',
    color: 'text-emerald-700 dark:text-emerald-300',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    accentColor: '#10b981',
    icon: 'Compass'
  },
  physical: {
    id: 'physical',
    label: 'Physical Panic & Body Sensations',
    shortLabel: 'Body Panic',
    description: 'Racing heartbeat, tight chest, shaky hands, stomach churning, or feeling like you cannot breathe.',
    color: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    accentColor: '#f97316',
    icon: 'Activity'
  }
};

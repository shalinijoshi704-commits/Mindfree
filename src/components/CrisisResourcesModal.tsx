import React from 'react';
import { X, ShieldAlert, Phone, MessageSquare, Heart, ExternalLink, HelpCircle } from 'lucide-react';

interface CrisisResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisResourcesModal: React.FC<CrisisResourcesModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              You Are Not Alone
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Free, confidential 24/7 support for teens
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          If you or a friend are feeling overwhelmed, having thoughts of self-harm, or going through an acute crisis, reach out to these compassionate, free services anytime.
        </p>

        {/* Hotlines */}
        <div className="space-y-3 mb-6">
          {/* 988 Lifeline */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <div>
                <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                  988 Suicide & Crisis Lifeline
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Call or Text <strong>988</strong> (USA & Canada) • 24/7 Free & Confidential
                </div>
              </div>
            </div>
            <a
              href="tel:988"
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
            >
              Call 988
            </a>
          </div>

          {/* Crisis Text Line */}
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <div>
                <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Crisis Text Line
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Text <strong>HOME</strong> to <strong>741741</strong> • Free 24/7 text support
                </div>
              </div>
            </div>
            <a
              href="sms:741741?body=HOME"
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
            >
              Text Now
            </a>
          </div>

          {/* Teen Line */}
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <div>
                <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Teen Line (Teens Helping Teens)
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Call <strong>800-852-8336</strong> or text <strong>TEEN</strong> to <strong>839863</strong> (6-10 PM PST)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted adult advice */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white block mb-0.5">
            💬 Talking to a Trusted Adult:
          </strong>
          You can say: <em>&quot;I have been feeling really anxious about school and friends lately, and I would love some help or to talk to a counselor.&quot;</em>
        </div>
      </div>
    </div>
  );
};

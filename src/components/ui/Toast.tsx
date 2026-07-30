'use client';

import React, { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/cn';

/**
 * Transient confirmation of an action.
 *
 * Several controls changed state with no acknowledgement at all — approving a
 * user, rejecting one, queueing a re-evaluation. The row would quietly update
 * or, worse, nothing visible happened, leaving the user to press again.
 *
 * Announced via role="status" + aria-live="polite" so the confirmation reaches
 * a screen reader too. Polite rather than assertive: a confirmation is not
 * worth interrupting whatever is currently being read.
 */

type Toast = { id: number; message: string; tone: 'success' | 'info' };

const ToastContext = createContext<((message: string, tone?: Toast['tone']) => void) | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { t } = useLanguage();

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((x) => x.id !== id));
  }, []);

  const show = useCallback(
    (message: string, tone: Toast['tone'] = 'success') => {
      const id = Date.now() + Math.random();
      setToasts((list) => [...list, { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'fixed z-50 flex flex-col gap-2 pointer-events-none',
          // Above the mobile bottom bar on phones, bottom-right on desktop.
          'bottom-24 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-80',
        )}
      >
        {toasts.map((toast) => {
          const Icon = toast.tone === 'success' ? CheckCircle2 : Info;
          return (
            <div
              key={toast.id}
              className={cn(
                'pointer-events-auto flex items-start gap-3',
                'rounded-xl border border-outline-variant bg-surface-container shadow-lg',
                'px-4 py-3 text-sm',
              )}
            >
              <Icon
                size={17}
                aria-hidden="true"
                className={cn(
                  'shrink-0 mt-0.5',
                  toast.tone === 'success' ? 'text-class-normal' : 'text-brand',
                )}
              />
              <p className="flex-1 min-w-0">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                aria-label={t('close')}
                className="shrink-0 -mr-1 -mt-1 w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Returns a function that shows a confirmation. Safe to call outside a
 * provider — it no-ops rather than throwing, so a component can be rendered in
 * isolation without being wrapped.
 */
export function useToast() {
  const show = useContext(ToastContext);
  return show ?? (() => {});
}

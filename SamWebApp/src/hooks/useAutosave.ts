import { useEffect, useRef, useCallback } from 'react';
import { DailyLog } from '@/types';

const DRAFT_KEY = 'sam-log-draft';
const AUTOSAVE_INTERVAL = 10000; // 10 seconds

export function useAutosave(log: DailyLog, enabled: boolean = true) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>('');

  const saveDraft = useCallback(() => {
    if (!enabled) return;
    
    const currentState = JSON.stringify(log);
    if (currentState === lastSavedRef.current) return;

    try {
      localStorage.setItem(DRAFT_KEY, currentState);
      lastSavedRef.current = currentState;
    } catch (error) {
      console.warn('Failed to save draft:', error);
    }
  }, [log, enabled]);

  const loadDraft = useCallback((): Partial<DailyLog> | null => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      return draft ? JSON.parse(draft) : null;
    } catch (error) {
      console.warn('Failed to load draft:', error);
      return null;
    }
  }, []);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_KEY);
      lastSavedRef.current = '';
    } catch (error) {
      console.warn('Failed to clear draft:', error);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Save on blur
    const handleBlur = () => saveDraft();
    window.addEventListener('beforeunload', handleBlur);

    // Auto-save interval
    intervalRef.current = setInterval(saveDraft, AUTOSAVE_INTERVAL);

    return () => {
      window.removeEventListener('beforeunload', handleBlur);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [saveDraft, enabled]);

  return {
    saveDraft,
    loadDraft,
    clearDraft,
  };
}

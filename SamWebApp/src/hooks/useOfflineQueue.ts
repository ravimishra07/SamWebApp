import { useState, useEffect, useCallback } from 'react';
import { DailyLog } from '@/types';

const QUEUE_KEY = 'sam-offline-queue';

interface QueuedLog {
  id: string;
  userId: string;
  log: DailyLog;
  timestamp: number;
  retries: number;
}

export function useOfflineQueue() {
  const [isOnline, setIsOnline] = useState(true);
  const [queue, setQueue] = useState<QueuedLog[]>([]);

  const addToQueue = useCallback((userId: string, log: DailyLog) => {
    const queuedLog: QueuedLog = {
      id: `queue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      log,
      timestamp: Date.now(),
      retries: 0,
    };

    setQueue(prev => {
      const newQueue = [...prev, queuedLog];
      try {
        localStorage.setItem(QUEUE_KEY, JSON.stringify(newQueue));
      } catch (error) {
        console.warn('Failed to save queue:', error);
      }
      return newQueue;
    });

    return queuedLog.id;
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    setQueue(prev => {
      const newQueue = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem(QUEUE_KEY, JSON.stringify(newQueue));
      } catch (error) {
        console.warn('Failed to update queue:', error);
      }
      return newQueue;
    });
  }, []);

  const updateQueueItem = useCallback((id: string, updates: Partial<QueuedLog>) => {
    setQueue(prev => {
      const newQueue = prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      );
      try {
        localStorage.setItem(QUEUE_KEY, JSON.stringify(newQueue));
      } catch (error) {
        console.warn('Failed to update queue item:', error);
      }
      return newQueue;
    });
  }, []);

  const loadQueue = useCallback(() => {
    try {
      const saved = localStorage.getItem(QUEUE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setQueue(parsed);
      }
    } catch (error) {
      console.warn('Failed to load queue:', error);
      setQueue([]);
    }
  }, []);

  useEffect(() => {
    loadQueue();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadQueue]);

  return {
    isOnline,
    queue,
    addToQueue,
    removeFromQueue,
    updateQueueItem,
    queueSize: queue.length,
  };
}

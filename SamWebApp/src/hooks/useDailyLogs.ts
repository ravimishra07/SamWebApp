import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  where 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DailyLog } from '@/types';

export function useDailyLogs(userId: string | null, maxLogs: number = 50) {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !db) {
      setLoading(false);
      return;
    }

    const fetchLogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const logsRef = collection(db, 'users', userId, 'logs');
        const q = query(
          logsRef,
          orderBy('timestamp', 'desc'),
          limit(maxLogs)
        );

        const querySnapshot = await getDocs(q);
        const logsData: DailyLog[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as DailyLog;
          logsData.push(data);
        });

        setLogs(logsData);
      } catch (err: any) {
        console.error('Error fetching daily logs:', err);
        setError(err.message || 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [userId, maxLogs]);

  return { logs, loading, error, refetch: () => {
    if (userId) {
      setLoading(true);
      // Trigger useEffect by updating a dependency
      setLogs([]);
    }
  }};
}


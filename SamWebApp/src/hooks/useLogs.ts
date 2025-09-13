'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Log, LogFormData } from '@/types';

export const useLogs = (userId: string | null) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !db) {
      setLogs([]);
      setLoading(false);
      return;
    }

    const logsRef = collection(db, 'logs', userId, 'entries');
    const q = query(logsRef, orderBy('createdAt', 'desc'), limit(5));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Log[];
      setLogs(logsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, db]);

  const addLog = async (logData: LogFormData) => {
    if (!userId || !db) throw new Error('User not authenticated or database not available');

    try {
      const logsRef = collection(db, 'logs', userId, 'entries');
      await addDoc(logsRef, {
        ...logData,
        userId,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding log:', error);
      throw error;
    }
  };

  return {
    logs,
    loading,
    addLog,
  };
};

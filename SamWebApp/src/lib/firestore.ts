import { 
  doc, 
  setDoc, 
  writeBatch, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { DailyLog } from '@/types';

export interface SaveLogResult {
  success: boolean;
  error?: string;
  documentId?: string;
}

export async function saveLog(
  userId: string, 
  log: DailyLog, 
  useServerTimestamp: boolean = true
): Promise<SaveLogResult> {
  if (!db) {
    return { success: false, error: 'Firebase not initialized' };
  }

  try {
    const timestamp = useServerTimestamp ? serverTimestamp() : log.timestamp;
    const documentId = useServerTimestamp 
      ? new Date().toISOString() 
      : log.timestamp;

    const logWithTimestamp = {
      ...log,
      timestamp: useServerTimestamp ? timestamp : log.timestamp,
    };

    await setDoc(
      doc(db, 'users', userId, 'logs', documentId),
      logWithTimestamp,
      { merge: false }
    );

    return { success: true, documentId };
  } catch (error: any) {
    console.error('Error saving log:', error);
    
    let errorMessage = 'Failed to save log';
    if (error.code === 'permission-denied') {
      errorMessage = 'Permission denied. Please check your authentication.';
    } else if (error.code === 'resource-exhausted') {
      errorMessage = 'Storage quota exceeded. Please contact support.';
    } else if (error.code === 'unavailable') {
      errorMessage = 'Service temporarily unavailable. Please try again.';
    }

    return { success: false, error: errorMessage };
  }
}

export async function saveLogsBatch(
  userId: string, 
  logs: Array<{ log: DailyLog; documentId: string }>
): Promise<SaveLogResult> {
  if (!db) {
    return { success: false, error: 'Firebase not initialized' };
  }

  if (logs.length === 0) {
    return { success: true };
  }

  try {
    const batch = writeBatch(db);
    
    logs.forEach(({ log, documentId }) => {
      const logRef = doc(db, 'users', userId, 'logs', documentId);
      batch.set(logRef, log, { merge: false });
    });

    await batch.commit();
    return { success: true };
  } catch (error: any) {
    console.error('Error saving logs batch:', error);
    
    let errorMessage = 'Failed to save logs';
    if (error.code === 'permission-denied') {
      errorMessage = 'Permission denied. Please check your authentication.';
    } else if (error.code === 'resource-exhausted') {
      errorMessage = 'Storage quota exceeded. Please contact support.';
    }

    return { success: false, error: errorMessage };
  }
}

export function generateLogId(): string {
  return new Date().toISOString();
}

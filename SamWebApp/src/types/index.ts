export interface DailyLog {
  timestamp: string;
  summary: string;
  status: {
    moodLevel: string;
    sleepQuality: string;
    sleepDuration: string;
    energyLevel: string;
    stabilityScore: string;
  };
  insights: {
    wins: string[];
    losses: string[];
    ideas: string[];
  };
  goals: string[];
  tags: string[];
  triggerEvents: string[];
  symptomChecklist: string[];
}

export interface Log {
  id: string;
  summary: string;
  mood: number;
  sleepDuration: number;
  tags: string[];
  createdAt: Date;
  userId: string;
}

export interface LogFormData {
  summary: string;
  mood: number;
  sleepDuration: number;
  tags: string[];
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

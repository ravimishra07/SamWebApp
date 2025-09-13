import { DailyLog, ValidationError } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateDailyLog(log: Partial<DailyLog>): ValidationResult {
  const errors: ValidationError[] = [];

  // Summary validation
  if (!log.summary || log.summary.trim().length < 10) {
    errors.push({
      field: 'summary',
      message: 'Summary is required and must be at least 10 characters long'
    });
  }

  // Status validations
  if (log.status) {
    const { moodLevel, sleepQuality, sleepDuration, energyLevel, stabilityScore } = log.status;

    // Mood Level validation (1-10 or empty)
    if (moodLevel && (isNaN(Number(moodLevel)) || Number(moodLevel) < 1 || Number(moodLevel) > 10)) {
      errors.push({
        field: 'status.moodLevel',
        message: 'Mood level must be a number between 1 and 10'
      });
    }

    // Sleep Quality validation (1-5 or empty)
    if (sleepQuality && (isNaN(Number(sleepQuality)) || Number(sleepQuality) < 1 || Number(sleepQuality) > 5)) {
      errors.push({
        field: 'status.sleepQuality',
        message: 'Sleep quality must be a number between 1 and 5'
      });
    }

    // Sleep Duration validation (positive number or empty)
    if (sleepDuration && (isNaN(Number(sleepDuration)) || Number(sleepDuration) < 0)) {
      errors.push({
        field: 'status.sleepDuration',
        message: 'Sleep duration must be a positive number'
      });
    }

    // Energy Level validation (1-10 or empty)
    if (energyLevel && (isNaN(Number(energyLevel)) || Number(energyLevel) < 1 || Number(energyLevel) > 10)) {
      errors.push({
        field: 'status.energyLevel',
        message: 'Energy level must be a number between 1 and 10'
      });
    }

    // Stability Score validation (1-5 or empty)
    if (stabilityScore && (isNaN(Number(stabilityScore)) || Number(stabilityScore) < 1 || Number(stabilityScore) > 5)) {
      errors.push({
        field: 'status.stabilityScore',
        message: 'Stability score must be a number between 1 and 5'
      });
    }
  }

  // Tags validation (max 10)
  if (log.tags && log.tags.length > 10) {
    errors.push({
      field: 'tags',
      message: 'Maximum 10 tags allowed'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function createEmptyDailyLog(): DailyLog {
  return {
    timestamp: new Date().toISOString(),
    summary: '',
    status: {
      moodLevel: '',
      sleepQuality: '',
      sleepDuration: '',
      energyLevel: '',
      stabilityScore: ''
    },
    insights: {
      wins: [],
      losses: [],
      ideas: []
    },
    goals: [],
    tags: [],
    triggerEvents: [],
    symptomChecklist: []
  };
}

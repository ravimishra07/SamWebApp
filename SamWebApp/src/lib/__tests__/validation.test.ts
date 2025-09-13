import { validateDailyLog, createEmptyDailyLog } from '../validation';
import { DailyLog } from '@/types';

describe('DailyLog Validation', () => {
  describe('validateDailyLog', () => {
    it('should validate a complete log successfully', () => {
      const log: DailyLog = {
        timestamp: '2025-05-15T23:30:00Z',
        summary: 'A comprehensive day with many events and experiences.',
        status: {
          moodLevel: '7',
          sleepQuality: '4',
          sleepDuration: '8',
          energyLevel: '6',
          stabilityScore: '3'
        },
        insights: {
          wins: ['Completed project'],
          losses: ['Missed deadline'],
          ideas: ['New approach']
        },
        goals: ['Learn React'],
        tags: ['work', 'learning'],
        triggerEvents: ['Meeting'],
        symptomChecklist: ['Anxiety']
      };

      const result = validateDailyLog(log);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for summary too short', () => {
      const log = createEmptyDailyLog();
      log.summary = 'Short';

      const result = validateDailyLog(log);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('summary');
    });

    it('should fail validation for invalid mood level', () => {
      const log = createEmptyDailyLog();
      log.summary = 'A valid summary that meets the minimum length requirement.';
      log.status.moodLevel = '15';

      const result = validateDailyLog(log);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'status.moodLevel')).toBe(true);
    });

    it('should fail validation for too many tags', () => {
      const log = createEmptyDailyLog();
      log.summary = 'A valid summary that meets the minimum length requirement.';
      log.tags = Array(11).fill('tag');

      const result = validateDailyLog(log);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.field === 'tags')).toBe(true);
    });

    it('should pass validation for empty optional fields', () => {
      const log = createEmptyDailyLog();
      log.summary = 'A valid summary that meets the minimum length requirement.';

      const result = validateDailyLog(log);
      expect(result.isValid).toBe(true);
    });
  });

  describe('createEmptyDailyLog', () => {
    it('should create a log with empty fields', () => {
      const log = createEmptyDailyLog();
      
      expect(log.summary).toBe('');
      expect(log.status.moodLevel).toBe('');
      expect(log.insights.wins).toEqual([]);
      expect(log.goals).toEqual([]);
      expect(log.tags).toEqual([]);
    });
  });
});

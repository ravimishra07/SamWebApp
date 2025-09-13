'use client';

import { useState, useEffect } from 'react';
import { DailyLog, ValidationError } from '@/types';
import { validateDailyLog, createEmptyDailyLog } from '@/lib/validation';
import { saveLog } from '@/lib/firestore';
import { useAutosave } from '@/hooks/useAutosave';
import { useOfflineQueue } from '@/hooks/useOfflineQueue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const SEEDED_TAGS = [
  'interview-track',
  'tanvi-reentry',
  'emotional-control',
  'bipolar-awareness',
  'manic-drift',
  'self-punishment-pattern',
  'study-drift'
];

const SLEEP_QUALITY_OPTIONS = [
  { value: '1', label: '1 - Very Poor' },
  { value: '2', label: '2 - Poor' },
  { value: '3', label: '3 - Fair' },
  { value: '4', label: '4 - Good' },
  { value: '5', label: '5 - Excellent' }
];

const STABILITY_OPTIONS = [
  { value: '1', label: '1 - Very Unstable' },
  { value: '2', label: '2 - Unstable' },
  { value: '3', label: '3 - Neutral' },
  { value: '4', label: '4 - Stable' },
  { value: '5', label: '5 - Very Stable' }
];

interface NewLogFormProps {
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NewLogForm({ userId, onSuccess, onCancel }: NewLogFormProps) {
  const [log, setLog] = useState<DailyLog>(createEmptyDailyLog());
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const { saveDraft, loadDraft, clearDraft } = useAutosave(log);
  const { isOnline, addToQueue, queueSize } = useOfflineQueue();

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setLog(draft as DailyLog);
    }
  }, [loadDraft]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const updateLog = (updates: Partial<DailyLog>) => {
    setLog(prev => ({ ...prev, ...updates }));
    setErrors([]);
  };

  const updateStatus = (field: keyof DailyLog['status'], value: string) => {
    updateLog({
      status: { ...log.status, [field]: value }
    });
  };

  const updateInsights = (field: keyof DailyLog['insights'], value: string[]) => {
    updateLog({
      insights: { ...log.insights, [field]: value }
    });
  };

  const addListItem = (field: keyof DailyLog['insights'], item: string) => {
    if (item.trim()) {
      updateInsights(field, [...log.insights[field], item.trim()]);
    }
  };

  const removeListItem = (field: keyof DailyLog['insights'], index: number) => {
    updateInsights(field, log.insights[field].filter((_, i) => i !== index));
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !log.tags.includes(tag.trim()) && log.tags.length < 10) {
      updateLog({ tags: [...log.tags, tag.trim()] });
    }
  };

  const removeTag = (index: number) => {
    updateLog({ tags: log.tags.filter((_, i) => i !== index) });
  };

  const addGoal = (goal: string) => {
    if (goal.trim() && !log.goals.includes(goal.trim())) {
      updateLog({ goals: [...log.goals, goal.trim()] });
    }
  };

  const removeGoal = (index: number) => {
    updateLog({ goals: log.goals.filter((_, i) => i !== index) });
  };

  const addTriggerEvent = (event: string) => {
    if (event.trim() && !log.triggerEvents.includes(event.trim())) {
      updateLog({ triggerEvents: [...log.triggerEvents, event.trim()] });
    }
  };

  const removeTriggerEvent = (index: number) => {
    updateLog({ triggerEvents: log.triggerEvents.filter((_, i) => i !== index) });
  };

  const addSymptom = (symptom: string) => {
    if (symptom.trim() && !log.symptomChecklist.includes(symptom.trim())) {
      updateLog({ symptomChecklist: [...log.symptomChecklist, symptom.trim()] });
    }
  };

  const removeSymptom = (index: number) => {
    updateLog({ symptomChecklist: log.symptomChecklist.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (commit: boolean = true) => {
    const validation = validateDailyLog(log);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please fix the validation errors', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isOnline) {
        const result = await saveLog(userId, log);
        
        if (result.success) {
          clearDraft();
          showToast('Saved — committed to Firestore (and local cache).', 'success');
          if (onSuccess) onSuccess();
        } else {
          throw new Error(result.error);
        }
      } else {
        addToQueue(userId, log);
        showToast(`Log queued for sync (${queueSize + 1} in queue)`, 'success');
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      console.error('Error saving log:', error);
      showToast(error.message || 'Failed to save log', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(log, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sam-log-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Offline indicator */}
      {!isOnline && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          You're offline. Changes will be synced when you're back online.
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>New Daily Log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary */}
          <div>
            <Label htmlFor="summary">Summary *</Label>
            <Textarea
              id="summary"
              placeholder="What happened today?"
              value={log.summary}
              onChange={(e) => updateLog({ summary: e.target.value })}
              className={errors.some(e => e.field === 'summary') ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.some(e => e.field === 'summary') && (
              <p className="text-red-500 text-sm mt-1">
                {errors.find(e => e.field === 'summary')?.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Mood Level */}
              <div>
                <Label htmlFor="moodLevel">Mood Level (1-10)</Label>
                <Input
                  id="moodLevel"
                  type="number"
                  min="1"
                  max="10"
                  value={log.status.moodLevel}
                  onChange={(e) => updateStatus('moodLevel', e.target.value)}
                  placeholder="1-10"
                />
              </div>

              {/* Sleep Quality */}
              <div>
                <Label htmlFor="sleepQuality">Sleep Quality</Label>
                <select
                  id="sleepQuality"
                  value={log.status.sleepQuality}
                  onChange={(e) => updateStatus('sleepQuality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select quality</option>
                  {SLEEP_QUALITY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sleep Duration */}
              <div>
                <Label htmlFor="sleepDuration">Sleep Duration (hours)</Label>
                <Input
                  id="sleepDuration"
                  type="number"
                  min="0"
                  step="0.5"
                  value={log.status.sleepDuration}
                  onChange={(e) => updateStatus('sleepDuration', e.target.value)}
                  placeholder="Hours"
                />
              </div>

              {/* Energy Level */}
              <div>
                <Label htmlFor="energyLevel">Energy Level (1-10)</Label>
                <Input
                  id="energyLevel"
                  type="number"
                  min="1"
                  max="10"
                  value={log.status.energyLevel}
                  onChange={(e) => updateStatus('energyLevel', e.target.value)}
                  placeholder="1-10"
                />
              </div>

              {/* Stability Score */}
              <div>
                <Label htmlFor="stabilityScore">Stability Score</Label>
                <select
                  id="stabilityScore"
                  value={log.status.stabilityScore}
                  onChange={(e) => updateStatus('stabilityScore', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select stability</option>
                  {STABILITY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Wins */}
              <div>
                <Label>Wins</Label>
                <RepeatableList
                  items={log.insights.wins}
                  onAdd={(item) => addListItem('wins', item)}
                  onRemove={(index) => removeListItem('wins', index)}
                  placeholder="Add a win..."
                />
              </div>

              {/* Losses */}
              <div>
                <Label>Losses</Label>
                <RepeatableList
                  items={log.insights.losses}
                  onAdd={(item) => addListItem('losses', item)}
                  onRemove={(index) => removeListItem('losses', index)}
                  placeholder="Add a loss..."
                />
              </div>

              {/* Ideas */}
              <div>
                <Label>Ideas</Label>
                <RepeatableList
                  items={log.insights.ideas}
                  onAdd={(item) => addListItem('ideas', item)}
                  onRemove={(index) => removeListItem('ideas', index)}
                  placeholder="Add an idea..."
                />
              </div>
            </div>
          </div>

          {/* Goals */}
          <div>
            <Label>Goals</Label>
            <TagInput
              items={log.goals}
              onAdd={addGoal}
              onRemove={removeGoal}
              placeholder="Add a goal..."
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <TagInput
              items={log.tags}
              onAdd={addTag}
              onRemove={removeTag}
              placeholder="Add a tag..."
              suggestions={SEEDED_TAGS}
            />
            <p className="text-sm text-gray-500 mt-1">Maximum 10 tags allowed</p>
          </div>

          {/* Trigger Events */}
          <div>
            <Label>Trigger Events</Label>
            <TagInput
              items={log.triggerEvents}
              onAdd={addTriggerEvent}
              onRemove={removeTriggerEvent}
              placeholder="Add a trigger event..."
            />
          </div>

          {/* Symptom Checklist */}
          <div>
            <Label>Symptom Checklist</Label>
            <TagInput
              items={log.symptomChecklist}
              onAdd={addSymptom}
              onRemove={removeSymptom}
              placeholder="Add a symptom..."
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-6 border-t">
            <Button 
              onClick={() => handleSubmit(true)} 
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Saving...' : 'Save & Commit'}
            </Button>
            
            <Button 
              onClick={() => handleSubmit(false)} 
              variant="outline"
              disabled={isSubmitting}
            >
              Save Draft
            </Button>
            
            <Button 
              onClick={handleExport}
              variant="outline"
            >
              Export JSON
            </Button>
            
            <Button 
              onClick={onCancel}
              variant="ghost"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper components
function RepeatableList({ 
  items, 
  onAdd, 
  onRemove, 
  placeholder 
}: { 
  items: string[]; 
  onAdd: (item: string) => void; 
  onRemove: (index: number) => void; 
  placeholder: string;
}) {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem);
      setNewItem('');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} size="sm">Add</Button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
          <span className="text-sm">{item}</span>
          <Button 
            onClick={() => onRemove(index)} 
            size="sm" 
            variant="ghost"
            className="text-red-500 hover:text-red-700"
          >
            ×
          </Button>
        </div>
      ))}
    </div>
  );
}

function TagInput({ 
  items, 
  onAdd, 
  onRemove, 
  placeholder, 
  suggestions = [] 
}: { 
  items: string[]; 
  onAdd: (item: string) => void; 
  onRemove: (index: number) => void; 
  placeholder: string;
  suggestions?: string[];
}) {
  const [newItem, setNewItem] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem);
      setNewItem('');
    }
  };

  const availableSuggestions = suggestions.filter(s => !items.includes(s));

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={placeholder}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && availableSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {availableSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    onAdd(suggestion);
                    setNewItem('');
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
        <Button onClick={handleAdd} size="sm">Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="flex items-center gap-1"
          >
            {item}
            <button
              onClick={() => onRemove(index)}
              className="ml-1 text-xs hover:text-red-500"
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}

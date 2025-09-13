'use client';

import { useState } from 'react';
import { LogFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LogFormProps {
  onSubmit: (data: LogFormData) => void;
  loading?: boolean;
}

export default function LogForm({ onSubmit, loading = false }: LogFormProps) {
  const [formData, setFormData] = useState<LogFormData>({
    summary: '',
    mood: 5,
    sleepDuration: 8,
    tags: [],
  });
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>New Log</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="What happened today?"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mood">
              Mood: {formData.mood}/10
            </Label>
            <div className="space-y-2">
              <input
                type="range"
                id="mood"
                min="1"
                max="10"
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleepDuration">Sleep (hours)</Label>
            <Input
              type="number"
              id="sleepDuration"
              min="0"
              max="24"
              step="0.5"
              value={formData.sleepDuration}
              onChange={(e) => setFormData({ ...formData, sleepDuration: parseFloat(e.target.value) })}
              placeholder="8.5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                disabled={!newTag.trim()}
              >
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="pr-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { DailyLog } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Heart, 
  Moon, 
  Zap, 
  Shield, 
  TrendingUp, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  XCircle,
  Download,
  ArrowLeft,
  Clock
} from 'lucide-react';

interface LogDetailViewProps {
  log: DailyLog;
  onClose: () => void;
}

export default function LogDetailView({ log, onClose }: LogDetailViewProps) {
  const [showExportModal, setShowExportModal] = useState(false);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(log, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sam-log-${new Date(log.timestamp).toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (value: string, max: number) => {
    const num = parseInt(value);
    const percentage = num / max;
    if (percentage >= 0.8) return 'text-green-600 bg-green-100';
    if (percentage >= 0.6) return 'text-blue-600 bg-blue-100';
    if (percentage >= 0.4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                {formatDate(log.timestamp)}
              </h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTime(log.timestamp)}
              </p>
            </div>
          </div>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {log.summary}
              </p>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {log.status.moodLevel && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <Heart className="h-6 w-6 text-pink-600" />
                    <div>
                      <p className="font-medium">Mood Level</p>
                      <Badge className={`mt-1 ${getStatusColor(log.status.moodLevel, 10)}`}>
                        {log.status.moodLevel}/10
                      </Badge>
                    </div>
                  </div>
                )}

                {log.status.sleepQuality && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <Moon className="h-6 w-6 text-indigo-600" />
                    <div>
                      <p className="font-medium">Sleep Quality</p>
                      <Badge className={`mt-1 ${getStatusColor(log.status.sleepQuality, 5)}`}>
                        {log.status.sleepQuality}/5
                      </Badge>
                    </div>
                  </div>
                )}

                {log.status.sleepDuration && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <Clock className="h-6 w-6 text-indigo-600" />
                    <div>
                      <p className="font-medium">Sleep Duration</p>
                      <p className="text-lg font-semibold text-indigo-600">
                        {log.status.sleepDuration}h
                      </p>
                    </div>
                  </div>
                )}

                {log.status.energyLevel && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <Zap className="h-6 w-6 text-yellow-600" />
                    <div>
                      <p className="font-medium">Energy Level</p>
                      <Badge className={`mt-1 ${getStatusColor(log.status.energyLevel, 10)}`}>
                        {log.status.energyLevel}/10
                      </Badge>
                    </div>
                  </div>
                )}

                {log.status.stabilityScore && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    <Shield className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium">Stability Score</p>
                      <Badge className={`mt-1 ${getStatusColor(log.status.stabilityScore, 5)}`}>
                        {log.status.stabilityScore}/5
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Insights & Reflection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Wins */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Wins ({log.insights.wins.length})
                  </h4>
                  {log.insights.wins.length > 0 ? (
                    <ul className="space-y-2">
                      {log.insights.wins.map((win, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{win}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No wins recorded</p>
                  )}
                </div>

                {/* Losses */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700 flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Losses ({log.insights.losses.length})
                  </h4>
                  {log.insights.losses.length > 0 ? (
                    <ul className="space-y-2">
                      {log.insights.losses.map((loss, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{loss}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No losses recorded</p>
                  )}
                </div>

                {/* Ideas */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-yellow-700 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Ideas ({log.insights.ideas.length})
                  </h4>
                  {log.insights.ideas.length > 0 ? (
                    <ul className="space-y-2">
                      {log.insights.ideas.map((idea, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No ideas recorded</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          {log.goals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Goals ({log.goals.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {log.goals.map((goal, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trigger Events */}
          {log.triggerEvents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Trigger Events ({log.triggerEvents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {log.triggerEvents.map((event, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{event}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Symptom Checklist */}
          {log.symptomChecklist.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Symptom Checklist ({log.symptomChecklist.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {log.symptomChecklist.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {log.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {log.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}


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
  XCircle
} from 'lucide-react';

interface DailyLogCardProps {
  log: DailyLog;
  onViewDetails?: (log: DailyLog) => void;
}

export default function DailyLogCard({ log, onViewDetails }: DailyLogCardProps) {
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

  const getMoodColor = (mood: string) => {
    const moodNum = parseInt(mood);
    if (moodNum >= 8) return 'text-green-600 bg-green-100';
    if (moodNum >= 6) return 'text-blue-600 bg-blue-100';
    if (moodNum >= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSleepQualityColor = (quality: string) => {
    const qualityNum = parseInt(quality);
    if (qualityNum >= 4) return 'text-green-600 bg-green-100';
    if (qualityNum >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getEnergyColor = (energy: string) => {
    const energyNum = parseInt(energy);
    if (energyNum >= 7) return 'text-green-600 bg-green-100';
    if (energyNum >= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStabilityColor = (stability: string) => {
    const stabilityNum = parseInt(stability);
    if (stabilityNum >= 4) return 'text-green-600 bg-green-100';
    if (stabilityNum >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              {formatDate(log.timestamp)}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {formatTime(log.timestamp)}
            </p>
          </div>
          {onViewDetails && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(log)}
            >
              View Details
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Summary */}
        <div>
          <h4 className="font-medium text-foreground mb-2">Summary</h4>
          <p className="text-foreground leading-relaxed text-sm line-clamp-3">
            {log.summary}
          </p>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {log.status.moodLevel && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
              <Heart className="h-4 w-4 text-pink-600" />
              <div>
                <p className="text-xs text-muted-foreground">Mood</p>
                <Badge className={`text-xs ${getMoodColor(log.status.moodLevel)}`}>
                  {log.status.moodLevel}/10
                </Badge>
              </div>
            </div>
          )}

          {log.status.sleepQuality && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
              <Moon className="h-4 w-4 text-indigo-600" />
              <div>
                <p className="text-xs text-muted-foreground">Sleep</p>
                <Badge className={`text-xs ${getSleepQualityColor(log.status.sleepQuality)}`}>
                  {log.status.sleepQuality}/5
                </Badge>
              </div>
            </div>
          )}

          {log.status.energyLevel && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
              <Zap className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-xs text-muted-foreground">Energy</p>
                <Badge className={`text-xs ${getEnergyColor(log.status.energyLevel)}`}>
                  {log.status.energyLevel}/10
                </Badge>
              </div>
            </div>
          )}

          {log.status.stabilityScore && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
              <Shield className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-muted-foreground">Stability</p>
                <Badge className={`text-xs ${getStabilityColor(log.status.stabilityScore)}`}>
                  {log.status.stabilityScore}/5
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Sleep Duration */}
        {log.status.sleepDuration && (
          <div className="flex items-center gap-2 text-sm">
            <Moon className="h-4 w-4 text-indigo-600" />
            <span className="text-muted-foreground">Slept for</span>
            <span className="font-medium">{log.status.sleepDuration} hours</span>
          </div>
        )}

        {/* Insights Preview */}
        {(log.insights.wins.length > 0 || log.insights.losses.length > 0 || log.insights.ideas.length > 0) && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {log.insights.wins.length > 0 && (
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-green-700">Wins ({log.insights.wins.length})</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {log.insights.wins[0]}
                      {log.insights.wins.length > 1 && ` +${log.insights.wins.length - 1} more`}
                    </p>
                  </div>
                </div>
              )}

              {log.insights.losses.length > 0 && (
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-red-700">Losses ({log.insights.losses.length})</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {log.insights.losses[0]}
                      {log.insights.losses.length > 1 && ` +${log.insights.losses.length - 1} more`}
                    </p>
                  </div>
                </div>
              )}

              {log.insights.ideas.length > 0 && (
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-yellow-700">Ideas ({log.insights.ideas.length})</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {log.insights.ideas[0]}
                      {log.insights.ideas.length > 1 && ` +${log.insights.ideas.length - 1} more`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Goals */}
        {log.goals.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              Goals ({log.goals.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {log.goals.slice(0, 3).map((goal, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {goal}
                </Badge>
              ))}
              {log.goals.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{log.goals.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Trigger Events & Symptoms */}
        {(log.triggerEvents.length > 0 || log.symptomChecklist.length > 0) && (
          <div className="space-y-2">
            {log.triggerEvents.length > 0 && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">
                  {log.triggerEvents.length} trigger event{log.triggerEvents.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            {log.symptomChecklist.length > 0 && (
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  {log.symptomChecklist.length} symptom{log.symptomChecklist.length !== 1 ? 's' : ''} noted
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {log.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {log.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


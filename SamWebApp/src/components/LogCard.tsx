import { Log } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LogCardProps {
  log: Log;
}

export default function LogCard({ log }: LogCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{log.createdAt.toLocaleDateString()}</span>
            <span>Mood: {log.mood}/10</span>
            <span>Sleep: {log.sleepDuration}h</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">{log.summary}</p>
        
        {log.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {log.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

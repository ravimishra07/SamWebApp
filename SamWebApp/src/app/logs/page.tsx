'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import DailyLogCard from '@/components/DailyLogCard';
import LogDetailView from '@/components/LogDetailView';
import { useAuth } from '@/hooks/useAuth';
import { useDailyLogs } from '@/hooks/useDailyLogs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DailyLog } from '@/types';
import { Plus, Calendar, TrendingUp, Heart, Moon } from 'lucide-react';
import Link from 'next/link';

export default function LogsPage() {
  const { user, loading: authLoading } = useAuth();
  const { logs, loading: logsLoading, error } = useDailyLogs(user?.uid || null);
  const [selectedLog, setSelectedLog] = useState<DailyLog | null>(null);

  if (authLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Sign in required</h1>
              <p className="text-gray-600">Please sign in to view your logs.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <h3 className="text-lg font-semibold text-red-600 mb-2">Error loading logs</h3>
              <p className="text-gray-600">{error}</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Calculate stats
  const totalLogs = logs.length;
  const recentMood = logs[0]?.status?.moodLevel;
  const avgSleep = logs
    .filter(log => log.status.sleepDuration)
    .reduce((sum, log) => sum + parseFloat(log.status.sleepDuration), 0) / 
    logs.filter(log => log.status.sleepDuration).length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Daily Logs</h1>
            <p className="text-muted-foreground">
              Track your daily experiences, mood, and insights
            </p>
          </div>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/logs/new" className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Log
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        {logs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Logs</p>
                    <p className="text-2xl font-bold text-foreground">{totalLogs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {recentMood && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <Heart className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Latest Mood</p>
                      <p className="text-2xl font-bold text-foreground">{recentMood}/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {avgSleep && !isNaN(avgSleep) && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Moon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Sleep</p>
                      <p className="text-2xl font-bold text-foreground">{avgSleep.toFixed(1)}h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Logs List */}
        {logsLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : logs.length === 0 ? (
          <Card className="max-w-lg mx-auto">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No logs yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start tracking your daily experiences and insights
                </p>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/logs/new" className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create Your First Log
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {logs.map((log, index) => (
              <DailyLogCard 
                key={log.timestamp} 
                log={log} 
                onViewDetails={setSelectedLog}
              />
            ))}
          </div>
        )}

        {/* Detail View Modal */}
        {selectedLog && (
          <LogDetailView 
            log={selectedLog} 
            onClose={() => setSelectedLog(null)} 
          />
        )}
      </div>
    </Layout>
  );
}

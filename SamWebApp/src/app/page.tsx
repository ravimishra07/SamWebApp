'use client';

import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Sam App
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
              Track your daily logs, mood, and sleep.
            </p>
          </div>

          {/* User-specific content */}
          {user ? (
            <Card className="w-full max-w-md">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      {user.displayName || user.email}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="flex-1">
                      <Link href="/logs">
                        Logs
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <Link href="/logs/new">
                        New Log
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full max-w-md">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Sign in to start tracking.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
    </div>
    </Layout>
  );
}
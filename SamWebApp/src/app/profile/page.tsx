'use client';

import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
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

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Sign in</h1>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                  <dd className="text-sm text-foreground">
                    {user.displayName || 'Not set'}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd className="text-sm text-foreground">
                    {user.email}
                  </dd>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import NewLogForm from '@/components/NewLogForm';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';

export default function NewLogPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

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
              <p className="text-gray-600">Please sign in to create a new log.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <NewLogForm 
          userId={user.uid}
          onSuccess={() => router.push('/logs')}
          onCancel={() => router.push('/logs')}
        />
      </div>
    </Layout>
  );
}

'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DrawerToggle from '@/components/DrawerToggle';

export default function Navbar() {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <DrawerToggle />
          <Link href="/" className="text-2xl font-bold text-foreground">
            Sam App
          </Link>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild size="sm">
            <Link href="/logs">Logs</Link>
          </Button>
          <Button variant="ghost" asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/profile">Profile</Link>
          </Button>
          
          {user ? (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">
                {user.displayName || user.email}
              </span>
              <Button variant="destructive" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={signInWithGoogle} size="sm">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

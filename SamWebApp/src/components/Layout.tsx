'use client';

import Navbar from './Navbar';
import SideDrawer from './SideDrawer';
import { DrawerProvider } from '@/contexts/DrawerContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <DrawerProvider>
      <div className="min-h-screen bg-background flex">
        <SideDrawer />
        <div className="flex-1 flex flex-col lg:ml-80">
          <Navbar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </DrawerProvider>
  );
}

'use client'
import { useDrawer } from '@/contexts/DrawerContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  FileText, 
  Plus, 
  User, 
  Settings, 
  Moon, 
  Sun,
  X,
  Menu
} from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/',
    icon: Home,
    description: 'Overview and recent activity'
  },
  {
    label: 'All Logs',
    href: '/logs',
    icon: FileText,
    description: 'View all your logs'
  },
  {
    label: 'New Log',
    href: '/logs/new',
    icon: Plus,
    description: 'Create a new log entry'
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
    description: 'Manage your profile'
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'App preferences'
  }
]

export default function SideDrawer() {
  const { isOpen, closeDrawer } = useDrawer()
  const pathname = usePathname()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-80 bg-surface border-r border-surface/30 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:z-auto"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Menu className="w-5 h-5 text-bg" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-accent">SamWebApp</h2>
              <p className="text-xs text-muted">Log Management</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeDrawer}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeDrawer}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                  isActive 
                    ? "bg-accent/10 text-accent border border-accent/20" 
                    : "text-muted hover:bg-surface/50 hover:text-accent"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-accent" : "text-muted group-hover:text-accent"
                )} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-70 truncate">{item.description}</div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-surface/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Theme</span>
            <ThemeToggle />
          </div>
          
          <div className="text-xs text-muted text-center">
            <p>SamWebApp v1.0.0</p>
            <p>Built with Next.js & Tailwind</p>
          </div>
        </div>
      </div>
    </>
  )
}

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
  X,
  Menu,
  ChevronRight
} from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    label: 'All Logs',
    href: '/logs',
    icon: FileText,
  },
  {
    label: 'New Log',
    href: '/logs/new',
    icon: Plus,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  }
]

export default function SideDrawer() {
  const { isOpen, closeDrawer } = useDrawer()
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-surface border-r border-surface/20 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:static lg:z-auto"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center">
              <Menu className="w-4 h-4 text-bg" />
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
            className="lg:hidden h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive 
                      ? "bg-accent/10 text-accent border border-accent/20" 
                      : "text-muted hover:bg-surface/50 hover:text-accent"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-accent" : "text-muted group-hover:text-accent"
                  )} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 text-accent" />}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-surface/20 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Theme</span>
            <ThemeToggle />
          </div>
          
          <div className="text-xs text-muted/70 text-center">
            <p>SamWebApp v1.0.0</p>
            <p>Built with Next.js</p>
          </div>
        </div>
      </aside>
    </>
  )
}

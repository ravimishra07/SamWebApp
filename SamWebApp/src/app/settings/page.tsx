import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ThemeToggle from '@/components/ThemeToggle'

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-accent">Settings</h1>
        <p className="text-muted">Manage your app preferences and configuration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted">Choose your preferred theme</p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Profile Information</p>
              <p className="text-sm text-muted">Manage your account details</p>
            </div>
            <div className="pt-2">
              <button className="px-4 py-2 rounded-lg bg-accent text-bg hover:bg-accent2 transition-colors">
                Edit Profile
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Email notifications</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Push notifications</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span>Weekly summary</span>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-danger"></div>
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Data Management</p>
              <p className="text-sm text-muted">Control your data and privacy settings</p>
            </div>
            <div className="pt-2 space-y-2">
              <button className="w-full px-4 py-2 rounded-lg bg-surface text-muted hover:bg-surface/80 transition-colors border border-surface/30">
                Export Data
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-danger text-bg hover:opacity-90 transition-opacity">
                Delete Account
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle>About SamWebApp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Build:</strong> Next.js 14.0.4</p>
            <p><strong>Framework:</strong> React 18 with TypeScript</p>
            <p><strong>Styling:</strong> Tailwind CSS with shadcn/ui</p>
            <p><strong>Database:</strong> Firebase Firestore</p>
            <p><strong>Authentication:</strong> Firebase Auth</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

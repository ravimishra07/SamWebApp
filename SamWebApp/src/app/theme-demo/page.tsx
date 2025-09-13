import ThemeToggle from '@/components/ThemeToggle'

export default function ThemeDemo() {
  return (
    <div className="min-h-screen bg-bg text-muted p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-accent">SamWebApp Dark Theme Demo</h1>
          <ThemeToggle />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Demo */}
          <div className="p-4 rounded-lg bg-surface/70 border border-surface/30 shadow-sm">
            <h3 className="text-xl font-semibold text-accent mb-4">Card Component</h3>
            <p className="text-muted mb-4">This is a sample card using the new theme tokens.</p>
            <button className="px-4 py-2 rounded-lg bg-accent text-bg hover:bg-accent2 transition-colors">
              Sample Button
            </button>
          </div>
          
          {/* Frosted Glass Demo */}
          <div className="frost p-4 rounded-lg border border-white/10 shadow-lg">
            <h3 className="text-xl font-semibold text-accent mb-4">Frosted Glass</h3>
            <p className="text-muted mb-4">This card uses the frosted glass effect with backdrop blur.</p>
            <button className="px-4 py-2 rounded-lg bg-success text-bg hover:opacity-90 transition-opacity">
              Success Button
            </button>
          </div>
          
          {/* Color Palette Demo */}
          <div className="p-4 rounded-lg bg-surface/80 border border-surface/40 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-accent mb-4">Color Palette</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-accent"></div>
                <span className="text-muted">Accent</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-success"></div>
                <span className="text-muted">Success</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-warning"></div>
                <span className="text-muted">Warning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-danger"></div>
                <span className="text-muted">Danger</span>
              </div>
            </div>
          </div>
          
          {/* Button Variants Demo */}
          <div className="p-4 rounded-lg bg-surface/70 border border-surface/30 shadow-sm">
            <h3 className="text-xl font-semibold text-accent mb-4">Button Variants</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 rounded-lg bg-accent text-bg hover:bg-accent2 transition-colors">
                Primary Button
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-surface text-muted hover:bg-surface/80 transition-colors border border-surface/30">
                Secondary Button
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-danger text-bg hover:opacity-90 transition-opacity">
                Danger Button
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-surface/70 border border-surface/30 shadow-sm">
          <h2 className="text-2xl font-semibold text-accent mb-4">Theme Features</h2>
          <ul className="space-y-2 text-muted">
            <li>✅ One Dark color palette with HSL variables</li>
            <li>✅ Custom Tailwind color tokens</li>
            <li>✅ next-themes integration with system preference detection</li>
            <li>✅ Frosted glass effects with backdrop blur</li>
            <li>✅ Accessible contrast ratios</li>
            <li>✅ Smooth transitions and hover effects</li>
            <li>✅ Compatible with existing shadcn/ui components</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

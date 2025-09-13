'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle(){
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(()=> setMounted(true), [])
  
  if (!mounted) return null

  const activeDark = theme === 'dark' || (theme==='system' && systemTheme==='dark')

  return (
    <button
      onClick={()=> setTheme(activeDark ? 'light' : 'dark')}
      className="px-3 py-1 rounded-lg bg-surface/60 hover:bg-surface/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30"
      aria-label="Toggle theme"
    >
      {activeDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}

'use client'
import { useDrawer } from '@/contexts/DrawerContext'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function DrawerToggle() {
  const { toggleDrawer } = useDrawer()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDrawer}
      className="lg:hidden"
      aria-label="Toggle navigation menu"
    >
      <Menu className="w-5 h-5" />
    </Button>
  )
}

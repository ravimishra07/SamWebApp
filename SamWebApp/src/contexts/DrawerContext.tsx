'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface DrawerContextType {
  isOpen: boolean
  toggleDrawer: () => void
  closeDrawer: () => void
  openDrawer: () => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen(!isOpen)
  const closeDrawer = () => setIsOpen(false)
  const openDrawer = () => setIsOpen(true)

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer, closeDrawer, openDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawer() {
  const context = useContext(DrawerContext)
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  return context
}

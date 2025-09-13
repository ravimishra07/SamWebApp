import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'frosted' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md'
}: CardProps) {
  const baseClasses = "rounded-lg border transition-all duration-200"
  
  const variantClasses = {
    default: "bg-surface/70 border-surface/30 shadow-sm",
    frosted: "frost border-white/10 shadow-lg",
    elevated: "bg-surface/80 border-surface/40 shadow-md hover:shadow-lg"
  }
  
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  )
}
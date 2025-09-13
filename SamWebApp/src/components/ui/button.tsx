import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg"
  
  const variantClasses = {
    primary: "bg-accent text-bg hover:bg-accent2 focus:ring-accent/30",
    secondary: "bg-surface text-muted hover:bg-surface/80 focus:ring-surface/30",
    success: "bg-success text-bg hover:opacity-90 focus:ring-success/30",
    warning: "bg-warning text-bg hover:opacity-90 focus:ring-warning/30",
    danger: "bg-danger text-bg hover:opacity-90 focus:ring-danger/30"
  }
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  )
}
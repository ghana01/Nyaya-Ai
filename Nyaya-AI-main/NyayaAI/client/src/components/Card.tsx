import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'

interface CardProps {
  title: string
  description: string
  icon?: LucideIcon
  iconColor?: string
  bgColor?: string
  to?: string
  onClick?: () => void
  children?: ReactNode
  className?: string
  variant?: 'default' | 'feature' | 'emergency'
}

export default function Card({
  title,
  description,
  icon: Icon,
  iconColor = 'text-primary-600',
  bgColor = 'bg-primary-100',
  to,
  onClick,
  children,
  className = '',
  variant = 'default',
}: CardProps) {
  const baseClasses = 'card card-hover block'
  
  const variantClasses = {
    default: 'border border-gray-100',
    feature: 'border-2 border-transparent hover:border-primary-200',
    emergency: 'bg-red-50 border-2 border-red-200 hover:border-red-400',
  }

  const content = (
    <>
      {Icon && (
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${bgColor} mb-4`}>
          <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      {children}
    </>
  )

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={title}>
        {content}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`${classes} text-left w-full`} aria-label={title}>
        {content}
      </button>
    )
  }

  return (
    <div className={classes}>
      {content}
    </div>
  )
}

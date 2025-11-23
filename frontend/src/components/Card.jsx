import React from 'react'

const VARIANTS = {
  // Base (xs) -> constrained and centered for better readability on narrow screens
  // On `sm` and up, become full-width to work inside grid/layouts
  default:
    'max-w-xl mx-auto sm:mx-0 sm:max-w-full w-full p-4 sm:p-4 md:p-6 border border-slate-300 rounded-lg bg-white shadow-sm sm:shadow-sm break-words leading-relaxed text-base sm:text-sm',
  elevated:
    'max-w-xl mx-auto sm:mx-0 sm:max-w-full w-full p-5 sm:p-6 md:p-8 border border-slate-200 rounded-xl bg-white shadow-md sm:shadow-lg break-words leading-relaxed text-base sm:text-sm',
  minimal: 'max-w-xl mx-auto sm:mx-0 sm:max-w-full w-full p-3 sm:p-2 rounded-md bg-transparent text-base sm:text-sm',
}

export default function Card({ children, className = '', as: Component = 'div', variant = 'default', ...props }) {
  const base = VARIANTS[variant] || VARIANTS.default
  return (
    <Component className={`${base} ${className}`} {...props}>
      {children}
    </Component>
  )
}

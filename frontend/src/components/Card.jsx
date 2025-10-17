import React from 'react'

const VARIANTS = {
  default: 'p-3 border border-slate-300 rounded-lg bg-white shadow-sm',
  elevated: 'p-4 border border-slate-200 rounded-xl bg-white shadow-md',
  minimal: 'p-2 rounded-md bg-transparent',
}

export default function Card({ children, className = '', as: Component = 'div', variant = 'default', ...props }) {
  const base = VARIANTS[variant] || VARIANTS.default
  return (
    <Component className={`${base} ${className}`} {...props}>
      {children}
    </Component>
  )
}

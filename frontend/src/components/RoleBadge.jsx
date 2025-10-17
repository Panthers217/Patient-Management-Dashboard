import React from 'react'

const ROLE_STYLES = {
  admin: 'text-red-600 bg-red-50 ring-red-100',
  doctor: 'text-sky-700 bg-sky-50 ring-sky-100',
  nurse: 'text-emerald-700 bg-emerald-50 ring-emerald-100',
  staff: 'text-indigo-700 bg-indigo-50 ring-indigo-100',
}

export default function RoleBadge({ role }) {
  const cls = ROLE_STYLES[role] || 'text-slate-700 bg-slate-50 ring-slate-100'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{role}</span>
  )
}

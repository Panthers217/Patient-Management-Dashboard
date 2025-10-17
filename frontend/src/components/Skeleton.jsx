import React from 'react'

export default function Skeleton({ className = 'h-4 bg-slate-200 rounded' }) {
  return <div className={`${className} animate-pulse`} />
}

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-slate-600">Welcome back — quick overview</div>
      </div>

      <p className="mt-3 text-slate-600">Daily/weekly visit volumes, no-show rate, top diagnoses, and quick actions will appear here.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div onClick={() => navigate('/appointments')} className="p-4 rounded-lg bg-white shadow hover:shadow-lg cursor-pointer">
          <div className="text-sm text-slate-500">Visits (today)</div>
          <div className="text-2xl font-semibold mt-2">24</div>
        </div>
        <div onClick={() => navigate('/patients')} className="p-4 rounded-lg bg-white shadow hover:shadow-lg cursor-pointer">
          <div className="text-sm text-slate-500">Active patients</div>
          <div className="text-2xl font-semibold mt-2">1,324</div>
        </div>
        <div onClick={() => navigate('/calendar')} className="p-4 rounded-lg bg-white shadow hover:shadow-lg cursor-pointer">
          <div className="text-sm text-slate-500">No-shows</div>
          <div className="text-2xl font-semibold mt-2">3</div>
        </div>
      </div>
    </div>
  )
}

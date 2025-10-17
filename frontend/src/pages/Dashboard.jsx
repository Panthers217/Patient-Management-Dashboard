import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-4">Daily/weekly visit volumes, no-show rate, top diagnoses, and quick actions will appear here.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Visits (today)</div>
        <div className="p-4 border rounded">No-shows</div>
        <div className="p-4 border rounded">Top diagnoses</div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import Card from './Card'

export default function AppointmentEditor({ initial = null, onSaved, onCancel }) {
  const [time, setTime] = useState(initial?.time ?? '09:00')
  const [patient, setPatient] = useState(initial?.patient ?? '')
  const [status, setStatus] = useState(initial?.status ?? 'booked')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initial) {
      setTime(initial.time || '')
      setPatient(initial.patient || '')
      setStatus(initial.status || 'booked')
    }
  }, [initial])

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...initial, time, patient, status }
    // pretend save delay
    await new Promise((r) => setTimeout(r, 250))
    onSaved && onSaved(payload)
    setSaving(false)
  }

  return (
    <div className="mt-2">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200 text-sm sm:text-base"
          />
          <input
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            placeholder="Patient name"
            className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200 text-sm sm:text-base"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm sm:text-base">
            <option value="booked">Booked</option>
            <option value="checked-in">Checked-in</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
          <button onClick={onCancel} className="w-full sm:w-auto px-3 py-2 border border-slate-300 rounded hover:bg-slate-50">Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto px-3 py-2 bg-sky-600 text-white rounded disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Card>
    </div>
  )
}

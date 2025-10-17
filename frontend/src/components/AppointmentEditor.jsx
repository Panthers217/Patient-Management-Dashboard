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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-200" />
          <input value={patient} onChange={(e) => setPatient(e.target.value)} placeholder="Patient name" className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-200" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-slate-300 rounded px-2 py-1">
            <option value="booked">Booked</option>
            <option value="checked-in">Checked-in</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-3 py-1 bg-sky-600 text-white rounded">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </Card>
    </div>
  )
}

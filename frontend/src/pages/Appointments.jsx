import React from 'react'
import { useState } from 'react'
import AppointmentModal from '../components/AppointmentModal'
import Card from '../components/Card'

const sample = [
  { id: 1, time: '09:00', patient: 'John Doe', status: 'booked' },
  { id: 2, time: '09:30', patient: 'Jane Roe', status: 'checked-in' },
]

export default function Appointments() {
  const [rows, setRows] = useState(sample)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const handleCheckIn = (id) => {
    setRows((r) => r.map((x) => x.id === id ? { ...x, status: 'checked-in' } : x))
  }

  const handleCancel = (id) => {
    setRows((r) => r.filter((x) => x.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <div>
          <button onClick={() => { setEditing(null); setModalOpen(true) }} className="px-3 py-1 bg-sky-600 text-white rounded shadow">New Appointment</button>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {rows.map((a) => (
          <Card as="div" key={a.id} variant="elevated" className="flex items-center justify-between border-slate-200 p-4">
            <div>
              <div className="font-medium">{a.time} — {a.patient}</div>
              <div className="text-sm text-slate-600">{a.status}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleCheckIn(a.id)} className="px-3 py-1 border rounded bg-white hover:bg-slate-50">Check-in</button>
              <button onClick={() => { setEditing(a); setModalOpen(true) }} className="px-3 py-1 border rounded">Edit</button>
              <button onClick={() => handleCancel(a.id)} className="px-3 py-1 border rounded text-red-600">Cancel</button>
            </div>
          </Card>
        ))}
      </div>

      <AppointmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initial={editing}
        onSaved={(a) => {
          if (a.id) {
            // edit existing
            setRows((r) => r.map((x) => x.id === a.id ? { ...x, ...a } : x))
          } else {
            // new
            const id = Math.max(0, ...rows.map(x => x.id)) + 1
            setRows((r) => [{ id, ...a }, ...r])
          }
        }}
      />
    </div>
  )
}

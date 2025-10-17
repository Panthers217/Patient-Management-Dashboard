import React from 'react'

const sample = [
  { id: 1, time: '09:00', patient: 'John Doe', status: 'booked' },
  { id: 2, time: '09:30', patient: 'Jane Roe', status: 'checked-in' },
]

export default function Appointments() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <div>
          <button className="px-3 py-1 bg-slate-800 text-white rounded">New Appointment</button>
        </div>
      </div>

      <div className="mt-4 border rounded">
        <ul>
          {sample.map((a) => (
            <li key={a.id} className="flex items-center justify-between px-4 py-2 border-b">
              <div>
                <div className="font-medium">{a.time} — {a.patient}</div>
                <div className="text-sm text-slate-600">{a.status}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-2 py-1 border rounded">Check-in</button>
                <button className="px-2 py-1 border rounded">Cancel</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

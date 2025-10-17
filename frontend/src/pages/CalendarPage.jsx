import React, { useEffect, useState } from 'react'
import { mockApi } from '../lib/mockApi'
import Card from '../components/Card'

function formatDate(d) {
  return d.toISOString().slice(0,10)
}

function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day + 1) // Monday start
  return d
}

export default function CalendarPage() {
  const [start, setStart] = useState(() => startOfWeek(new Date()))
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const s = formatDate(start)
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    const e = formatDate(end)
    setLoading(true)
    mockApi.getAppointments(s, e).then((a) => {
      setAppointments(a)
      setLoading(false)
    })
  }, [start])

  const days = Array.from({length: 7}).map((_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const dateStr = formatDate(d)
    return { date: dateStr, label: d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }), appts: appointments.filter(x => x.date === dateStr) }
  })

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Calendar — Week view</h1>
        <div className="flex gap-2">
          <button onClick={() => { const n = new Date(start); n.setDate(n.getDate() - 7); setStart(startOfWeek(n)) }} className="px-2 py-1 border rounded">Prev</button>
          <button onClick={() => { const n = new Date(start); n.setDate(n.getDate() + 7); setStart(startOfWeek(n)) }} className="px-2 py-1 border rounded">Next</button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2">
        {days.map((d) => (
          <Card as="div" key={d.date} className="min-h-[120px]">
            <div className="text-sm font-medium mb-2">{d.label}</div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-6 bg-slate-100 animate-pulse rounded" />
                <div className="h-6 bg-slate-100 animate-pulse rounded" />
              </div>
            ) : (
              d.appts.map((a) => (
                <button key={a.id} onClick={() => alert(`Open appointment ${a.id} for ${a.patient} at ${a.time}`)} className="mb-2 w-full text-left p-2 bg-white rounded border border-slate-200 hover:bg-slate-50">
                  <div className="text-sm font-medium">{a.time} — {a.patient}</div>
                  <div className="text-xs text-slate-600">{a.provider}</div>
                </button>
              ))
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { mockApi } from '../lib/mockApi'
import Card from './Card'

export default function EncounterEditor({ mrn, initial = null, onSaved }) {
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0,10))
  const [provider, setProvider] = useState(initial?.provider ?? 'Dr Jones')
  const [note, setNote] = useState(initial?.note ?? '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    if (initial && initial.id) {
      const updated = await mockApi.updateEncounter(mrn, initial.id, { date, provider, note })
      onSaved && onSaved(updated)
    } else {
      const enc = { id: 'enc-' + Math.random().toString(36).slice(2,8), date, provider, note }
      await mockApi.addEncounter(mrn, enc)
      onSaved && onSaved(enc)
      setDate(new Date().toISOString().slice(0,10))
      setProvider('Dr Jones')
      setNote('')
    }
    setSaving(false)
  }

  return (
    <div className="mt-2">
      <Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-200" />
        <input value={provider} onChange={(e) => setProvider(e.target.value)} className="border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-200" />
        <div className="text-right">
          <button onClick={handleSave} disabled={saving} className="px-3 py-1 bg-slate-800 text-white rounded">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
      </Card>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" className="w-full mt-2 border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-200" />
    </div>
  )
}

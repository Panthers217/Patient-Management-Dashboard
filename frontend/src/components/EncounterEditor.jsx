import React, { useState } from 'react'
import { mockApi } from '../lib/mockApi'

export default function EncounterEditor({ mrn, onSaved }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [provider, setProvider] = useState('Dr Jones')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const enc = { id: 'enc-' + Math.random().toString(36).slice(2,8), date, provider, note }
    await mockApi.addEncounter(mrn, enc)
    onSaved && onSaved(enc)
    setNote('')
    setSaving(false)
  }

  return (
    <div className="mt-2 p-3 border rounded">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded px-2 py-1" />
        <input value={provider} onChange={(e) => setProvider(e.target.value)} className="border rounded px-2 py-1" />
        <div className="text-right">
          <button onClick={handleSave} disabled={saving} className="px-3 py-1 bg-slate-800 text-white rounded">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" className="w-full mt-2 border rounded px-2 py-1" />
    </div>
  )
}

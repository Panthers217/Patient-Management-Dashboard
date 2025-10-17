import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mockApi } from '../lib/mockApi'
import Skeleton from '../components/Skeleton'

export default function Patients() {
  const [q, setQ] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    mockApi.getPatients().then((p) => {
      if (mounted) {
        setRows(p)
        setLoading(false)
      }
    })
    return () => (mounted = false)
  }, [])

  const visible = rows.filter((r) => (r.firstName + r.lastName + r.mrn + (r.phone||'')).toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <div className="w-64">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, MRN, phone" className="w-full border rounded px-2 py-1" />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-2 py-1">MRN</th>
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">DOB</th>
              <th className="px-2 py-1">Phone</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-2 py-2"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-2 py-2"><Skeleton className="h-4 w-48" /></td>
                  <td className="px-2 py-2"><Skeleton className="h-4 w-28" /></td>
                  <td className="px-2 py-2"><Skeleton className="h-4 w-28" /></td>
                </tr>
              ))
            ) : (
              visible.map((r) => (
                <tr key={r.mrn} className="border-t">
                  <td className="px-2 py-2">{r.mrn}</td>
                  <td className="px-2 py-2"><Link className="text-sky-600 hover:underline" to={`/patients/${r.mrn}`}>{r.firstName} {r.lastName}</Link></td>
                  <td className="px-2 py-2">{r.dob}</td>
                  <td className="px-2 py-2">{r.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


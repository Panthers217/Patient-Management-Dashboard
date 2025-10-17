import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockApi } from '../lib/mockApi'
import EncounterEditor from '../components/EncounterEditor'

export default function PatientProfile() {
  const { mrn } = useParams()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    mockApi.getPatient(mrn).then((p) => {
      if (mounted) {
        setPatient(p)
        setLoading(false)
      }
    })
    return () => (mounted = false)
  }, [mrn])

  if (loading) return (
    <div>
      <h1 className="text-2xl font-semibold"><span className="inline-block w-48 h-6 bg-slate-200 animate-pulse rounded" /></h1>
      <div className="mt-4 space-y-3">
        <div className="h-6 bg-slate-200 w-64 animate-pulse rounded" />
        <div className="h-40 bg-slate-100 animate-pulse rounded" />
      </div>
    </div>
  )
  if (!patient) return <div>Patient not found</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold">{patient.firstName} {patient.lastName}</h1>
      <div className="mt-2 text-sm text-slate-600">MRN: {patient.mrn} • DOB: {patient.dob} • {patient.phone}</div>

      <section className="mt-6">
        <h2 className="font-semibold">Allergies</h2>
        <div className="mt-2">{patient.allergies.length ? patient.allergies.join(', ') : 'None'}</div>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Encounters</h2>
        <div className="mt-2 space-y-3">
          {patient.encounters.map((e) => (
            <div key={e.id} className="p-3 border rounded">
              <div className="text-sm text-slate-600">{e.date} — {e.provider}</div>
              <div className="mt-1">{e.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">New encounter</h2>
        <EncounterEditor mrn={patient.mrn} onSaved={(enc) => setPatient({...patient, encounters: [...patient.encounters, enc]})} />
      </section>
    </div>
  )
}

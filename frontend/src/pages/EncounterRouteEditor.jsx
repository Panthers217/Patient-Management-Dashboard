import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockApi } from '../lib/mockApi'
import EncounterEditor from '../components/EncounterEditor'

export default function EncounterRouteEditor() {
  const { mrn, id } = useParams()
  const [enc, setEnc] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    mockApi.getPatient(mrn).then((p) => {
      if (!mounted) return
      const e = p?.encounters?.find((x) => x.id === id)
      setEnc(e || null)
      setLoading(false)
    })
    return () => (mounted = false)
  }, [mrn, id])

  if (loading) return <div>Loading...</div>
  if (!enc) return <div>Encounter not found</div>

  return (
    <div>
      <h1 className="text-xl font-semibold">Edit encounter</h1>
      <div className="mt-4">
        <EncounterEditor mrn={mrn} initial={enc} onSaved={() => navigate(-1)} />
      </div>
    </div>
  )
}

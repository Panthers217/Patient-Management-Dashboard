import React from 'react'
import Modal from './Modal'
import EncounterEditor from './EncounterEditor'

export default function EncounterModal({ open, onClose, mrn, initial, onSaved }) {
  if (!open) return null
  return (
    <Modal title={initial ? 'Edit encounter' : 'New encounter'} onClose={onClose}>
      <EncounterEditor mrn={mrn} initial={initial} onSaved={(enc) => { onSaved && onSaved(enc); onClose() }} />
    </Modal>
  )
}

import React, { useState } from 'react'
import Modal from './Modal'
import AppointmentEditor from './AppointmentEditor'

export default function AppointmentModal({ open, onClose, initial, onSaved }) {
  const [dirty, setDirty] = useState(false)

  if (!open) return null

  return (
    <Modal
      title={initial ? 'Edit appointment' : 'New appointment'}
      onClose={() => {
        // if dirty, ask confirmation before closing
        if (dirty && !confirm('Discard unsaved changes?')) return
        onClose && onClose()
      }}
      onBackdropClick={() => {
        if (dirty) {
          if (confirm('Discard unsaved changes?')) onClose && onClose()
          return
        }
        onClose && onClose()
      }}
    >
      <AppointmentEditor
        initial={initial}
        onSaved={(a) => {
          onSaved && onSaved(a)
          onClose && onClose()
        }}
        onCancel={() => {
          if (dirty && !confirm('Discard unsaved changes?')) return
          onClose && onClose()
        }}
      />
    </Modal>
  )
}

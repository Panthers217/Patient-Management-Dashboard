import React, { useEffect, useRef, useCallback } from 'react'

export default function Modal({ title, onClose, children, onBackdropClick }) {
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)

  // Close on Escape and trap tab focus
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose && onClose()
        return
      }

      if (e.key === 'Tab') {
        const modal = dialogRef.current
        if (!modal) return
        const focusable = modal.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) {
          e.preventDefault()
          return
        }
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    previouslyFocused.current = document.activeElement
    const modal = dialogRef.current
    // lock scrolling
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // focus modal container or first focusable
    const focusable = modal?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable && focusable.length) {
      focusable[0].focus()
    } else if (modal) {
      modal.focus()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow || ''
      // restore focus
      try {
        previouslyFocused.current && previouslyFocused.current.focus()
      } catch (err) {}
    }
  }, [handleKeyDown])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" aria-hidden={false}>
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          // If caller provided a backdrop click handler, call it (for confirmation flows)
          if (typeof onBackdropClick === 'function') return onBackdropClick()
          onClose && onClose()
        }}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        tabIndex={-1}
        className="bg-white rounded-lg shadow-lg z-10 w-full max-w-2xl p-4 mx-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  )
}

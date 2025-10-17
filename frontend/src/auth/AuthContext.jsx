import React, { createContext, useContext, useState, useEffect } from 'react'
import { fakeAuth } from './fakeAuth'
import { useToast } from '../components/ToastContext'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const toast = useToast()

  useEffect(() => {
    const stored = localStorage.getItem('pmd_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = async (email, password) => {
    // in dev use local backend; in production rely on same-origin (API_BASE='')
    // Vite exposes import.meta.env.DEV so use that when available
    // eslint-disable-next-line no-undef
    const API_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV ? 'http://127.0.0.1:4000' : ''
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) })
      if (res.ok) {
        const u = await res.json()
        setUser(u)
        localStorage.setItem('pmd_user', JSON.stringify(u))
        toast && toast.addToast('Signed in', 'success')
        return u
      }
      // try parse error message
      const body = await res.json().catch(() => ({}))
      const msg = body?.error || 'Invalid credentials'
      toast && toast.addToast(msg, 'error')
      throw new Error(msg)
    } catch (err) {
      // fallback to fakeAuth on network failure
      if (err instanceof Error && err.message && !err.message.includes('Invalid credentials')) {
        try {
          const u = await fakeAuth.login(email, password)
          setUser(u)
          localStorage.setItem('pmd_user', JSON.stringify(u))
          toast && toast.addToast('Signed in (offline)', 'success')
          return u
        } catch (e) {
          toast && toast.addToast('Login failed', 'error')
          throw e
        }
      }
      toast && toast.addToast(err.message || 'Login failed', 'error')
      throw err
    }
  }

  const logout = () => {
    fakeAuth.logout()
    setUser(null)
    localStorage.removeItem('pmd_user')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

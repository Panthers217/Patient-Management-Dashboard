import React, { createContext, useContext, useState, useEffect } from 'react'
import { fakeAuth } from './fakeAuth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('pmd_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = async (email, password) => {
    const u = await fakeAuth.login(email, password)
    setUser(u)
    localStorage.setItem('pmd_user', JSON.stringify(u))
    return u
  }

  const logout = () => {
    fakeAuth.logout()
    setUser(null)
    localStorage.removeItem('pmd_user')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

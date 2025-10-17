import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const NavLink = ({ to, children }) => (
  <Link to={to} className="px-3 py-2 rounded hover:bg-slate-100">
    {children}
  </Link>
)

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-semibold">PMD</Link>
            <nav className="flex items-center">
              <NavLink to="/">Dashboard</NavLink>
              <NavLink to="/patients">Patients</NavLink>
              <NavLink to="/appointments">Appointments</NavLink>
              <NavLink to="/calendar">Calendar</NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">{user?.name} ({user?.role})</div>
            <button
              onClick={() => {
                logout()
                navigate('/login')
              }}
              className="text-sm text-slate-600 hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  )
}

import React, { useState } from 'react'
import { Outlet, NavLink as RouterNavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import RoleBadge from './RoleBadge'
import FolderStructureButton from './FolderStructureButton'
import WelcomeToast from './WelcomeToast'

const NavItem = ({ to, children, end }) => (
  <RouterNavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        isActive
          ? 'bg-sky-100 text-sky-700'
          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
      }`
    }
  >
    {children}
  </RouterNavLink>
)

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-indigo-50 text-slate-900 antialiased">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-semibold text-lg text-sky-600">PMD</Link>
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <nav className={`hidden md:flex items-center gap-1 ml-2`}> 
              <NavItem to="/" end>Dashboard</NavItem>
              <NavItem to="/patients">Patients</NavItem>
              <NavItem to="/appointments">Appointments</NavItem>
              <NavItem to="/calendar">Calendar</NavItem>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm text-slate-700 flex items-center gap-2">
              <span>{user?.name}</span>
              {user?.role && <RoleBadge role={user.role} />}
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/login')
              }}
              className="px-2 py-1 rounded-md text-sm bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-slate-200 text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 transition"
            >
              Sign out
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex xs:grid px-4 py-3 space-y-2">
              <NavItem to="/">Dashboard</NavItem>
              <NavItem to="/patients">Patients</NavItem>
              <NavItem to="/appointments">Appointments</NavItem>
              <NavItem to="/calendar">Calendar</NavItem>
              <div className="pt-2 border-t">
                <div className="text-sm text-slate-700 flex items-center gap-2">
                  <span className="block">{user?.name}</span>
                  {user?.role && <RoleBadge role={user.role} />}
                </div>
                <button
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                  className="mt-2 w-full text-left px-3 py-2 rounded-md text-sm bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-slate-200 text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 transition"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="container py-6">
        <Outlet />
      </main>
      <WelcomeToast />
      <FolderStructureButton />
    </div>
  )
}

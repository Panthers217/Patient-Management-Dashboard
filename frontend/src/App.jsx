import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import PatientProfile from './pages/PatientProfile'
import CalendarPage from './pages/CalendarPage'
import Layout from './components/Layout'

function Protected({ children, allowedRoles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <div className="p-4">Unauthorized</div>
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:mrn" element={<PatientProfile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

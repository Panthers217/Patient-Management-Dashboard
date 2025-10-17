import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@clinic.test')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white/60 backdrop-blur-sm rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Sign in to PMD</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input className="w-full border rounded px-3 py-2 mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" className="w-full border rounded px-3 py-2 mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex items-center justify-between">
          <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded shadow">Sign in</button>
          <button type="button" onClick={() => { setEmail('admin@clinic.test'); setPassword('password') }} className="text-sm text-slate-600 hover:underline">Use demo creds</button>
        </div>
      </form>
    </div>
  )
}

import express from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const createRouter = () => {
  const router = express.Router()

  const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(1) })

  // Demo in-memory users; replace with prisma-backed users in production
  const users = [
    { id: 1, email: 'admin@clinic.test', passwordHash: bcrypt.hashSync('password', 8), role: 'admin', name: 'Admin' },
    { id: 2, email: 'dr.jones@clinic.test', passwordHash: bcrypt.hashSync('password', 8), role: 'doctor', name: 'Dr Jones' },
  ]

  router.post('/login', async (req, res) => {
    const parse = LoginSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: parse.error.errors })
    const { email, password } = parse.data
    const user = users.find((u) => u.email === email)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    // return a mock token; replace with JWT sign
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role, token: 'dev-token' })
  })

  return router
}

export default function routeHandler(req: any, res: any, next: any) {
  const r = createRouter()
  return r(req, res, next)
}

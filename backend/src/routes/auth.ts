import express from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

const createRouter = () => {
  const router = express.Router()

  const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(1) })

  router.post('/login', async (req, res) => {
    const parse = LoginSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: parse.error.errors })
    const { email, password } = parse.data

    // try to find user in prisma first
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '8h' })
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role, token })
  })

  return router
}

export default function routeHandler(req: any, res: any, next: any) {
  const r = createRouter()
  return r(req, res, next)
}

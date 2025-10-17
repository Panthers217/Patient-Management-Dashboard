import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export interface AuthenticatedRequest extends Request {
  user?: any
}

export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  console.log('[auth] authenticate called for', req.method, req.originalUrl)
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' })
  const token = auth.slice(7)
  try {
    const payload: any = jwt.verify(token, JWT_SECRET)
    // attach user info (try prisma lookup for richer data)
    const user = await prisma.user.findUnique({ where: { id: payload.id } })
    if (!user) return res.status(401).json({ error: 'Invalid token' })
    req.user = { id: user.id, email: user.email, role: user.role, name: user.name }
    return next()
  } catch (err) {
    console.error('[auth] token verify error', err)
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export function requireRole(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) return res.status(401).json({ error: 'Not authenticated' })
    if (allowedRoles.length && !allowedRoles.includes(user.role)) return res.status(403).json({ error: 'Forbidden' })
    return next()
  }
}

export default authenticate

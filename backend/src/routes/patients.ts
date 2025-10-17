import express from 'express'
import { z } from 'zod'

const createRouter = () => {
  const router = express.Router()

  const PatientCreate = z.object({
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string().optional(),
  })

  const sample: any[] = [{ id: 1, mrn: 'MRN-001', firstName: 'John', lastName: 'Doe' }]

  router.get('/', (req, res) => {
    res.json(sample)
  })

  router.post('/', (req, res) => {
    const parse = PatientCreate.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: parse.error.errors })
    const id = sample.length + 1
    const p = { id, mrn: `MRN-${String(id).padStart(3, '0')}`, ...parse.data }
    sample.push(p)
    res.status(201).json(p)
  })

  return router
}

export default function routeHandler(req: any, res: any, next: any) {
  const r = createRouter()
  return r(req, res, next)
}

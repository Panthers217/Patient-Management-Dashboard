import express from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { authenticate, requireRole } from '../middleware/auth'

const createRouter = () => {
  const router = express.Router()

  const PatientCreate = z.object({
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string().optional(),
  })

  const EncounterCreate = z.object({
    date: z.string(),
    provider: z.string(),
    note: z.string().optional(),
  })

  const EncounterUpdate = z.object({
    date: z.string().optional(),
    provider: z.string().optional(),
    note: z.string().optional(),
  })

  // require authentication for patient data
  router.get('/', authenticate, async (req, res) => {
    const patients = await prisma.patient.findMany({ take: 50 })
    res.json(patients)
  })

  router.get('/:mrn', authenticate, async (req, res) => {
    const { mrn } = req.params
    const patient = await prisma.patient.findUnique({ where: { mrn } })
    if (!patient) return res.status(404).json({ error: 'Patient not found' })
    const encountersRaw = await (prisma as any).encounter.findMany({ where: { patientId: patient.id }, orderBy: { date: 'desc' } })
    const encounters = (encountersRaw || []).map((e: any) => ({ id: e.id.toString(), date: new Date(e.date).toISOString().slice(0,10), provider: e.provider, note: e.note }))
    res.json({ mrn: patient.mrn, firstName: patient.firstName, lastName: patient.lastName, dob: patient.dob, encounters })
  })

  // create an encounter for a patient by mrn
  router.post('/:mrn/encounters', authenticate, requireRole('doctor', 'admin'), async (req, res) => {
    const { mrn } = req.params
    const parse = EncounterCreate.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: parse.error.errors })
    const patient = await prisma.patient.findUnique({ where: { mrn } })
    if (!patient) return res.status(404).json({ error: 'Patient not found' })
    const e = await (prisma as any).encounter.create({ data: { patientId: patient.id, date: new Date(parse.data.date), provider: parse.data.provider, note: parse.data.note } })
    res.status(201).json({ id: e.id.toString(), date: new Date(e.date).toISOString().slice(0,10), provider: e.provider, note: e.note })
  })

  // update an encounter
  router.put('/:mrn/encounters/:id', authenticate, requireRole('doctor', 'admin'), async (req, res) => {
    const { mrn, id } = req.params
    const parse = EncounterUpdate.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ error: parse.error.errors })
    const patient = await prisma.patient.findUnique({ where: { mrn } })
    if (!patient) return res.status(404).json({ error: 'Patient not found' })
    const enc = await (prisma as any).encounter.findUnique({ where: { id: Number(id) } })
    if (!enc || enc.patientId !== patient.id) return res.status(404).json({ error: 'Encounter not found' })
    const updated = await (prisma as any).encounter.update({ where: { id: Number(id) }, data: { date: parse.data.date ? new Date(parse.data.date) : undefined, provider: parse.data.provider, note: parse.data.note } })
    res.json({ id: updated.id.toString(), date: new Date(updated.date).toISOString().slice(0,10), provider: updated.provider, note: updated.note })
  })

  return router
}

export default function routeHandler(req: any, res: any, next: any) {
  const r = createRouter()
  return r(req, res, next)
}

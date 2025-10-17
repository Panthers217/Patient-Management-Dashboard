import express from 'express'

const createRouter = () => {
  const router = express.Router()

  const sample = [{ id: 1, time: '2025-10-17T09:00:00', patient: 'John Doe', status: 'booked' }]

  router.get('/', (req, res) => {
    res.json(sample)
  })

  return router
}

export default function routeHandler(req: any, res: any, next: any) {
  const r = createRouter()
  return r(req, res, next)
}

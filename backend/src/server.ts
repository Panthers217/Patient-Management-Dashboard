import express from 'express'
import cors from 'cors'

const app = express()

// Configure CORS with environment variable support
const allowedOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173']

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

app.use(express.json())

// Lazy-require route modules to avoid ESM/CJS cycles when using ts-node
app.use('/api/auth', (_req, _res, next) => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const authRouter = require('./routes/auth').default
	return authRouter(_req, _res, next)
})

app.use('/api/patients', (_req, _res, next) => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const patientsRouter = require('./routes/patients').default
	return patientsRouter(_req, _res, next)
})

app.use('/api/appointments', (_req, _res, next) => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const appointmentsRouter = require('./routes/appointments').default
	return appointmentsRouter(_req, _res, next)
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`))

import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
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

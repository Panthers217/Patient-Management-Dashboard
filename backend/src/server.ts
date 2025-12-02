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

// Health check endpoint for keeping Render service awake
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`)
  
  // Self-ping every 14 minutes to keep Render service awake
  if (process.env.RENDER_EXTERNAL_URL) {
    const PING_INTERVAL = 14 * 60 * 1000 // 14 minutes in milliseconds
    setInterval(async () => {
      try {
        const url = `${process.env.RENDER_EXTERNAL_URL}/api/health`
        const response = await fetch(url)
        console.log(`Self-ping: ${response.status} at ${new Date().toISOString()}`)
      } catch (error) {
        console.error('Self-ping failed:', error)
      }
    }, PING_INTERVAL)
    console.log('Self-ping scheduled every 14 minutes to keep service awake')
  }
})

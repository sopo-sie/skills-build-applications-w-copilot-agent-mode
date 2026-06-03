import express from 'express'
import mongoose from 'mongoose'
import apiRouter from './routes/api.js'

// CI: touch - non-functional change to trigger workflow checks

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', port, mongoUri })
})

app.get('/api/info', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker backend is running',
    port,
    mongoUri,
  })
})

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected to', mongoUri)
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

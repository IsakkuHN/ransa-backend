import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import roleRoutes from './routes/role.routes.js'
import { addRequestId } from './middlewares/request-id.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(addRequestId)
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms Req-Id :res[RequestId]'
  )
)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/role', roleRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app

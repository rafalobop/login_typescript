import express, {Application} from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth'

const app: Application = express()

app.set('port', 3000)
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/auth', authRoutes)

export default app
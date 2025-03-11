import express, { Application } from 'express'
import path from 'path'
import router from './router/api-router'
import globalErrorHandler from './middleware/global-error-handler'

const app: Application = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)
app.use(globalErrorHandler)

export default app

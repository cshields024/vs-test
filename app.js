import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import userController from './controllers/user.controller.js'
import todoController from './controllers/todo.controller.js'

const app = express()

const SERVER_PORT = process.env.PORT
const MONGO = process.env.MONGODB

mongoose.connect(`${MONGO}/vsTest`)

const db = mongoose.connection

db.once('open', () => {
  console.log(`connected to ${MONGO}`)
})

app.use(express.json())

app.use('/user', userController)
app.use('/todo', todoController)

app.listen(SERVER_PORT, () => {
  console.log(`listening on port: ${SERVER_PORT}`)
})
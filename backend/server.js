import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'

import { connectDB, getDB } from './config/mongoose.js'

import boardRoutes from './routes/boards.js'
import listRoutes from './routes/lists.js'
import cardRouters from './routes/cards.js'

dotenv.config()


//connection to database mongoDB
  const app = express()
  app.use(cors())
  app.use(helmet())
  app.use(express.json())
 
  //routes
  app.use('/boards', boardRoutes)
  app.use('/lists', listRoutes)
  app.use('/cards', cardRouters)


    app.get('/', (req, res) => {
      res.end('Hello world!')
      const dbInstance = getDB()
      console.log(dbInstance)
    })
  // console.log(getDB())
    app.listen(process.env.PORT, () => {
      console.log('server is running')
    })

connectDB()







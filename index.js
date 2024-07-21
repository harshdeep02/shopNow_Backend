import express from 'express'
const app = express()
const port = 5500
import {connectToMongo} from './db.js'
import { router } from './routes/auth.js'
import cors from 'cors'
// var routers = express.Router();

// app.use(routers)

connectToMongo()

app.use(cors());
app.use(express.json())


app.use('/', router)


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
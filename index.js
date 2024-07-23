import express from 'express'
const app = express()
const port = process.env.PORT || 5000
import {connectToMongo} from './db.js'
import { router } from './routes/auth.js'
import cors from 'cors'
import { createIndexes } from './userSchema.js'
// var routers = express.Router();

// app.use(routers)

const startServer = async () => {
  await connectToMongo();
  await createIndexes();
  // Start your server here, e.g., app.listen()
};

startServer();

// const corsOptions = {
//   origin: 'https://main--shopnowonlinee.netlify.app/', // Allow this domain
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.use(cors)

const allowedOrigins = ['http://localhost:5173', 'https://main--shopnowonlinee.netlify.app'];

// CORS middleware configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you need to include cookies in the requests
};

// Use the CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json())


app.use('/', router)
// app.get('/', (req,res)=>{
//   res.status(201).send("hello")
// })


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
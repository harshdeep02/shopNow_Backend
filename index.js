import express from 'express';
import cors from 'cors';
import { connectToMongo } from './db.js';
import { router } from './routes/auth.js';
import { createIndexes } from './userSchema.js';

const app = express();
const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectToMongo();
  await createIndexes();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer();

const allowedOrigins = ['http://localhost:5173', 'https://shopnowonlinee.netlify.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Use the CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(express.json());
app.use('/', router);

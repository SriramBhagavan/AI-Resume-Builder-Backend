import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow JSON request bodies
app.use(express.json());

// ✅ Configure CORS properly for your frontend (Vercel URL)
app.use(cors({
  origin: [
    'https://ai-resume-builder-ten-nu.vercel.app', // your Vercel frontend URL
    'http://localhost:5173' // allow local development too
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ Connect to MongoDB
await connectDB();

// ✅ Root route check
app.get('/', (req, res) => {
  res.send('Server is Live...');
});

// ✅ API routes
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

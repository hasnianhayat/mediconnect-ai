import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';
import { apiLimiter } from './middleware/rateLimitMiddleware.js';

dotenv.config();

const app = express();

// Security and utility middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST']
}));
app.use(express.json({ limit: '500kb' })); // Limit payload size for safety

// Basic Health Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Backend is healthy', timestamp: new Date().toISOString() });
});

// Apply rate limiting specifically to AI routes to prevent abuse
app.use('/api/ai', apiLimiter);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Global Error]', err.message);
  res.status(500).json({
    success: false,
    error: 'An unexpected server error occurred.'
  });
});

export default app;

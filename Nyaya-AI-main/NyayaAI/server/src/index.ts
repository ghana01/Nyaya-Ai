import dotenv from 'dotenv';
// Load environment variables FIRST (before any imports that use process.env)
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import healthRoutes from './routes/health';
import chatRoutes from './routes/chat';
import rightsRoutes from './routes/rights';
import lawsRoutes from './routes/laws';
import caseStatusRoutes from './routes/caseStatus';
import authRoutes from './routes/auth';
import documentsRoutes from './routes/documents';
import caseRoutes from './routes/case';
import activityRoutes from './routes/activity';
import legalHelpRoutes from './routes/legalHelp';
import lawyerRoutes from './routes/lawyer';

// Create Express app
const app = express();

// Middleware
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/ai', chatRoutes);
app.use('/api/rights', rightsRoutes);
app.use('/api/laws', lawsRoutes);
app.use('/api/case-status', caseStatusRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/case', caseRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/legal-help', legalHelpRoutes);
app.use('/api/lawyer', lawyerRoutes);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to NyayaAI API',
    version: '2.0.0',
    features: ['AI Chat (Gemini)', 'Case Analyzer', 'Activity History', 'Legal Help Wizard'],
  });
});

// 404 handler - must be after all routes
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Global error handler - must be last middleware with 4 params
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err.message, err.stack);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 NyayaAI v2.0 Server is running!                      ║
║                                                            ║
║   Local:       http://localhost:${PORT}                      ║
║   Health:      http://localhost:${PORT}/api/health           ║
║   Case API:    http://localhost:${PORT}/api/case             ║
║   Legal Help:  http://localhost:${PORT}/api/legal-help       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

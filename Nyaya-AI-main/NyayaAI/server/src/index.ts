import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import healthRoutes from './routes/health';
import chatRoutes from './routes/chat';
import rightsRoutes from './routes/rights';
import lawsRoutes from './routes/laws';
import caseStatusRoutes from './routes/caseStatus';
import authRoutes from './routes/auth';
import documentsRoutes from './routes/documents';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/ai', chatRoutes);
app.use('/api/rights', rightsRoutes);
app.use('/api/laws', lawsRoutes);
app.use('/api/case-status', caseStatusRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to NyayaAI API',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 NyayaAI Server is running!                           ║
║                                                            ║
║   Local:            http://localhost:${PORT}                 ║
║   API Health:       http://localhost:${PORT}/api/health      ║
║   Environment:      ${process.env.NODE_ENV || 'development'}                        ║
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

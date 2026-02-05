import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Health check endpoint
router.get('/', (req: Request, res: Response) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      name: mongoose.connection.name || 'N/A',
    },
    memory: {
      used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
    },
  };

  try {
    res.status(200).json({
      success: true,
      data: healthCheck,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Service unavailable',
    });
  }
});

// Detailed health check
router.get('/detailed', async (req: Request, res: Response) => {
  try {
    // Check MongoDB connection
    const dbStatus = mongoose.connection.readyState;
    const dbStatusText = ['disconnected', 'connected', 'connecting', 'disconnecting'][dbStatus];

    // Check if we can perform a simple query
    let dbPingSuccess = false;
    try {
      if (mongoose.connection.db) {
        await mongoose.connection.db.admin().ping();
        dbPingSuccess = true;
      }
    } catch (e) {
      dbPingSuccess = false;
    }

    const healthCheck = {
      status: dbPingSuccess ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        api: {
          status: 'up',
          responseTime: 'fast',
        },
        database: {
          status: dbStatusText,
          ping: dbPingSuccess ? 'success' : 'failed',
          host: mongoose.connection.host || 'N/A',
          name: mongoose.connection.name || 'N/A',
        },
      },
      system: {
        uptime: `${Math.floor(process.uptime() / 60)} minutes`,
        nodeVersion: process.version,
        platform: process.platform,
        memory: {
          heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
          heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
          external: `${Math.round(process.memoryUsage().external / 1024 / 1024)} MB`,
        },
      },
    };

    res.status(dbPingSuccess ? 200 : 503).json({
      success: dbPingSuccess,
      data: healthCheck,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;

import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getHealth = async (req: Request, res: Response): Promise<void> => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  };

  res.status(200).json({
    success: true,
    data: healthCheck,
  });
};

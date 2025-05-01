import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import logger from '#utils/logger.util';
import productRoutes from '#routes/product.routes';
import connectDB from '#config/db';
import { errorHandler, notFoundHandler } from '#middleware/error-handler';

dotenv.config();

const startServer = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await connectDB();

      const app = express();

      app.use(helmet());
      app.use(cors({
        origin: '*',  // Allow all origins for Chrome extension
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false
      }));

      // Enable pre-flight requests for all routes
      app.options('*', cors());

      const limiter = rateLimit({
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
        max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
      });
      app.use(limiter);

      app.use(morgan('tiny', {
        stream: {
          write: (message) => logger.info(message.trim())
        }
      }));

      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      app.use(compression());

      const apiPrefix = process.env.API_PREFIX || '/api/v1';
      app.use(`${apiPrefix}/products`, productRoutes);

      app.use(notFoundHandler);
      app.use(errorHandler);

      const PORT = process.env.PORT || 3000;
      const server = app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
        logger.info(`Environment: ${process.env.NODE_ENV}`);
        resolve(server);
      });

      server.on('error', (error) => {
        logger.error('Server error:', error);
        reject(error);
      });
    } catch (error) {
      logger.error('Failed to start server:', error);
      reject(error);
    }
  });
};

startServer()
  .then((server) => {
    logger.info('Application started successfully');
  })
  .catch((error) => {
    logger.error('Failed to start application:', error);
    process.exit(1);
  });
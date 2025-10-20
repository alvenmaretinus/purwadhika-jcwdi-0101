import pino from 'pino';

export const logger = pino({
  // Configure Pino for pretty printing in development
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // Enable colorized output
      translateTime: 'SYS:HH:MM:ss', // Format timestamp
      ignore: 'pid,hostname', // Ignore specific fields
    },
  },
});

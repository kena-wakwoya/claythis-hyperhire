import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';

export const customLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}] ${message}`;
        }),
)}),
    new winston.transports.File({
      filename: path.join(__dirname, 'logs/application.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});
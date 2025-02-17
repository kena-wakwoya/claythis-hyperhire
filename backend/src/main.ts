import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { customLogger } from './logger';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception/prisma-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:customLogger});
  app.useGlobalFilters(new HttpExceptionFilter(), new PrismaExceptionFilter());  
  // Enable CORS
  app.enableCors({
    origin: '*', // Allows all origins (use specific domains in production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow cookies/auth headers
  });
  // Catch unhandled exceptions
   process.on('uncaughtException', (error) => {
    customLogger.error(`Uncaught Exception: ${error.message}`, error.stack);
  });

  // Catch unhandled promise rejections
  process.on('unhandledRejection', (reason) => {
    customLogger.error(`Unhandled Rejection: ${reason}`);
  });
  // Get PORT from environment variables
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 8000);
  await app.listen(port);
}
bootstrap();

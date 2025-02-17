import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class HealthService {
  constructor(
    private prismaService: PrismaService,
    private health: HealthCheckService,
  ) {}

  @HealthCheck()
  async check() {
    try {
      // Simple query to check if Prisma can connect
      await this.prismaService.$queryRaw`SELECT 1`;

      return { status: 'up' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Specific Prisma error handling
        return { status: 'down', message: 'Database connection failed' };
      }

      // Generic error handling
      return { status: 'down', message: 'Unknown error occurred' };
    }
  }
}

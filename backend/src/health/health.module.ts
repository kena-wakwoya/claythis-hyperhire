
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './indicators/prisma.indicator';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [TerminusModule],  
  providers: [PrismaHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}

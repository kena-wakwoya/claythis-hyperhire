
import { Module,Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export the service for other modules to use
})
export class PrismaModule {}

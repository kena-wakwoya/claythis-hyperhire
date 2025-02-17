import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';
import { MenuModule } from './menu/menu.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env',
  }),
  HealthModule, MenuModule,PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

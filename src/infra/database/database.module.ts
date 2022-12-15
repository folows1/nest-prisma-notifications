import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/application/repositories/notification-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepo } from './prisma/repositories/prisma-notification-repo';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepo,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}

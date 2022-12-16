import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mapper/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepo implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}
  findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }
  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async create(notification: Notification) {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }
}

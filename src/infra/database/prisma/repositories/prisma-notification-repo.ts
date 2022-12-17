import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mapper/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepo implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification) {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async findActivesByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
        cancelledAt: null,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification);
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data: raw,
    });
  }

  async countActivesByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
        cancelledAt: null,
      },
    });

    return count;
  }
}

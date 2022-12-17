import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';

interface GetActivesNotificationRequest {
  recipientId: string;
}

interface GetActivesNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetActivesNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetActivesNotificationRequest,
  ): Promise<GetActivesNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findActivesByRecipientId(recipientId);

    return { notifications };
  }
}

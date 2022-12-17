import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';

interface CountActivesNotificationRequest {
  recipientId: string;
}

interface CountActivesNotificationResponse {
  count: number;
}

@Injectable()
export class CountActivesNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountActivesNotificationRequest,
  ): Promise<CountActivesNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countActivesByRecipientId(
      recipientId,
    );

    return { count };
  }
}

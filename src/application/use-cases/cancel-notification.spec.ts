import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepo = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationsRepo);

    const notification = new Notification({
      content: new Content('conteudo'),
      category: 'category',
      recipientId: 'recId',
    });

    await notificationsRepo.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepo.notifications[0].cancelledAt).toEqual(
      expect.any(Date),
    );
  });
  it('should not be able to cancel a notification that does not exist', async () => {
    const notificationsRepo = new InMemoryNotificationsRepository();

    const cancelNotification = new CancelNotification(notificationsRepo);

    await expect(
      cancelNotification.execute({
        notificationId: 'notificationId',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});

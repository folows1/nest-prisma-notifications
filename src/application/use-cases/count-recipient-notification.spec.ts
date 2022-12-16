import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count Notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepo = new InMemoryNotificationsRepository();

    const countRecipientNotifications = new CountRecipientNotification(
      notificationsRepo,
    );

    await notificationsRepo.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepo.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepo.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toBe(2);
    expect(notificationsRepo.notifications).toHaveLength(3);
  });
});

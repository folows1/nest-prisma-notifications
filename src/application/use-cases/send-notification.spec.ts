import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notification-respo';
import { SendNotification } from './send-notification';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepo = new InMemoryNotificationsRepository();

    const sendNotification = new SendNotification(notificationsRepo);

    const { notification } = await sendNotification.execute({
      content: 'New Content',
      category: 'New Category',
      recipientId: 'New Recipient Id',
    });

    expect(notificationsRepo.notifications).toHaveLength(1);
    expect(notificationsRepo.notifications[0]).toEqual(notification);
  });
});

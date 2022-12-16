import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type OverrideProps = Partial<NotificationProps>;

export function makeNotification(override: OverrideProps = {}): Notification {
  return new Notification({
    category: 'categoria',
    content: new Content('conteudo'),
    recipientId: 'recipient-1',
    ...override,
  });
}

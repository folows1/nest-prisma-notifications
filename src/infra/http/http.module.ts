import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountActivesNotification } from '@application/use-cases/count-actives-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { GetActivesNotification } from '@application/use-cases/get-actives-notification';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controller/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    CountActivesNotification,
    GetActivesNotification,
  ],
})
export class HttpModule {}

import { Type } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

const ApplicationModules = [MessagesModule, UsersModule];

export default ApplicationModules satisfies Type[];

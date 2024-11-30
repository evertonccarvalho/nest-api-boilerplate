import { Type } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

const ApplicationModules = [AuthModule, MessagesModule, UsersModule];

export default ApplicationModules satisfies Type[];

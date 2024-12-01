import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/infra/database/typeorm/enums/roles';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);

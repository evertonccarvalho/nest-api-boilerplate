import { Type } from '@nestjs/common';
import { ConfigsModule } from 'src/config/config.module';
import { TypeOrmDatabaseModule } from './database/typeorm/typeorm.module';

const InfrastructureModules = [ConfigsModule, TypeOrmDatabaseModule];

export default InfrastructureModules satisfies Type[];

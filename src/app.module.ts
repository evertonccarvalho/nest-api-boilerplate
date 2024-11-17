import { Module } from '@nestjs/common';
import InfrastructureModules from './infra';
import ApplicationModules from './modules';

@Module({
  imports: [...InfrastructureModules, ...ApplicationModules],
  controllers: [],
  providers: [],
})
export class AppModule {}

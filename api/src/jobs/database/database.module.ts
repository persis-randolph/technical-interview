import { Module } from '@nestjs/common';
import { databaseProviders } from './database2.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

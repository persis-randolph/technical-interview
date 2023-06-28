import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { jobsProviders } from './jobs.providers';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [JobsController],
  providers: [JobsService, ...jobsProviders],
})
export class JobsModule {}

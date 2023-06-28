import { Controller, Get, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './interfaces/job.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('count')
  findJobCount() {
    // return 'hey';
    return this.jobsService.findJobCount();
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':page')
  findJobPage(@Param() params: any): Promise<Job[]> {
    return this.jobsService.findJobPage(params.page);
  }
}

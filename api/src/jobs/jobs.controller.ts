import { Controller, Get, Param, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './interfaces/job.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @Get('count')
  getJobCount() {
    return this.jobsService.getJobCount();
  }

  // allows additional sort by location
  @Get(':page/:loc')
  getSortedJobsByPage(
    @Param() params: any,
    @Param('loc') sort: string,
  ): string {
    return `Page: ${params.page} Location: ${params.loc}`;
  }

  // default sort should be newest posted
  @Get(':page')
  findJobsByPage(@Param() params: any): Promise<Job[]> {
    return this.jobsService.findJobsByPage(params.page);
  }

  // not using at the moment
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }
}

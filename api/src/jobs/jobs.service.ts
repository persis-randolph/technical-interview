import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Job } from './interfaces/job.interface';

@Injectable()
export class JobsService {
  constructor(
    @Inject('JOB_MODEL')
    private jobModel: Model<Job>,
  ) {}

  async findAll(): Promise<Job[]> {
    return this.jobModel
      .find(
        {
          expiredAt: null,
        },
        {
          body: 1,
          city_name: 1,
          company_name: 1,
          is_earn_and_learn: 1,
          is_gateway_job: 1,
          location: 1,
          posted: 1,
          riasec: 1,
          skills_name: 1,
          title_name: 1,
          title_raw: 1,
        },
      )
      .exec();
  }

  async findJobPage(page: number): Promise<Job[]> {
    const jobsToSkip = (page - 1) * 10;

    return this.jobModel
      .find(
        {
          expiredAt: null,
        },
        {
          body: 1,
          city_name: 1,
          company_name: 1,
          is_earn_and_learn: 1,
          is_gateway_job: 1,
          location: 1,
          posted: 1,
          riasec: 1,
          skills_name: 1,
          title_name: 1,
          title_raw: 1,
        },
      )
      .skip(jobsToSkip)
      .limit(10)
      .exec();
  }

  async findJobCount(): Promise<Number> {
    return this.jobModel
      .countDocuments({
        expiredAt: null,
      })
      .exec();
  }
}

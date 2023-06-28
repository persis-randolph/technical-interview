import { Connection } from 'mongoose';
import { JobSchema } from './schemas/job.schema';

export const jobsProviders = [
  {
    provide: 'JOB_MODEL',
    useFactory: (connection: Connection) => connection.model('Job', JobSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

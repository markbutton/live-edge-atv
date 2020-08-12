import { JobsStatus } from '../../models/jobs/jobs-status.model';

export const JobsStatusData: JobsStatus = {
  'status': 1,
  'statusDetail': 'passed',
  'statusMessage': 'All test jobs passed',
  'testJobsStatus': [
    {
      'id': '12341',
      'name': 'Test Job 1',
      'status': 'pass',
      'createdAt': new Date(1549036800000),
      'startedAt': new Date(1549036800000),
      'finishedAt': new Date(1549040400000),
      'user': 'Mark Button'
    },
    {
      'id': '12342',
      'name': 'Test Job 2',
      'status': 'pass',
      'createdAt': new Date(1549036800000),
      'startedAt': new Date(1549209600000),
      'finishedAt': new Date(1549213200000),
      'user': 'Mark Button'
    },
    {
      'id': '12343',
      'name': 'Test Job 3',
      'status': 'pass',
      'createdAt': new Date(1549036800000),
      'startedAt': new Date(1549209600000),
      'finishedAt': new Date(1549213200000),
      'user': 'Mark Button'
    },
  ]
};

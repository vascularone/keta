import cron from 'node-cron'
import { logJob } from "./jobs";
import { Router } from 'express';
import { CronTypes } from './helpers';

export const cronRouter = Router();

/**
 * map of jobs bcz if if future me wants to do a "stop all crons"
 * i can do another map with array of scheduled tasks :)
 */
const jobs: Map<CronTypes, cron.ScheduledTask> = new Map();

jobs.set(CronTypes.logJob, logJob)

cronRouter.post('/start', async (req, _) => {
  console.log('cronId', req.body)
  const { cronId } = req.body;
  if(!cronId || !Object.values(CronTypes).includes(cronId as CronTypes))
    {
      console.log("this cron type doesn't exist")
      return
    }
  const job = jobs.get(cronId)
  if(!job) {
    console.log("there's no job with this id")
    return
  }
  job.start()
  console.log(`job - ${CronTypes[cronId as keyof typeof CronTypes]} - started`)
})

cronRouter.post('/stop', (req, _) => {
  console.log('cronId', req.body)
  const { cronId } = req.body;
  if(!cronId || !Object.values(CronTypes).includes(cronId as CronTypes))
    {
      console.log("this cron type doesn't exist")
      return
    }
  const job = jobs.get(cronId)
  if(!job) {
    console.log("there's no job with this id")
    return
  }
  job.stop()
  console.log(`job - ${CronTypes[cronId as keyof typeof CronTypes]} - stopped`)
})

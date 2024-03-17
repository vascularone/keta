import cron from 'node-cron'
import { CronTypes, stopCron } from '../helpers'

/**
 * JOB NAME REASON
 * log job function names are defined like the ones
 * in the helpers enum
 * for the sake of better readability
 * and not fucking up simple names :)
 * (not a long term solution but no brain cells atm)
 */

/**
 * for crons that are desired to stop after it's job
 * run the stopCron after
 * otherwise stop them at will by a post request
 */

export const logJob = cron.schedule('*/3 * * * * *', async ()=>{
  console.log('croning :)')
  await stopCron(CronTypes.logJob)
}, {scheduled:false})

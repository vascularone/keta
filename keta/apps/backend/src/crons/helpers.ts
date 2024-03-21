// for the sake of type safety and not string typed chaos
export enum CronTypes {
  logJob = "logJob",
  logJob2 = "logJob2"
}

/**
 * simple way to stop a cron, because we can't stop a cron
 * inside the cron's "schedule" method
 * so we do a post request, on the cron we desire to stop
 * after the finished job
 * */
export const stopCron = async (cronId: string) => {
  try {
    await fetch(`${process.env.HOST}/cron/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cronId }),
    });
  } catch {
    console.log('error occured while stopping the cron')
  }
}

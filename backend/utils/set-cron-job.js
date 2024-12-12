const { CronJob } = require("cron");

let currentJob;

exports.setCronJob = async (schedule, task, onComplete = () => {
    console.log("Job completed!");
}) => {

    if (currentJob) {
        console.log("Stopping existing cron job...");
        currentJob.stop();
    }

    currentJob = CronJob.from({
        cronTime: String(schedule),
        onTick: () => {
            console.log({ schedule }, "Running cron job... at " + new Date());
            task();
        },
        onComplete,
        start: false,
        timeZone: 'America/Los_Angeles'
    });

    currentJob.start();
    console.log({ schedule }, "New cron job started!");
}



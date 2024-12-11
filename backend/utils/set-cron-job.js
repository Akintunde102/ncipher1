const { CronJob } = require("cron");

let currentJob;

exports.setCronJob = async (schedule, task, onComplete = () => {
    console.log("Job completed!");
}) => {

    console.log({ schedule, task, onComplete });

    if (currentJob) {
        console.log("Stopping existing cron job...");
        currentJob.stop();
    }

    currentJob = CronJob.from({
        cronTime: String(schedule),
        onTick: task,
        onComplete,
        start: false,
        timeZone: 'America/Los_Angeles'
    });

    currentJob.start();
    console.log("New cron job started!");
}



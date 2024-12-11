const TransactionsServices = require('./../services/TransactionsServices');
const { changeMinToCronTime } = require('./../utils/changeMinToCronTime');

exports.getBiggestWhalesTransactions = async (req, res) => {
    const biggestWhalesTransactions = await TransactionsServices.trackBiggestWhales();
    res.status(200).json(biggestWhalesTransactions);
}

exports.setBiggestWhaleTransactionsCronJob = async (req, res) => {
    const time = req.body.time;

    if (!time) {
        return res.status(400).json({ success: false, error: 'time is required' });
    }

    const cronTime = changeMinToCronTime(time);

    await TransactionsServices.setBiggestWhalesTransactionsCronJob(cronTime);

    return res.status(200).json({
        success: true,
        message: "Cron Job Set Successfully for " + time + " minutes",
    });
}
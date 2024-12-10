const TrackServices = require('../services/TrackServices');

exports.trackBiggestWhales = async (req, res) => {
    const biggestWhalesTransactions = await TrackServices.trackBiggestWhales();
    res.status(200).json(biggestWhalesTransactions);
}
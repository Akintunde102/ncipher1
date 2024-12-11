const express = require('express')
const router = express.Router()

const TransactionsController = require('../controllers/TransactionsController')

router.post('/set-cron-job', TransactionsController.setBiggestWhaleTransactionsCronJob)

module.exports = router
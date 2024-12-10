const express = require('express')
const router = express.Router()

const TrackController = require('../controllers/TrackController')

router.get('/', TrackController.trackBiggestWhales)

module.exports = router
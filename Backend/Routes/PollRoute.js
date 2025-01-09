const express = require('express')
const router = express.Router()
const VerifyToten = require('./../Middleware/VerifyToken')
const PollController = require('../Controller/Poll')

router.post('/createpoll',VerifyToten.verifyToken, PollController.CratePoll)
router.get('/poll', VerifyToten.verifyToken ,PollController.GetAllPollList)
router.get('/poll/:id',VerifyToten.verifyToken, PollController.GetPollDetailsById)
router.delete('/poll/:id',VerifyToten.verifyToken, PollController.DeletePollById)

module.exports = router
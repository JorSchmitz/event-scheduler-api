const express = require('express')
const router = express.Router()
const passport = require('../libs/passport')

const eventControllers = require('../controllers/events.controller')

router
  .route('/')
  .get(eventControllers.getEvents)
  .post(eventControllers.postEvent)

router
  .route('/:id')
  .get(eventControllers.getEventById)
  .put(eventControllers.putEvent)
  .delete(eventControllers.deleteEvent)

module.exports = router

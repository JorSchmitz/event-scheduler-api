const express = require('express')
const router = express.Router()
const passport = require('../libs/passport')

const eventControllers = require('../controllers/events.controller')

router
  .route('/')
  .get(eventControllers.getEvents)
  .post(passport, eventControllers.postEvent)

router
  .route('/:id')
  .get(eventControllers.getEventById)
  .put(passport, eventControllers.putEvent)
  .delete(passport, eventControllers.deleteEvent)

module.exports = router

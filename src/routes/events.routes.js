const express = require('express')
const router = express.Router()
const passport = require('../libs/passport')
const { checkAdmin } = require('../middlewares/permissionsChecker.middleware')

const eventControllers = require('../controllers/events.controller')

router
  .route('/')
  .get(passport, eventControllers.getEvents)
  .post(passport, checkAdmin, eventControllers.postEvent)

router
  .route('/:id')
  .get(passport, eventControllers.getEventById)
  .put(passport, checkAdmin, eventControllers.putEvent)
  .delete(passport, checkAdmin, eventControllers.deleteEvent)

module.exports = router

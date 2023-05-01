const express = require('express')
const eventsRoutes = require('./events.routes')
const authRoutes = require('./auth.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', authRoutes)
  router.use('/events', eventsRoutes)
}

module.exports = routerModels

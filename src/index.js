const express = require('express')

const config = require('./database/config/config').api
const routerModels = require('./routes/models.router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', ({ res }) => {
  return res.json({
    status: 'Up',
    maintenance: false,
  })
})

routerModels(app)

if (config.nodeEnv != 'test') {
  app.listen(config.port, () => {
    console.log(`Server started on port: ${config.port}`)
  })
}

module.exports = { app }

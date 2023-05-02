const express = require('express')
const cors = require('cors')

const config = require('./database/config/config').api
const routerModels = require('./routes/models.router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const whitelist = ['http://localhost:5173']
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

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

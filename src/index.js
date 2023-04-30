const express = require('express')

// const db = require('./database/database')

const config = require('./database/config/config').api

const app = express()

app.use(express.json())

// db.authenticate()
//   .then(() => {
//     console.log('Database authenticated')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// db.sync()
//   .then(() => {
//     console.log('Database synced')
//   })
//   .catch((err) => {
//     console.log(err)
//   })

app.get('/', ({ res }) => {
  return res.json({
    status: 'Up',
    maintenance: false,
  })
})

if (config.nodeEnv != 'test') {
  app.listen(config.port, () => {
    console.log(`Server started on port: ${config.port}`)
  })
}

const { ExtractJwt, Strategy } = require('passport-jwt')
const passport = require('passport')

const config = require('../database/config/config').api
const { getAuthUserOr404 } = require('../services/users.service')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: config.secretOrKey,
}

passport.use(
  new Strategy(options, (tokenDecoded, done) => {
    getAuthUserOr404(tokenDecoded.id)
      .then((user) => {
        if (user) {
          return done(null, tokenDecoded)
        } else {
          return done(null, false)
        }
      })
      .catch((err) => {
        return done(err, false)
      })
  })
)

module.exports = passport.authenticate('jwt', { session: false })

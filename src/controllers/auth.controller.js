const { checkUsersCredentials } = require('../services/auth.service')
const jwt = require('jsonwebtoken')
const config = require('../database/config/config')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await checkUsersCredentials(email, password)

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.api.secretOrKey,
      { expiresIn: '24h' }
    )

    return res.status(200).json({
      message: 'Correct Credentials',
      token,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
}

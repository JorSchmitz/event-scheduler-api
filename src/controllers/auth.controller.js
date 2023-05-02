const { checkUsersCredentials } = require('../services/auth.service')
const { createUser } = require('../services/users.service')
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

const signUp = async (req, res, next) => {
  try {
    const { body } = req
    const user = await createUser(body)
    return res.status(201).json({ message: 'Success Sign Up' })
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating user',
      fields: {
        name: 'string',
        email: 'string',
        password: 'string',
      },
    })
  }
}

module.exports = {
  login,
  signUp,
}

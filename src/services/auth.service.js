const { findUserByEmailOr404 } = require('./users.service')
const { comparePassword } = require('../libs/bcrypt')

const checkUsersCredentials = async (email, password) => {
  const user = await findUserByEmailOr404(email)
  const verifyPassword = comparePassword(password, user.password)
  return user
}

module.exports = {
  checkUsersCredentials,
}

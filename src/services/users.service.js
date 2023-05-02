const models = require('../database/models')
const { CustomError } = require('../utils/helpers')

const getAuthUserOr404 = async (id) => {
  let user = await models.Users.findByPk(id)
  if (!user) throw new CustomError('User not found', 404, 'Not found')
  return user
}

const findUserByEmailOr404 = async (email) => {
  const user = await models.Users.findOne({ where: { email } })
  return user
}

module.exports = {
  getAuthUserOr404,
  findUserByEmailOr404,
}

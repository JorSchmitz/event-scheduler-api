const models = require('../database/models')
const { hashPassword } = require('../libs/bcrypt')
const { CustomError } = require('../utils/helpers')
const uuid = require('uuid')

const getAuthUserOr404 = async (id) => {
  let user = await models.Users.findByPk(id)
  if (!user) throw new CustomError('User not found', 404, 'Not found')
  return user
}

const findUserByEmailOr404 = async (email) => {
  const user = await models.Users.findOne({ where: { email } })
  return user
}

const createUser = async (data) => {
  const transaction = await models.sequelize.transaction()
  try {
    data.id = uuid.v4()
    data.password = hashPassword(data.password)
    data.role_id = '1'
    const newUser = await models.Users.create(data, {
      transaction,
      fields: ['id', 'name', 'email', 'username', 'password', 'role_id'],
    })
    await transaction.commit()
    return newUser
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

module.exports = {
  getAuthUserOr404,
  findUserByEmailOr404,
  createUser,
}

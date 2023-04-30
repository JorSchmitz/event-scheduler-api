'use strict'
const uuid = require('uuid')
const { Op } = require('sequelize')
const { hashPassword } = require('../../libs/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const usersSeeds = [
      {
        id: uuid.v4(),
        name: 'Jorge Pineres',
        email: 'pineres@email.com',
        username: 'pineres@email.com',
        password: hashPassword('123456789'),
        role_id: '2',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        name: 'Jane Doe',
        email: 'jane@email.com',
        username: 'jane@email.com',
        password: hashPassword('123456789'),
        role_id: '1',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
    try {
      await queryInterface.bulkInsert('users', usersSeeds, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const userNames = ['pineres@email.com', 'jane@email.com']
    try {
      await queryInterface.bulkDelete(
        'users',
        {
          username: {
            [Op.or]: userNames,
          },
        },
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}

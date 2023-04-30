'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true,
          },
          username: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
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

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}

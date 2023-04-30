'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'events',
        {
          id: {
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          description: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          start_time: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          end_time: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          location: {
            allowNull: true,
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
      await queryInterface.dropTable('events', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}

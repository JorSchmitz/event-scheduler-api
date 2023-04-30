'use strict'
const uuid = require('uuid')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const eventsSeeds = [
      {
        id: uuid.v4(),
        title: 'Event title test',
        description: 'Event description',
        start_time: '2023-05-03T12:00:00Z',
        end_time: '2023-05-06T12:00:00Z',
        location: 'Cartagena, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title: 'Event title test',
        description: 'Event description',
        start_time: '2023-05-03T12:00:00Z',
        end_time: '2023-05-06T12:00:00Z',
        location: 'Bucaramanga, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title: 'Event title test',
        description: 'Event description',
        start_time: '2023-05-03T12:00:00Z',
        end_time: '2023-05-06T12:00:00Z',
        location: 'Medellin, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title: 'Event title test',
        description: 'Event description',
        start_time: '2023-05-03T12:00:00Z',
        end_time: '2023-05-06T12:00:00Z',
        location: 'Bogota, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title: 'Event title test',
        description: 'Event description',
        start_time: '2023-05-03T12:00:00Z',
        end_time: '2023-05-06T12:00:00Z',
        location: 'Turbaco, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title: 'Event title test',
        description: 'Event description',
        start_time: '2023-05-03T12:00:00Z',
        end_time: '2023-05-06T12:00:00Z',
        location: 'Cali, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title: 'Event title test',
        description: 'Event description',
        start_time: '2023-05-03T12:00:00Z',
        end_time: '2023-05-06T12:00:00Z',
        location: 'Monteria, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title: 'Event title test',
        description: 'Event description',
        start_time: '2023-05-03T12:00:00Z',
        end_time: '2023-05-06T12:00:00Z',
        location: 'Sincelejo, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
    try {
      await queryInterface.bulkInsert('events', eventsSeeds, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const eventTitles = 'Event title test'
    try {
      await queryInterface.bulkDelete(
        'events',
        {
          title: eventTitles,
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

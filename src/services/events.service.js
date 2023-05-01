const { Op } = require('sequelize')
const models = require('../database/models')
const uuid = require('uuid')

const findAndCount = async (query) => {
  const options = {
    where: {},
  }

  const { limit, offset } = query
  if (limit && offset) {
    options.limit = limit
    options.offset = offset
  }

  const { id } = query
  if (id) {
    options.where.id = id
  }

  const { title } = query
  if (title) {
    options.where.title = { [Op.iLike]: `%${title}%` }
  }

  options.distinct = true

  const events = await models.Events.findAndCountAll(options)
  return events
}

const createEvent = async (obj) => {
  const transaction = await models.sequelize.transaction()
  console.log(obj)
  try {
    const newEvent = await models.Events.create(
      {
        id: uuid.v4(),
        title: obj.title,
        description: obj.description,
        start_time: obj.start_time,
        end_time: obj.end_time,
        location: obj.location,
      },
      { transaction }
    )
    await transaction.commit()
    return newEvent
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const findById = async (id) => {
  const event = await models.Events.findByPk(id)
  return event
}

const updateEvent = async (id, obj) => {
  const transaction = await models.sequelize.transaction()
  try {
    const event = await models.Events.findByPk(id)
    const updatedEvent = await event.update(obj, { transaction })
    await transaction.commit()
    return updatedEvent
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

const removeEvent = async (id) => {
  const transaction = await models.sequelize.transaction()
  try {
    const event = await models.Events.findByPk(id)
    await event.destroy({ transaction })
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

module.exports = {
  findAndCount,
  createEvent,
  findById,
  updateEvent,
  removeEvent,
}

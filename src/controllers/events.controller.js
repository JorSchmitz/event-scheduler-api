const {
  findAndCount,
  createEvent,
  findById,
  updateEvent,
  removeEvent,
} = require('../services/events.service')
const { getPagination, getPagingData } = require('../utils/helpers')

const getEvents = async (req, res, next) => {
  try {
    let query = req.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset
    const events = await findAndCount(query)
    const results = getPagingData(events, page, limit)
    return res.status(200).json({ results: results })
  } catch (error) {
    next(error)
  }
}

const postEvent = async (req, res) => {
  const data = req.body
  console.log(data)

  try {
    await createEvent(data)
    return res.status(201).json({ message: 'Event created' })
  } catch (error) {
    return res.status(400).json({
      message: 'Error creating event',
      fields: {
        title: 'string',
        description: 'text',
        start_time: 'datetime',
        end_time: 'datetime',
        location: 'string',
      },
      error: error,
    })
  }
}

const getEventById = async (req, res) => {
  const id = req.params.id
  try {
    const event = await findById(id)
    return res.status(200).json({ results: event })
  } catch (error) {
    return res.status(404).json({ message: `Event with ID: ${id}, not found` })
  }
}

const putEvent = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req

    if (Object.keys(body).length === 0)
      return res
        .status(400)
        .json({ message: 'Please provide at least one field to edit' })

    await updateEvent(id, body)
    return res.status(200).json({ message: 'Event updated' })
  } catch (error) {
    return res.status(400).json({
      message: 'Error updating event',
      fields: {
        title: 'string',
        description: 'text',
        start_time: 'datetime',
        end_time: 'datetime',
        location: 'string',
      },
      error: error,
    })
  }
}

const deleteEvent = async (req, res, next) => {
  const id = req.params.id
  try {
    await removeEvent(id)
    return res.status(200).json({ message: 'Event deleted' })
  } catch (error) {
    return res.status(404).json({ message: 'Event not found' })
  }
}

module.exports = {
  getEvents,
  postEvent,
  getEventById,
  putEvent,
  deleteEvent,
}

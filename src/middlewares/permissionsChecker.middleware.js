const { getAuthUserOr404 } = require('../services/users.service')

const checkAdmin = async (req, res, next) => {
  const { role_id } = await getAuthUserOr404(req.user.id)
  if (role_id === 2) {
    next()
  } else {
    return res.status(403).json({ message: 'Unauthorized' })
  }
}

module.exports = {
  checkAdmin,
}

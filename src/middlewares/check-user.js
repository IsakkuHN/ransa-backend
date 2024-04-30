import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers['authorization']
    if (!token) {
      return res.status(403).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token.substring(7), process.env.SECRET_KEY)
    req.userId = decoded.id
    req.roles = decoded.roles

    const user = await User.findByPk(req.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    next()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const hasRole = (rolesAllowed) => async (req, res, next) => {
  try {
    if (req.roles && req.roles.some((role) => rolesAllowed.includes(role))) {
      return next()
    } else {
      return res.status(403).json({ message: 'No access allowed' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

import { where } from 'sequelize'
import User from '../models/user.model.js'
import Role from '../models/role.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await User.findOne({
      where: {
        username: username,
        email: email,
      },
      include: Role,
    })

    if (!user) {
      return res.status(404).json({ message: 'User does not exists' })
    }

    const matchPassword = bcryptjs.compareSync(password, user.password)
    if (!matchPassword) {
      return res.status(401).json({ message: 'Password incorrect' })
    }

    const roles = user.Roles.map((role) => role.name.toUpperCase())

    const token = jwt.sign({ id: user.id, roles }, process.env.SECRET_KEY, {
      expiresIn: 86400,
    })

    return res.json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const signIn = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body

    let newUser = await User.create(
      {
        firstName,
        lastName,
        email,
        username,
        password,
      },
      {
        fields: ['firstName', 'lastName', 'email', 'username', 'password'],
      }
    )

    const responseUser = await userToDto(newUser)

    return res.status(201).json(responseUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    // Si no hay token, responde con un error de autorización
    return res.status(401).json({ message: 'Unauthorized' })
  }
  res.json({ message: 'Logout successful' })
}

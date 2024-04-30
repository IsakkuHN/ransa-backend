import User from '../models/user.model.js'
import { userToDto } from '../lib/model-to-dto.js'

export async function createUser(req, res) {
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

export async function getUserById(req, res) {
  const { id } = req.params
  try {
    let user = await User.findByPk(id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'username',
        'isActive',
      ],
    })

    return res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getAllUser(req, res) {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'username',
        'isActive',
      ],
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function updateUserById(req, res) {
  const { id } = req.params
  const { firstName, lastName, password } = req.body

  try {
    const user = await User.findByPk(id)
    user.firstName = firstName
    user.lastName = lastName
    user.password = password
    await user.save()

    const responseUser = await userToDto(user)

    return res.json(responseUser)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function deleteUserById(req, res) {
  const { id } = req.params

  try {
    await User.destroy({
      where: {
        id,
      },
    })

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

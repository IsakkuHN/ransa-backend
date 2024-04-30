import Role from '../models/role.model.js'
import { roleToDto } from '../lib/model-to-dto.js'

export const createRole = async (req, res) => {
  try {
    const { name, description } = req.body
    const role = await Role.create(
      { name, description },
      {
        fields: ['name', 'description'],
      }
    )

    const responseRole = await roleToDto(role)

    return res.status(201).json(responseRole)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params
    const role = await Role.findByPk(id, {
      attributes: ['id', 'name', 'description'],
    })

    if (role === null) {
      return res.status(404).json({ message: 'Role not found' })
    }

    return res.json(role)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function getAllRoles(req, res) {
  try {
    const roles = await Role.findAll({
      attributes: ['id', 'name', 'description'],
    })

    return res.json(roles)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const updateRoleById = async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body

    const role = await Role.findByPk(id)
    if (role === null) {
      return res.status(404).json({ message: 'Role not found' })
    }

    role.description = description
    role.save()

    const responseRole = await roleToDto(role)
    return res.json(responseRole)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const deleteRoleById = async (req, res) => {
  try {
    const { id } = req.params
    await Role.destroy({
      where: { id },
    })
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

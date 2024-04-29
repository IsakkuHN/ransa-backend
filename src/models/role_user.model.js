import { DataTypes } from 'sequelize'
import User from './user.model.js'
import Role from './role.model.js'
import sequelize from '../database.js'

const UserRole = sequelize.define(
  'UserRole',
  {
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
  },
  {
    uniqueKeys: {
      user_role_unique: {
        fields: ['userId', 'roleId'],
      },
    },
  }
)

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

export default UserRole

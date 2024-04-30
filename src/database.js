import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
  }
)

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Connection established')
  })
  .catch((err) => {
    console.error('Failed to connect: ' + err)
  })

export default sequelize

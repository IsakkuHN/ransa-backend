import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: 'localhost',
    port: 23306,
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

import app from './app.js'
import sequelize from './database.js'
import dotenv from 'dotenv'
import './models/user.model.js'
import './models/role.model.js'
import './models/role_user.model.js'

dotenv.config()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('listening on port ', PORT)
})

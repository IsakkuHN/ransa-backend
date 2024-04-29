import { Router } from 'express'
import * as userController from '../controllers/user.controller.js'

const router = Router()

router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUserById)
router.post('/', userController.createUser)
router.delete('/:id', userController.deleteUserById)

export default router
import { Router } from 'express'
import * as userController from '../controllers/user.controller.js'
import { verifyToken, hasRole } from '../middlewares/check-user.js'
const router = Router()

router.post(
  '/roles/:id',
  [verifyToken, hasRole(['ADMIN'])],
  userController.assignUserRoles
)
router.get(
  '/roles/:id',
  [verifyToken, hasRole(['ADMIN'])],
  userController.getUserRoles
)

router.get(
  '/',
  [verifyToken, hasRole(['EDITOR', 'ADMIN'])],
  userController.getAllUser
)
router.get('/:id', [verifyToken], userController.getUserById)
router.put(
  '/:id',
  [verifyToken],
  hasRole(['ADMIN']),
  userController.updateUserById
)
router.post('/', [verifyToken, hasRole(['ADMIN'])], userController.createUser)
router.delete(
  '/:id',
  [verifyToken, hasRole(['ADMIN'])],
  userController.deleteUserById
)

export default router

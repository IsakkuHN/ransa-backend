import { Router } from 'express'
import * as roleController from '../controllers/role.controller.js'

import { verifyToken, hasRole } from '../middlewares/check-user.js'
const router = Router()

router.get('/', [verifyToken], roleController.getAllRoles)
router.get('/:id', [verifyToken], roleController.getRoleById)
router.put('/:id', [verifyToken], roleController.updateRoleById)
router.post('/', [verifyToken], roleController.createRole)
router.delete('/:id', [verifyToken], roleController.deleteRoleById)

export default router

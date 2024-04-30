import { Router } from 'express'
import * as roleController from '../controllers/role.controller.js'

const router = Router()

router.get('/', roleController.getAllRoles)
router.get('/:id', roleController.getRoleById)
router.put('/:id', roleController.updateRoleById)
router.post('/', roleController.createRole)
router.delete('/:id', roleController.deleteRoleById)

export default router

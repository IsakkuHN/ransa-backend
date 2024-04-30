import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'

import { verifyToken, hasRole } from '../middlewares/check-user.js'

const router = Router()

router.post('/login', authController.login)
router.post('/signin', authController.signIn)
router.post('/logout', [verifyToken], authController.logout)

export default router

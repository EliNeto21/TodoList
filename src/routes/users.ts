import { Router } from 'express'
import u from '../middlewares/users'
import { verifyToken } from '../middlewares/token'
import { checkOwner } from '../middlewares/checkOwner'

const router = Router()
router.get('/', verifyToken, u.getManyUsers)
router.post('/', verifyToken, u.createUser)
router.put('/:id', verifyToken, checkOwner, u.updateUser)
router.delete('/:id', verifyToken, checkOwner, u.deleteUser)

export default router
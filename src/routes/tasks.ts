import { Router } from "express"
import { verifyToken } from '../middlewares/token'
import { createTask, getAllTask, getAllIncompleteTask, getAllTaskCompleted, attStatusTask } from "../middlewares/tasks"

const router = Router()
router.get('/:id', getAllIncompleteTask)
router.get('/All/:id', getAllTask)
router.get('/Complete/:id', getAllTaskCompleted)
//router.post('/:id', createTask)
router.post('/:id', verifyToken, createTask)
//router.put('/:id', attStatusTask)
router.put('/:id', verifyToken, attStatusTask)


export default router
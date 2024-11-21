import { Router } from "express"
import { createTask, getAllTask, getAllIncompleteTask, getAllTaskCompleted } from "../middlewares/tasks"

const router = Router()
router.get('/:id', getAllIncompleteTask)
router.get('/All/:id', getAllTask)
router.get('/Complete/:id', getAllTaskCompleted)
router.post('/:id', createTask)


export default router
import { Router } from "express"
import { createTask, getAllTask, getAllIncompleteTask, getAllTaskCompleted } from "../middlewares/tasks"

const router = Router()
router.get('/', getAllIncompleteTask)
router.get('/All', getAllTask)
router.get('/Complete', getAllTaskCompleted)
router.post('/', createTask)


export default router
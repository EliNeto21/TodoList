import express, { Router } from 'express'
import users from './users'
import token from './token'
import tasks from './tasks'
const router = Router()
router.use(express.json())
router.use(express.static(__dirname + '/../../public'))
router.use('/users', users)
router.use('/token', token)
router.use('/tasks', tasks)
export default router
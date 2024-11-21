import { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"
import { Task } from "../types/item"

const tasks = [];

const prisma = new PrismaClient({
    log:["query"]
})

export const createTask: RequestHandler = async (req, res) => {

    try {
        const { id } = req.params

        const newTask: Task = {
            name: req.body.name,
            content: "",
            done: req.body.done,
            userId: Number(id)
        }

        const result = await prisma.task.create({
            data:{
                name: newTask.name,
                content: "",
                done: newTask.done,
                userId: newTask.userId
            }
        })
        
        res.status(200).send(result);
    } 
    catch (e) {
        res.status(401).json({ 'message': 'Erro ao cadastrar a nova tarefa, entre em contato com o administrador do sistema!' })
    }
    finally {
        await prisma.$disconnect();
    }
}

export const getAllTask: RequestHandler = async (req, res) => {

    try {

        const { id } = req.params

        const tarefas = await prisma.task.findMany({
            where: {
                userId: Number(id)
            }
        })

        res.status(200).json(tarefas)
    } 
    catch (e) {
        res.status(401).json({ 'message': 'Erro ao consultar as tarefas cadastradas, entre em contato com o administrador do sistema!' })
    }
    finally {
        await prisma.$disconnect();
    }
}

export const getAllIncompleteTask: RequestHandler = async (req, res) => {

    try {

        const { id } = req.params

        const tarefas = await prisma.task.findMany({
            where: {
                userId: Number(id),
                done: false
            }
        })

        res.status(200).json(tarefas)
    } 
    catch (e) {
        res.status(401).json({ 'message': 'Erro ao consultar as tarefas cadastradas, entre em contato com o administrador do sistema!' })
    }
    finally {
        await prisma.$disconnect();
    }
}

export const getAllTaskCompleted: RequestHandler = async (req, res) => {

    try {
        const { id } = req.params

        const tarefas = await prisma.task.findMany({
            where: {
                userId: Number(id),
                done: true
            }
        })

        res.status(200).json(tarefas)
    } 
    catch (e) {
        res.status(401).json({ 'message': 'Erro ao consultar as tarefas cadastradas, entre em contato com o administrador do sistema!' })
    }
    finally {
        await prisma.$disconnect();
    }
}

export default {
    createTask,
    getAllTask,
    getAllIncompleteTask,
    getAllTaskCompleted
  }
import { RequestHandler } from "express"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { User } from "../types/item"

const prisma = new PrismaClient({
  log:["query"]
})

const getManyUsers: RequestHandler = async (req, res) => {
  try {
    
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } 
  catch (e) {
      res.status(401).json({ 'message': 'Erro ao consultar os usuários cadastrados, entre em contato com o administrador do sistema!' })
  }
  finally {
    await prisma.$disconnect();
  }
}

const createUser: RequestHandler = async (req, res) => {
  try {
    const newUser: User = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    }

    const result = await prisma.user.create({
        data:{
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        }
    })
    
    res.status(200).send(result);
  } 
  catch (e) {
      res.status(401).json({ 'message': 'Erro ao cadastrar um novo usuário, entre em contato com o administrador do sistema!' })
  }
  finally {
      await prisma.$disconnect();
  }
}

const updateUser: RequestHandler = async (req, res) => {
  try {

    const { id } = req.params;

    const userAtt: User = {
      id: Number(id),
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    }
  
    if (userAtt.password && userAtt.password.trim().length > 0) {
  
      const result = await prisma.user.update({
        where: {
          id: userAtt.id
        },
        data: {
          name: userAtt.name,
          email: userAtt.email,
          password: userAtt.email
        }
      })
  
      res.status(200).send(result);
    }
    else {
      throw new Error('O campo "password" é obrigatório!');
    }
  } 
  catch (error) {
      res.status(401).json({ 'message': error })
  }
  finally {
      await prisma.$disconnect();
  }
}

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: Number(id)
      }
    })

    if (user?.email !== localStorage.getItem('email')) {
      throw new Error('Você não tem permissão para apagar outros usuários!');
    }

    const response = await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })

    res.status(200).send(response);
  } 
  catch (e) {
      res.status(401).json({ 'message': 'Erro ao deletar o usuário, entre em contato com o administrador do sistema! - ' + e })
  }
  finally {
      await prisma.$disconnect();
  }
}

export default {
  getManyUsers,
  createUser,
  updateUser,
  deleteUser
}
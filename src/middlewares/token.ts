import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import { refresh, sign, verify } from "../services/jwt"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
import { Token } from "../types/item"

const prisma = new PrismaClient({
  log:["query"]
})

export const createToken: RequestHandler = async (req, res) => {

  try {
    const newToken: Token = {
      email: req.body.email,
      password: req.body.password
    }

    const user = await prisma.user.findFirst({
      where: {
        email: newToken.email
      }
    })

    if (!user) {
      return res.status(401).json({ 'message': 'Email inválido' })
    }

    const match = await bcrypt.compare(newToken.password, user.password)

    if (!match) {
      return res.status(401).json({ 'message': 'Senha inválida'})
    }

    //delete user.password
    const token = await sign(user)

    res.status(200).json({"userId":user.id, "token":token})

  } catch (erro) {
    res.status(401).send('Erro: ' + erro)
  }
  finally {
    await prisma.$disconnect();
  }

}

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'No token provided' })
    }
  
    const token = req.headers.authorization
    const data = await verify(token)
    
    // @ts-ignore
    req["jwt"] = data
    next()

  } catch (err) {
    
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' })
    }
      
    if (err instanceof jwt.NotBeforeError) {
      return res.status(401).json({ message: 'Token not active yet' })
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token'})
    }

    res.status(401).send('Invalid token [n]')
  }
}

export const refreshToken: RequestHandler = (req, res) => {

  console.warn('refreshToken: procurar maneira mais segura de fazer isso')

  if (!req.headers.authorization) {
    return res.status(401).send('No token provided')
  }
    
  const newToken = refresh(req.headers.authorization)
  res.send({ token: newToken })
}

export default {
  createToken,
  verifyToken,
  refreshToken
}
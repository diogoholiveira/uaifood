import { getRepository, createConnection } from 'typeorm'
import { Restaurante } from './../../shared/entity/Restaurante'

import express, { NextFunction, Response, Request } from 'express'

import jwt from 'jsonwebtoken'
import httpProxy from 'express-http-proxy'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet'

const app = express()

const URL = 'http://localhost'

const EXPIRES_IN = 3600

app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token,x-token-liberacao')
  next()
})

createConnection().then(async connection => {
  const restauranteServiceProxy = httpProxy(`${URL}:3001`)
  const pratoServiceProxy = httpProxy(`${URL}:3002`)

  const restauranteRepository = getRepository(Restaurante)
  function verifyJWT (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['x-access-token']

      if (!token) return res.status(401).send('Nenhum token foi provido.')

      jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        if (err) return res.status(401).send('Falha ao verificar a validade do token.')

        req.body.idRestaurante = decoded.id

        const restaurante = await restauranteRepository.createQueryBuilder('restaurante')
          .where('restaurante.token = :token', { token: token })
          .getOne()

        req.body.restauranteLogado = restaurante
        req.body.token = token
        next()
      })
    } catch (error) {
      return res.status(401).send('Erro durante a validação de acesso. Mensagem: ' + error)
    }
  }

  // autenticação
  app.post('/loginRestaurante', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurante = await restauranteRepository.createQueryBuilder('restaurante')
        .where('restaurante.usuario = :usuario', { usuario: req.body.usuario })
        .andWhere('restaurante.senha = :senha', { senha: req.body.senha })
        .getOne()

      if (restaurante) {
        const id = restaurante.id
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: EXPIRES_IN
        })

        restaurante.token = token
        await connection.manager.save(connection.manager.create(Restaurante, restaurante))

        const resultado = { auth: true, token: token }
        res.status(200).send(resultado)
      } else {
        res.status(500).send('Login inválido!')
      }
    } catch (error) {
      res.status(500).send('Ocorreu um erro durante o login. Mensagem: ' + error)
    }
  })

  app.get('/', (req, res) => {
    return res.json({ message: 'Servidor instanciado!' })
  })

  app.get('/restaurante/*', async (req: Request, res: Response, next: NextFunction) => {
    restauranteServiceProxy(req, res, next)
  })

  app.get('/cidade/*', async (req: Request, res: Response, next: NextFunction) => {
    restauranteServiceProxy(req, res, next)
  })

  app.get('/prato/*', verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    pratoServiceProxy(req, res, next)
  })

  app.post('/restaurante/*', async (req: Request, res: Response, next: NextFunction) => {
    try {
      restauranteServiceProxy(req, res, next)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/cidade/*', async (req: Request, res: Response, next: NextFunction) => {
    try {
      restauranteServiceProxy(req, res, next)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.post('/prato/*', verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
      pratoServiceProxy(req, res, next)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.listen(3000, () => {
    console.log('Servidor escutando na porta 3000!')
  })
}).catch(error => console.log(error))

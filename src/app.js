import express from 'express'
import {json} from 'body-parser'
import morgan from 'morgan'
import cors from "cors"
import cursoRoute from "./routes/curso-routes"
import usuarioRoute from "./routes/usuario-routes"
import loginRoute from "./routes/auth-routes"

const app = express()

/* middlewares */
app.use(morgan('dev'))
app.use(json())
app.use(cors())

app.use('/api/curso', cursoRoute)
app.use('/api/usuario', usuarioRoute)
app.use('/api/login', loginRoute)

export default app
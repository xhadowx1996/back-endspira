import {Router } from 'express'
import loginDao from "../controllers/auth-controllers"



const router = Router()

router.post('/',loginDao.loginUser)

export default router
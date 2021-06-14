import {Router } from 'express'
import usuarioDao from "../controllers/usuario-controllers"



const router = Router()

router.post('/',usuarioDao.crearUsuario)
router.get('/',usuarioDao.obtenerUsuarios)
router.delete('/:id',usuarioDao.eliminarUsuario)
router.put('/:id',usuarioDao.actualizarUsuario)
router.get('/roles',usuarioDao.obtenerRoles)

export default router
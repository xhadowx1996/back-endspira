import {Router } from 'express'
import cursoDao from "../controllers/curso-controllers"



const router = Router()

router.post('/',cursoDao.crearCurso)
router.get('/',cursoDao.obtenerCursos)
router.get('/:id',cursoDao.obtenercursoId)
router.delete('/:id',cursoDao.eliminarCurso)
router.put('/:id',cursoDao.actualizarCurso)

export default router
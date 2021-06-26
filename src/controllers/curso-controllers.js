import Curso from "../models/cursos-models";
import regeneratorRuntime from "regenerator-runtime";
import { response } from "express";


// Este es crud de cursos tiene que irse a app.js y el path a consumir seria este
// localhost:4000/api/curso en curso-routes.js te das cuenta si son post, get, put o delete

const crearCurso = async (req, res = response) => {

   // path a consumir en este metodo es localhost:4000/api/curso y es post

  // los datos se tienen que enviar con estos nombres que estab aqui
  const { intesidad_horaria, descripcion } = req.body;

  try {
    const nuevo = await Curso.create({
      intesidad_horaria,
      descripcion,
    });
    if (nuevo) {
      return res.status(201).json({
        error: false,
        message: "Dato registrado",
        data: nuevo,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Error interno al registrar el dato",
    });
  }
};

const obtenerCursos = async (req, res = response) => {
  
  // path a consumir en este metodo es localhost:4000/api/curso y es get
  const cursos = await Curso.findAll();

  if (cursos.length !== 0) {
    return res.status(200).json({
      error: false,
      message: "todos los cursos registrados",
      data: cursos,
    });
  } else {
    return res.status(200).json({
      error: false,
      message: "No hay cursos registrados",
      data: null,
    });
  }
};

const obtenercursoId = async (req, res) => {
  // path a consumir en este metodo es localhost:4000/api/curso/:id y es post

  // Ejemplo localhost:4000/api/curso/2
  // tiene que ser el id del curso que se envia en el parametro igual es en el crud de alumos
  // todos los que piden :id es asi

  const { id } = req.params;
  const curso = await Curso.findOne({
    where: {
      id,
    },
  });

  if (curso === null) {
    return res.status(200).json({
      error: false,
      message: "No existe el curso",
      data: null,
    });
  }
  if (curso) {
    return res.status(200).json({
      error: false,
      message: `Se retorna el curso con id ${id}`,
      data: curso,
    });
  }
};

const eliminarCurso = async (req, res = response) => {
  // path a consumir en este metodo es localhost:4000/api/curso/:id y es delete
  try {
    const { id } = req.params;
    const curso = await Curso.destroy({
      where: {
        id,
      },
    });
    console.log(curso);
    if (curso === 0) {
      return res.status(200).json({
        error: false,
        message: "Cliente no existe",
        data: null,
      });
    }
    return res.status(200).json({
      error: false,
      message: "Cliente eliminado",
      data: curso,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Error al eliminar el curso",
      data: null,
    });
  }
};

const actualizarCurso = async (req, res) => {
  // path a consumir en este metodo es localhost:4000/api/curso/:id y es put
    let { id } = req.params
    const { intesidad_horaria, descripcion,  } = req.body
    try {
        const curso = await Curso.findOne({
            where: {
                id
            }
        })
        if (curso === null) {
            return res.status(200).json({
              error: false,
              message: "Cliente no existe",
              data: null,
            });
          }
        await curso.update({
            intesidad_horaria,
            descripcion,
        })
        
        if (curso) {
            res.status(202).json({
                error: false,
                message: "Curso actualizado",
                data: curso
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Ha ocurrido un error",
            data: null
        })
    }
}

module.exports = {
  crearCurso,
  obtenerCursos,
  obtenercursoId,
  eliminarCurso,
  actualizarCurso,
};

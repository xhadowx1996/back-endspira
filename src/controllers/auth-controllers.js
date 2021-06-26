import Usuario from "../models/usuario-models";
import Curso from "../models/cursos-models";
import Rol from "../models/rol-models";
import { response } from 'express';
import bcrypt from "bcrypt";


// este es login aqui te toca enviar el email y password de en el body asi tal y como estan escritos en la linea 11


const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userExist = await Usuario.findOne({ where:{ email } });

    if (!userExist) {
      return res.status(400).json({
        error: false,
        message: "El usuario no existe con este email",
        data: null
      });
    }

    // Confirmar los password

    const validPassword = bcrypt.compareSync(password, userExist.password);

    if (!validPassword) {
      return res.status(400).json({
        error: false,
        message: "Contraseña incorrecta",
      });
    }
    const rol_id = userExist.id_rol
    const curso_id = userExist.id_curso
    const rol = await Rol.findOne({ rol_id });
    const curso = await Curso.findOne({ curso_id });
    // console.log(userExist.id_rol)

    return res.status(200).json({
      error: false,
      message: "Login exitoso",
      data: userExist,
      rol,
      curso
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Por favor hable con el administrador",
      data: null
    });
  }
};


module.exports = {
    loginUser
}
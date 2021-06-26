import Usuario from "../models/usuario-models";
import Curso from "../models/cursos-models";
import Rol from "../models/rol-models";
import { response } from "express";
import bcrypt from "bcrypt";

// Este es crud de alumnos tiene que irse a app.js y el path a consumir seria este
// localhost:4000/api/usuario en usuario-routes.js te das cuenta si son post, get, put o delete

const crearUsuario = async (req, res = response) => {
  // path a consumir en este metodo es localhost:4000/api/usuario y es post

  // los datos se tienen que enviar con estos nommbres que estab aqui
  const { id, nombre, telefono, email, password, id_curso, id_rol } = req.body;

  try {
    let userExist = await Usuario.findOne({ where: { email } });
    let idExist = await Usuario.findOne({
      where: {
        id,
      },
    });

    if (userExist) {
      return res.status(400).json({
        error: false,
        message: "Este email ya esta registrado",
        data: null,
      });
    }
    if (idExist) {
      return res.status(400).json({
        error: false,
        message: "La identificacion ya esta registrada",
        data: null,
      });
    }

    const user = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return res.status(201).json({
      error: false,
      message: "Usuario creado",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Por favor hable con el administrador",
      data: null,
    });
  }
};

const obtenerUsuarios = async (req, res = response) => {
  // path a consumir en este metodo es localhost:4000/api/usuario y es get te va traer todos
  // los usuarios que tengan rol de alumnos en la tabla llamada rol tiene que insertar dos datos que son
  // 1. alumno
  // 2. administrador

  const usuarios = await Usuario.findAll({
    where: {
      id_rol: 2,
    },
  });
  if (usuarios) {
    return res.status(200).json({
      error: false,
      message: "todos los alumnos registrados",
      data: usuarios,
    });
  } else {
    return res.status(200).json({
      error: false,
      message: "No hay alumnos registrados",
      data: null,
    });
  }
};

const actualizarUsuario = async (req, res) => {
  // path a consumir en este metodo es localhost:4000/api/usuario/:id y el metodo es put
  // eejemplo localhost:4000/api/usuario/29893

  let { id } = req.params;

  //  todos los datos que se van actualizar tienen que ser con esos nombres que estan en esta linea siguiente igual para insertar
  //  en todos los endpoints

  const { nombre, telefono, email, id_curso, id_rol } = req.body;
  try {
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });
    if (usuario === null) {
      return res.status(200).json({
        error: false,
        message: "Usuario no existe",
        data: null,
      });
    }
    await usuario.update({
      nombre,
      telefono,
      email,
      id_curso,
      id_rol,
    });

    if (usuario) {
      res.status(202).json({
        error: false,
        message: "Usuario actualizado",
        data: usuario,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Ha ocurrido un error",
      data: null,
    });
  }
};

const eliminarUsuario = async (req, res = response) => {

  // path a consumir en este metodo es localhost:4000/api/usuario/:id y el metodo es delete
  // eejemplo localhost:4000/api/usuario/29893
  try {
    const { id } = req.params;
    const usuario = await Usuario.destroy({
      where: {
        id,
      },
    });
    console.log(usuario);
    if (usuario === 0) {
      return res.status(200).json({
        error: false,
        message: "Usuario no existe",
        data: null,
      });
    }
    return res.status(200).json({
      error: false,
      message: "Usuario eliminado",
      data: usuario,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Error al eliminar el usuario",
      data: null,
    });
  }
};

const obtenerRoles = async (req, res = response) => {
  // path a consumir en este metodo es localhost:4000/api/usuario/roles y el metodo es get

  //  es para que obtenga todos los roles

  const roles = await Rol.findAll();
  if (roles.length !== 0) {
    return res.status(200).json({
      error: false,
      message: "todos los roles registrados",
      data: roles,
    });
  } else {
    return res.status(200).json({
      error: false,
      message: "No hay roles registrados",
      data: null,
    });
  }
};

module.exports = {
  crearUsuario,
  obtenerRoles,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
};

import Sequelize, { DATE } from 'sequelize'
import sequelize from '../database/connection'

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.TEXT
    },
    email: {
        type: Sequelize.TEXT
    },
    telefono: {
        type: Sequelize.TEXT
    },
    password: {
        type: Sequelize.TEXT
    },
    id_curso: {
        type: Sequelize.INTEGER,
        references: {
            model: 'curso',
            key: 'id'
          },
    },
    id_rol: {
        type: Sequelize.INTEGER,
        references: {
            model: 'rol',
            key: 'id'
          },
    },
},{
    timestamps: false,
    freezeTableName: true
})

export default Usuario

